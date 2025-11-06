package com.aman.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aman.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    // You can add custom query methods here if needed
	User findByUserEmail(String userEmail);
}

