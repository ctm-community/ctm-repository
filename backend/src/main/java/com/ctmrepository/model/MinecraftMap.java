package com.ctmrepository.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ctmMaps")
public class MinecraftMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "uploadDate")
    private long uploadDate;

    @Column(name = "author")
    private String author;

    @Column(name = "length")
    private String length;

    @Column(name = "objectiveMain")
    private int objectiveMain;

    @Column(name = "objectiveBonus")
    private int objectiveBonus;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "descriptionShort", length = 2048)
    private String descriptionShort;

    @Column(name = "downloadCount")
    private long downloadCount;

    @Column(name = "type")
    private String type;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "series")
    private String series;

    @Column(name = "minecraftVersion")
    private String minecraftVersion;

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
        return this.uploadDate;
    }

    /**
     * @param uploadDate
     */
    public void setUploadDate(long uploadDate) {
        this.uploadDate = uploadDate;
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
        return this.objectiveMain;
    }

    /**
     * @param objectiveMain
     */
    public void setObjectiveMain(int objectiveMain) {
        this.objectiveMain = objectiveMain;
    }

    /**
     * @return
     */
    public int getObjectiveBonus() {
        return this.objectiveBonus;
    }

    /**
     * @param objectiveBonus
     */
    public void setObjectiveBonus(int objectiveBonus) {
        this.objectiveBonus = objectiveBonus;
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
    public String getDescriptionShort() {
        return this.descriptionShort;
    }

    /**
     * @param descriptionShort
     */
    public void setDescriptionShort(String descriptionShort) {
        this.descriptionShort = descriptionShort;
    }

    /**
     * @return
     */
    public long getDownloadCount() {
        return this.downloadCount;
    }

    /**
     * @param downloadCount
     */
    public void setDownloadCount(long downloadCount) {
        this.downloadCount = downloadCount;
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
    public String getImageUrl() {
        return this.imageUrl;
    }

    /**
     * @param imageUrl
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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
    public String getMinecraftVersion() {
        return this.minecraftVersion;
    }

    /**
     * @param minecraftVersion
     */
    public void setMinecraftVersion(String minecraftVersion) {
        this.minecraftVersion = minecraftVersion;
    }

    public MinecraftMap() {
    }

    public MinecraftMap(String name, long uploadDate, String author, String length, int objectiveMain,
            int objectiveBonus, String difficulty, String descriptionShort, long downloadCount, String type,
            String imageUrl, String series, String minecraftVersion, boolean published) {
        this.name = name;
        this.uploadDate = uploadDate;
        this.author = author;
        this.length = length;
        this.objectiveMain = objectiveMain;
        this.objectiveBonus = objectiveBonus;
        this.difficulty = difficulty;
        this.descriptionShort = descriptionShort;
        this.downloadCount = downloadCount;
        this.type = type;
        this.imageUrl = imageUrl;
        this.series = series;
        this.minecraftVersion = minecraftVersion;
        this.published = published;
    }

    // @Override
    // public String toString() {
    // return "MinecraftMap [id=" + id + ", name=" + name + ", minecraftVersion=" +
    // minecraftVersion + ", downloadCount="
    // + downloadCount + ", verified=" + verified + "]";
    // }

}
