package com.salonx.config;

import com.salonx.model.*;
import com.salonx.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SalonRepository salonRepository;
    private final SalonServiceRepository serviceRepository;
    private final StylistRepository stylistRepository;
    private final CouponRepository couponRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository,
                          SalonRepository salonRepository,
                          SalonServiceRepository serviceRepository,
                          StylistRepository stylistRepository,
                          CouponRepository couponRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.salonRepository = salonRepository;
        this.serviceRepository = serviceRepository;
        this.stylistRepository = stylistRepository;
        this.couponRepository = couponRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedSalonsAndServices();
        seedCoupons();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            String encodedPw = passwordEncoder.encode("salonx123");

            User customer = new User("Priya Sharma", "priya@example.com", encodedPw, "+91 98765 43210", Role.CUSTOMER, "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80");
            customer.setLoyaltyPoints(480);
            userRepository.save(customer);

            User owner = new User("Alexander Wright", "owner@luxe.com", encodedPw, "+91 98111 22334", Role.SALON_OWNER, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");
            userRepository.save(owner);

            User staff = new User("Rajesh Varma", "rajesh@luxe.com", encodedPw, "+91 98222 33445", Role.STAFF, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80");
            userRepository.save(staff);

            User admin = new User("Victoria Vance", "admin@salonx.com", encodedPw, "+91 98000 11223", Role.ADMIN, "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80");
            userRepository.save(admin);
        }
    }

    private void seedSalonsAndServices() {
        if (salonRepository.count() == 0) {
            Salon s1 = new Salon(
                    "salon-1", "The Luxe Atelier", "Haute Coiffure & Bespoke Esthetics",
                    "The Luxe Atelier is an editorial sanctuary combining Parisian styling discipline with cutting-edge Japanese hair restorative therapy.",
                    4.9, 348, 1.2, "42 Lavelle Boulevard, Indiranagar", "Bengaluru", "Unisex", 850,
                    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
                    "Premier Luxe", true
            );
            salonRepository.save(s1);

            SalonServiceItem s1_1 = new SalonServiceItem("srv-101", s1, "Signature Precision Cut & Sculpting", "haircut", "Unisex", 1250, 1500, 45, "Bespoke precision haircut with blowout.", true);
            SalonServiceItem s1_2 = new SalonServiceItem("srv-102", s1, "French Balayage & Gloss Therapy", "haircolour", "Women", 4800, 5500, 120, "Hand-painted Parisian balayage.", true);
            SalonServiceItem s1_3 = new SalonServiceItem("srv-103", s1, "Hydra-Oxygenating Skin Rebirth", "facial", "Unisex", 3200, 3800, 60, "Medical-grade hydra-dermabrasion.", true);
            serviceRepository.saveAll(Arrays.asList(s1_1, s1_2, s1_3));

            Stylist sty1 = new Stylist("sty-1", s1, "Alexander Wright", "Creative Director", "12+ Years", "Precision Sculpting", 4.96, 180, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", true);
            Stylist sty2 = new Stylist("sty-2", s1, "Rajesh Varma", "Master Colorist", "9 Years", "French Balayage", 4.92, 142, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", true);
            stylistRepository.saveAll(Arrays.asList(sty1, sty2));

            // Salon 2
            Salon s2 = new Salon(
                    "salon-2", "Maison Noir Gentlemen’s Parlour", "Old-School Craftsmanship, Modern Precision",
                    "An exclusive men’s grooming sanctuary dressed in dark oak and brushed brass.",
                    4.85, 219, 2.4, "18 Richmond Road, Near Central Square", "Bengaluru", "Men", 650,
                    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
                    "Gentlemen Choice", true
            );
            salonRepository.save(s2);

            SalonServiceItem s2_1 = new SalonServiceItem("srv-201", s2, "The Executive Scissor Cut", "haircut", "Men", 900, 1100, 40, "Scissor and taper work.", true);
            SalonServiceItem s2_2 = new SalonServiceItem("srv-202", s2, "Royal Shave & Face Therapy", "beard", "Men", 750, 950, 35, "Hot towel lather with straight razor.", false);
            serviceRepository.saveAll(Arrays.asList(s2_1, s2_2));

            Stylist sty21 = new Stylist("sty-21", s2, "Marcus Vance", "Master Barber", "10 Years", "Fades & Beards", 4.95, 165, "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80", true);
            stylistRepository.save(sty21);

            // Salon 3
            Salon s3 = new Salon(
                    "salon-3", "Aura Bloom Organic Salon & Spa", "Clean Beauty, Ethical Ingredients, Total Radiance",
                    "An eco-luxe botanical salon dedicated to toxin-free haircare and vegan facials.",
                    4.92, 412, 3.1, "104 Koregaon Heights, Vittal Mallya Road", "Bengaluru", "Women", 1100,
                    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
                    "Eco-Luxury", true
            );
            salonRepository.save(s3);

            SalonServiceItem s3_1 = new SalonServiceItem("srv-301", s3, "Botanical Keratin Infusion", "hairstyling", "Women", 3900, 4600, 90, "Organic smoothing treatment.", true);
            SalonServiceItem s3_2 = new SalonServiceItem("srv-302", s3, "Rose Quartz Guasha Radiance Facial", "facial", "Women", 2600, 3100, 60, "Lymphatic crystal facial.", true);
            serviceRepository.saveAll(Arrays.asList(s3_1, s3_2));

            Stylist sty31 = new Stylist("sty-31", s3, "Meera Sen", "Lead Esthetician", "11 Years", "Botanical Skin", 4.97, 230, "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80", true);
            stylistRepository.save(sty31);
        }
    }

    private void seedCoupons() {
        if (couponRepository.count() == 0) {
            Coupon c1 = new Coupon("SALONX50", 50, 500, null, 800, "50% OFF up to ₹500 on your first booking with SalonX");
            Coupon c2 = new Coupon("LUXE20", 20, 800, null, 1500, "20% OFF up to ₹800 on Premier Luxe salons");
            Coupon c3 = new Coupon("GLOWUP", null, null, 300, 1200, "Flat ₹300 OFF on all skin & facial packages");
            couponRepository.saveAll(Arrays.asList(c1, c2, c3));
        }
    }
}
