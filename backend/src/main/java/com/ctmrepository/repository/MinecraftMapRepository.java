package com.ctmrepository.repository;

import java.util.List;

import com.ctmrepository.model.MinecraftMap;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MinecraftMapRepository extends JpaRepository<MinecraftMap, Long> {
    List<MinecraftMap> findByPublished(boolean published);

    List<MinecraftMap> findByNameContaining(String name);
}
