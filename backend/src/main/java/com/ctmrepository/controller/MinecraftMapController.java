package com.ctmrepository.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.io.File;
import java.io.IOException;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import com.ctmrepository.model.MinecraftMap;
import com.ctmrepository.model.SearchQueryAndResult;
import com.ctmrepository.repository.MinecraftMapRepository;
import com.ctmrepository.response.SearchResponseEntity;
import com.ctmrepository.service.MinecraftService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Validated
@CrossOrigin(origins = { "http://localhost:3000", "https://ctm-community.github.io" })
@RestController
@RequestMapping("/")
@EnableCaching
public class MinecraftMapController {

    @Autowired
    MinecraftMapRepository minecraftMapRepository;

    @Autowired
    MinecraftService service;

    @Autowired
    CacheManager cacheManager;

    @GetMapping("/")
    public String index() {
        return "CTM Repository Backend";
    }

    /**
     * Get the total count of published maps.
     * This is necessary to compute the number of pages in the frontend.
     */
    @GetMapping("/maps/count")
    public ResponseEntity<Integer> getMapCount() {
        return new ResponseEntity<>((int) minecraftMapRepository.count(), HttpStatus.OK);
    }

    /**
     * Get one map by id
     * 
     * @param id the id of the map to get
     */
    @GetMapping("/maps/{id}")
    public ResponseEntity<MinecraftMap> getMapById(@PathVariable("id") long id) {
        Optional<MinecraftMap> mapData = minecraftMapRepository.findById(id);

        if (mapData.isPresent() && mapData.get().isPublished()) {
            return new ResponseEntity<>(mapData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Sorts map database according to query and returns results corresponding to
     * given page and response limit.
     *
     * @param q       search query string
     * @param page    page number of results to return
     * @param perPage maximum number of results to return per page
     * @param strict  if true, search will only return results with exact query
     *                matches
     */
    @GetMapping("/search/maps")
    public ResponseEntity<SearchResponseEntity> getMapSearch(
            @RequestParam() String q,
            @RequestParam(required = false, defaultValue = "1") @Min(1) int page,
            @RequestParam(required = false, defaultValue = "20") @Min(1) @Max(100) int perPage,
            @RequestParam(required = false, defaultValue = "true") boolean strict) {
        try {
            q = q.toUpperCase().replaceAll("_", " ").trim();

            SearchQueryAndResult maps;
            maps = service.sortByQuery(q, perPage, strict, minecraftMapRepository);
            List<MinecraftMap> outMaps = service.convertList(minecraftMapRepository,
                    paginateList(maps.maps, page, perPage));

            return ResponseEntity.ok()
                    .cacheControl(CacheControl.maxAge(1, TimeUnit.HOURS).cachePublic())
                    .body(new SearchResponseEntity(maps.maxPage, outMaps));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String fileName = file.getOriginalFilename();
        try {
            // TODO: filename might be malicous, generate random id for filename
            // filename rn is blob
            String userHomeDir = System.getProperty("user.home");
            File f = new File(userHomeDir + "/tmp/upload/" + fileName);
            if (!f.mkdirs()) {
                throw new IOException("Could not create folders of " + f.toString());
            }
            file.transferTo(f);
        } catch (Exception e) {
            System.out.println("Error: " + e.toString());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok("File uploaded successfully.");
    }

    public void evictAllcaches() {
        cacheManager.getCacheNames().stream()
                .forEach(cacheName -> cacheManager.getCache(cacheName).clear());
    }

    @Scheduled(fixedRate = 60000)
    public void evictAllcachesAtIntervals() {
        evictAllcaches();
    }

    public List<MinecraftMap> publishedMaps() {
        return minecraftMapRepository.findByPublished(true);
    }

    public List<MinecraftMap> unpublishedMaps() {
        return minecraftMapRepository.findByPublished(false);
    }

    private static <T> List<T> paginateList(List<T> list, Integer page, Integer resultsPerPage) {
        Integer fromIndex = (page - 1) * resultsPerPage;
        Integer toIndex = fromIndex + resultsPerPage;

        if (list.size() >= toIndex) {
            return list.subList(fromIndex, toIndex);
        } else if (list.size() >= fromIndex) {
            return list.subList(fromIndex, list.size());
        } else {
            return new ArrayList<T>();
        }
    }
}