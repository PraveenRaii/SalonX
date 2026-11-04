package com.salonx.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "salon_services")
public class SalonServiceItem {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "salon_id")
    @JsonIgnore
    private Salon salon;

    @Column(nullable = false)
    private String name;

    private String category;
    private String gender = "Unisex";
    private Integer price;
    private Integer originalPrice;
    private Integer durationMinutes = 45;

    @Column(length = 1000)
    private String description;

    private Boolean popular = false;

    public SalonServiceItem() {}

    public SalonServiceItem(String id, Salon salon, String name, String category, String gender, Integer price, Integer originalPrice, Integer durationMinutes, String description, Boolean popular) {
        this.id = id;
        this.salon = salon;
        this.name = name;
        this.category = category;
        this.gender = gender;
        this.price = price;
        this.originalPrice = originalPrice;
        this.durationMinutes = durationMinutes;
        this.description = description;
        this.popular = popular;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Salon getSalon() { return salon; }
    public void setSalon(Salon salon) { this.salon = salon; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }

    public Integer getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(Integer originalPrice) { this.originalPrice = originalPrice; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getPopular() { return popular; }
    public void setPopular(Boolean popular) { this.popular = popular; }
}
