package com.exam;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public static void main(String[] args) {

        SpringApplication.run(ExamserverApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Starting code");

        User user = new User();

        user.setFirstName("Sudhanshu");
        user.setLastName("Jaiswal");
        user.setUserName("Sud777");
        user.setPassword(this.bCryptPasswordEncoder.encode("abc"));
        user.setEmail("abc@gmail.com");
        user.setProfile("default.png");

        Role role1 = new Role();
        role1.setRoleId(44L);
        role1.setRoleName("ADMIN");

        UserRole userRole = new UserRole();
        userRole.setRole(role1);
        userRole.setUser(user);

        Set<UserRole> userRoleSet = new HashSet<>();
        userRoleSet.add(userRole);

        User user1 = this.userService.createUser(user, userRoleSet);

        System.out.println(user1.getUserName());
    }
}
