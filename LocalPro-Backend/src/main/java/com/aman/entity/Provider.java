package com.aman.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Provider {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "categoryId")
    private Integer categoryId;
    
    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL)
    private Set<Booking> bookings = new HashSet<>();
    
    private String bio;
    private Double hourlyRate;
    private Integer experienceYears;
    private String profileImageUrl;
    private Boolean isVerified = false;
    private Double averageRating = 0.0;
    private Integer totalReviews = 0;
    private String availableDays;
    
    public Integer getId() {
    	return id;
    }
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	public Double getHourlyRate() {
		return hourlyRate;
	}
	public void setHourlyRate(Double hourlyRate) {
		this.hourlyRate = hourlyRate;
	}
	public Integer getExperienceYears() {
		return experienceYears;
	}
	public void setExperienceYears(Integer experienceYears) {
		this.experienceYears = experienceYears;
	}
	public String getProfileImageUrl() {
		return profileImageUrl;
	}
	public void setProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}
	public Boolean getIsVerified() {
		return isVerified;
	}
	public void setIsVerified(Boolean isVerified) {
		this.isVerified = isVerified;
	}
	public Double getAverageRating() {
		return averageRating;
	}
	public void setAverageRating(Double averageRating) {
		this.averageRating = averageRating;
	}
	public Integer getTotalReviews() {
		return totalReviews;
	}
	public void setTotalReviews(Integer totalReviews) {
		this.totalReviews = totalReviews;
	}
	public String getAvailableDays() {
		return availableDays;
	}
	public void setAvailableDays(String availableDays) {
		this.availableDays = availableDays;
	}
	public void setUser(User user2) {
		this.user = user2;
	}
	public User getUser() {
		return user;
	}
	public Object getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Object categoryId) {
		this.categoryId = (Integer) categoryId;
	}
    
    
}
