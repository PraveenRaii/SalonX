package com.salonx.model;

import jakarta.persistence.*;

@Entity
@Table(name = "coupons")
public class Coupon {

    @Id
    private String code;

    private Integer discountPercent;
    private Integer maxDiscount;
    private Integer discountAmount;
    private Integer minBookingAmount = 0;
    private String description;
    private Boolean active = true;

    public Coupon() {}

    public Coupon(String code, Integer discountPercent, Integer maxDiscount, Integer discountAmount, Integer minBookingAmount, String description) {
        this.code = code;
        this.discountPercent = discountPercent;
        this.maxDiscount = maxDiscount;
        this.discountAmount = discountAmount;
        this.minBookingAmount = minBookingAmount;
        this.description = description;
        this.active = true;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public Integer getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(Integer discountPercent) { this.discountPercent = discountPercent; }

    public Integer getMaxDiscount() { return maxDiscount; }
    public void setMaxDiscount(Integer maxDiscount) { this.maxDiscount = maxDiscount; }

    public Integer getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(Integer discountAmount) { this.discountAmount = discountAmount; }

    public Integer getMinBookingAmount() { return minBookingAmount; }
    public void setMinBookingAmount(Integer minBookingAmount) { this.minBookingAmount = minBookingAmount; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
