package com.ctmrepository.response;

import java.util.List;

import com.ctmrepository.model.MinecraftMap;

public class SearchResponseEntity {
    public int maxPage;
    public List<MinecraftMap> data;

    public SearchResponseEntity(int maxPage, List<MinecraftMap> data) {
        this.maxPage = maxPage;
        this.data = data;
    }

    @Override
    public String toString() {
        return "Max Page: " + maxPage + " \nList: " + data.toString();
    }
}
