package com.ctmrepository;

import com.ctmrepository.controller.MinecraftMapController;
import com.ctmrepository.model.MinecraftMap;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

@SpringBootTest
class ApplicationTests {

    @Autowired
    private MinecraftMapController controller;

    /**
     * @throws Exception
     */
    @Test
    void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
        assertThat(controller.index().equals("CTM Repository Backend")).isTrue();
    }

    /**
     * @throws Exception
     */
    @Test
    void mapsLoad() throws Exception {
        assertThat(controller.getMapCount()).isNotNull();
        assertThat(controller.getMapCount().getBody() > 0).isTrue();
    }

    /**
     * @throws Exception
     */
    @Test
    void mapsAreAccessible() throws Exception {
        assertThat(controller.getMapCount().getStatusCodeValue() > 0).isTrue();
        int size = controller.getMapCount().getStatusCodeValue();
        assertThat(controller.getMapById(0).getStatusCode().equals(HttpStatus.NOT_FOUND)).isTrue();
        for (int i = 1; i <= size; i++) {
            assertThat(controller.getMapById(i)).isNotNull();
        }
    }

    /**
     * @throws Exception
     */
    @Test
    void mapsAreStrictSearchable() throws Exception {
        // Test that Maps are searchable
        assertThat(controller.getMapSearch("", 1, 20, true)).isNotNull();

        // General Case
        int maxTestMapSize = Math.min(controller.getMapCount().getBody() / 2, 25);
        MinecraftMap[] testMaps = new MinecraftMap[maxTestMapSize];
        List<MinecraftMap> pubMaps = controller.publishedMaps();
        for (int i = 0; i < testMaps.length; i++) {
            int rand = (int) (Math.random() * pubMaps.size());
            testMaps[i] = pubMaps.get(rand);
            pubMaps.remove(rand);
        }
        for (MinecraftMap map : testMaps) {
            List<MinecraftMap> searchMap = controller
                    .getMapSearch(map.getName(), 1, 20, true).getBody().data;
            assertThat(searchMap.stream().filter(o -> o.getId() == map.getId())
                    .findFirst().isPresent()).isTrue();
        }
    }

    /**
     * @throws Exception
     */
    @Test
    void mapsAreFuzzySearchable() throws Exception {
        // Test that Maps are searchable
        assertThat(controller.getMapSearch("", 1, 20, true)).isNotNull();
        assertThat(controller.getMapSearch("", 1, 20, false)).isNotNull();

        // General Case
        int maxTestMapSize = Math.min(controller.getMapCount().getBody() / 2, 25);
        MinecraftMap[] testMaps = new MinecraftMap[maxTestMapSize];
        List<MinecraftMap> pubMaps = controller.publishedMaps();
        for (int i = 0; i < testMaps.length; i++) {
            int rand = (int) (Math.random() * pubMaps.size());
            testMaps[i] = pubMaps.get(rand);
            pubMaps.remove(rand);
        }
        for (MinecraftMap map : testMaps) {
            List<MinecraftMap> searchMap = controller
                    .getMapSearch(map.getName(), 1, 20, false).getBody().data;
            assertThat(searchMap.stream().filter(o -> o.getId() == map.getId())
                    .findFirst().isPresent()).isTrue();
        }
    }

    /**
     * @throws Exception
     */
    @Test
    void searchHasMaxPages() {
        assertThat(controller.getMapSearch("", 1, 20, true)).isNotNull();
        assertThat(controller.getMapSearch("", 1, 20, true).getBody().maxPage > 0).isTrue();
    }
}
