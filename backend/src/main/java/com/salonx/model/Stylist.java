package com.salonx.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "stylists")
public class Stylist {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "salon_id")
    @JsonIgnore
    private Salon salon;

    @Column(nullable = false)
    private String name;

    private String title;
    private String experience;
    private String speciality;
    private Double rating = 4.9;
    private Integer reviewCount = 0;
    private String avatar;
    private Boolean available = true;

    public Stylist() {}

    public Stylist(String id, Salon salon, String name, String title, String experience, String speciality, Double rating, Integer reviewCount, String avatar, Boolean available) {
        this.id = id;
        this.salon = salon;
        this.name = name;
        this.title = title;
        this.experience = experience;
        this.speciality = speciality;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.avatar = avatar;
        this.available = available;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Salon getSalon() { return salon; }
    public void setSalon(Salon salon) { this.salon = salon; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getSpeciality() { return speciality; }
    public void setSpeciality(String speciality) { this.speciality = speciality; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }
}
