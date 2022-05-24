package com.ctmrepository.response;

import java.util.List;

import com.ctmrepository.model.MinecraftMap;

public class SearchResponseEntity {
    public int max_page;
    public List<MinecraftMap> data;

    public SearchResponseEntity(int max_page, List<MinecraftMap> data) {
        this.max_page = max_page;
        this.data = data;
    }

    @Override
    public String toString() {
        return "Max Page: " + max_page + " \nList: " + data.toString();
    }
}
