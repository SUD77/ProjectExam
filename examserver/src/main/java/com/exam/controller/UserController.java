package com.exam.controller;


import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")   // this is added bcoz spingApp and angularApp ran on diff ports.
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    /*For AWS
     * - changes for this are also added in MySecurityConfig in antMatchers.
     * */
    @GetMapping("/test")
    public String test() {
        return "Welcome to backend api of Examportal";
    }

    //creating user
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {

        /*
         * Creating normalUser from this api.
         * It wont create AdminUsers.
         * */

        user.setProfile("default.png");
        //encoding passowrd with brcyptPasswordEcoder

        user.setPassword(this.bCryptPasswordEncoder.encode((user.getPassword())));


        Set<UserRole> roles = new HashSet<>();

        Role role = new Role(45L, "NormalUser");
        UserRole userRole = new UserRole(user, role);

        roles.add(userRole);

        return this.userService.createUser(user, roles);
    }


    @GetMapping("/{userName}")
    public User getUser(@PathVariable("userName") String userName) throws Exception {
        return this.userService.getUser(userName);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        this.userService.deleteUser(userId);
    }

    @DeleteMapping("/delete/{userName}")
    public void deleteUserByUserName(@PathVariable("userName") String userName) {
        this.userService.deleteUserByUserName(userName);
    }

    @PutMapping("/update")
    public void updateUser(@RequestBody User userDto) throws Exception {
        this.userService.update(userDto);
    }
}
