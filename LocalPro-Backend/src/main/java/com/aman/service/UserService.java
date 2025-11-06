package com.aman.service;

import com.aman.entity.User;
import com.aman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import com.aman.utility.JWTutil;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JWTutil jwtUtil;
    
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User saveUser(User user) {
    	user.setUserPass(encoder.encode(user.getUserPass()));
        return userRepository.save(user);
    }
    
    public Map<String,Object> login(User user) {
    	User db_user = userRepository.findByUserEmail(user.getUserEmail());
    	if(db_user == null)
    		throw new RuntimeException("User not found!");
    	
    	if (!encoder.matches(user.getUserPass(), db_user.getUserPass()))
            throw new RuntimeException("Invalid password");

        String token = jwtUtil.generateToken(db_user.getUserEmail());

        Map<String, Object> userData = new HashMap<>();
        userData.put("userId", db_user.getId());
        userData.put("userName", db_user.getUserName());
        userData.put("userEmail", db_user.getUserEmail());
        userData.put("userType", db_user.getUserType());
        userData.put("userPhone", db_user.getUserPhone());
        
        return Map.of("token", token, "user", userData);
    }

}

