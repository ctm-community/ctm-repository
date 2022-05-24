package com.ctmrepository.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ctm_maps")
public class MinecraftMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "upload_date")
    private long upload_date;

    @Column(name = "author")
    private String author;

    @Column(name = "length")
    private String length;

    @Column(name = "objective_main")
    private int objective_main;

    @Column(name = "objective_bonus")
    private int objective_bonus;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "description_short", length = 2048)
    private String description_short;

    @Column(name = "download_count")
    private long download_count;

    @Column(name = "type")
    private String type;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "series")
    private String series;

    @Column(name = "mc_version")
    private String mc_version;

    @Column(name = "published")
    private boolean published;

    /**
     * @return
     */
    public boolean isPublished() {
        return published;
    }

    public void publish() {
        published = true;
    }

    public void retract() {
        published = false;
    }

    /**
     * @return
     */
    public long getId() {
        return this.id;
    }

    /**
     * @param id
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * @return
     */
    public String getName() {
        return this.name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return
     */
    public long getUploadDate() {
        return this.upload_date;
    }

    /**
     * @param upload_date
     */
    public void setUploadDate(long upload_date) {
        this.upload_date = upload_date;
    }

    /**
     * @return
     */
    public String getAuthor() {
        return this.author;
    }

    /**
     * @param author
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * @return
     */
    public String getLength() {
        return this.length;
    }

    /**
     * @param length
     */
    public void setLength(String length) {
        this.length = length;
    }

    /**
     * @return
     */
    public int getObjectiveMain() {
        return this.objective_main;
    }

    /**
     * @param objective_main
     */
    public void setObjectiveMain(int objective_main) {
        this.objective_main = objective_main;
    }

    /**
     * @return
     */
    public int getObjectiveBonus() {
        return this.objective_bonus;
    }

    /**
     * @param objective_bonus
     */
    public void setObjectiveBonus(int objective_bonus) {
        this.objective_bonus = objective_bonus;
    }

    /**
     * @return
     */
    public String getDifficulty() {
        return this.difficulty;
    }

    /**
     * @param difficulty
     */
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    /**
     * @return
     */
    public String getDescription_short() {
        return this.description_short;
    }

    /**
     * @param description_short
     */
    public void setDescription_short(String description_short) {
        this.description_short = description_short;
    }

    /**
     * @return
     */
    public long getDownload_count() {
        return this.download_count;
    }

    /**
     * @param download_count
     */
    public void setDownload_count(long download_count) {
        this.download_count = download_count;
    }

    /**
     * @return
     */
    public String getType() {
        return this.type;
    }

    /**
     * @param type
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return
     */
    public String getImage_url() {
        return this.image_url;
    }

    /**
     * @param image_url
     */
    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    /**
     * @return
     */
    public String getSeries() {
        return this.series;
    }

    /**
     * @param series
     */
    public void setSeries(String series) {
        this.series = series;
    }

    /**
     * @return
     */
    public String getMc_version() {
        return this.mc_version;
    }

    /**
     * @param mc_version
     */
    public void setMc_version(String mc_version) {
        this.mc_version = mc_version;
    }

    public MinecraftMap() {
    }

    public MinecraftMap(String name, long upload_date, String author, String length, int objective_main,
            int objective_bonus, String difficulty, String description_short, long download_count, String type,
            String image_url, String series, String mc_version, boolean published) {
        this.name = name;
        this.upload_date = upload_date;
        this.author = author;
        this.length = length;
        this.objective_main = objective_main;
        this.objective_bonus = objective_bonus;
        this.difficulty = difficulty;
        this.description_short = description_short;
        this.download_count = download_count;
        this.type = type;
        this.image_url = image_url;
        this.series = series;
        this.mc_version = mc_version;
        this.published = published;
    }

    // @Override
    // public String toString() {
    // return "MinecraftMap [id=" + id + ", name=" + name + ", mc_version=" +
    // minecraftVersion + ", download_count="
    // + downloadCount + ", verified=" + verified + "]";
    // }

}
