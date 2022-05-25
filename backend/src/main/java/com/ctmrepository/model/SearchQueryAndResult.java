package com.ctmrepository.model;

import java.util.List;

public class SearchQueryAndResult {
    public String q;
    public int maxPage;
    public boolean strict;
    public List<Long> maps;

    public SearchQueryAndResult(String q, int maxPage, boolean strict, List<Long> maps) {
        this.q = q;
        this.maxPage = maxPage;
        this.strict = strict;
        this.maps = maps;
    }

    public String toString() {
        return strict ? "Strict Search \"" + q + "\":: " + maps.toString()
                : "Fuzzy Search \"" + q + "\":: " + maps.toString();
    }
}
