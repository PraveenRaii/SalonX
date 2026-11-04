package com.salonx.dto;

import java.util.List;

public class BookingDTOs {

    public static class CreateBookingRequest {
        private String salonId;
        private String stylistId;
        private String scheduledDate;
        private String scheduledTime;
        private List<String> serviceIds;
        private String couponCode;
        private String paymentMethod = "ONLINE_RAZORPAY";
        private String notes;

        public CreateBookingRequest() {}

        public String getSalonId() { return salonId; }
        public void setSalonId(String salonId) { this.salonId = salonId; }
        public String getStylistId() { return stylistId; }
        public void setStylistId(String stylistId) { this.stylistId = stylistId; }
        public String getScheduledDate() { return scheduledDate; }
        public void setScheduledDate(String scheduledDate) { this.scheduledDate = scheduledDate; }
        public String getScheduledTime() { return scheduledTime; }
        public void setScheduledTime(String scheduledTime) { this.scheduledTime = scheduledTime; }
        public List<String> getServiceIds() { return serviceIds; }
        public void setServiceIds(List<String> serviceIds) { this.serviceIds = serviceIds; }
        public String getCouponCode() { return couponCode; }
        public void setCouponCode(String couponCode) { this.couponCode = couponCode; }
        public String getPaymentMethod() { return paymentMethod; }
        public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }

    public static class RescheduleRequest {
        private String newDate;
        private String newTime;

        public RescheduleRequest() {}
        public String getNewDate() { return newDate; }
        public void setNewDate(String newDate) { this.newDate = newDate; }
        public String getNewTime() { return newTime; }
        public void setNewTime(String newTime) { this.newTime = newTime; }
    }

    public static class CancelRequest {
        private String reason;

        public CancelRequest() {}
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }
}
