package com.salonx.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "salons")
public class Salon {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    private String tagline;

    @Column(length = 2000)
    private String description;

    private Double rating = 4.8;
    private Integer reviewCount = 0;
    private Double distanceKm = 1.5;

    private String address;
    private String city = "Bengaluru";
    private Double latitude;
    private Double longitude;

    private String gender = "Unisex"; // Men, Women, Unisex
    private Integer startingPrice = 800;

    private Boolean isOpenNow = true;
    private String openingHours = "09:00 AM - 09:00 PM";
    private Boolean verified = true;
    private Boolean featured = false;
    private String badge;

    private String coverImage;

    @OneToMany(mappedBy = "salon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SalonServiceItem> services = new ArrayList<>();

    @OneToMany(mappedBy = "salon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Stylist> stylists = new ArrayList<>();

    public Salon() {}

    public Salon(String id, String name, String tagline, String description, Double rating, Integer reviewCount, Double distanceKm, String address, String city, String gender, Integer startingPrice, String coverImage, String badge, Boolean featured) {
        this.id = id;
        this.name = name;
        this.tagline = tagline;
        this.description = description;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.distanceKm = distanceKm;
        this.address = address;
        this.city = city;
        this.gender = gender;
        this.startingPrice = startingPrice;
        this.coverImage = coverImage;
        this.badge = badge;
        this.featured = featured;
        this.verified = true;
        this.isOpenNow = true;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Integer getStartingPrice() { return startingPrice; }
    public void setStartingPrice(Integer startingPrice) { this.startingPrice = startingPrice; }

    public Boolean getIsOpenNow() { return isOpenNow; }
    public void setIsOpenNow(Boolean openNow) { isOpenNow = openNow; }

    public String getOpeningHours() { return openingHours; }
    public void setOpeningHours(String openingHours) { this.openingHours = openingHours; }

    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public List<SalonServiceItem> getServices() { return services; }
    public void setServices(List<SalonServiceItem> services) { this.services = services; }

    public List<Stylist> getStylists() { return stylists; }
    public void setStylists(List<Stylist> stylists) { this.stylists = stylists; }
}
