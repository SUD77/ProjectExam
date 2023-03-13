package com.exam.service.impl;

import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.helper.UserFoundException;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User existing = this.userRepository.findByUserName(user.getUserName());
        User newUser = new User();

        if (existing != null) {
            System.out.println("User is already there!!");
            throw new UserFoundException();
        } else {
            //create user

            for (UserRole userRole : userRoles) {
                roleRepository.save(userRole.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            newUser = this.userRepository.save(user);
        }

        return newUser;
    }

    @Override
    public User getUser(String userName) throws Exception {

        User user = this.userRepository.findByUserName(userName);

        if (user == null) {
            System.out.println("User does Not exsit");
            throw new Exception("User does not exist");
        }

        return user;
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public void deleteUserByUserName(String userName) {
        User user = this.userRepository.findByUserName(userName);
        Long userId = user.getId();

        this.userRepository.deleteById(userId);
    }

    @Override
    public void update(User userDto) throws Exception {

        User user = userRepository.findByUserId(userDto.getId());

        if (userRepository.findByUserName(userDto.getUserName()) != null
                && !userDto.getUserName().equals(user.getUserName())) {
            System.out.println("Cant use this userName");
            throw new Exception("Cant use this userName");
        }

        if (userDto.getUserName() != null && !userDto.getUserName().isEmpty())
            user.setUserName(userDto.getUserName());
        if (userDto.getFirstName() != null && !userDto.getFirstName().isEmpty())
            user.setFirstName(userDto.getFirstName());
        if (userDto.getLastName() != null && !userDto.getLastName().isEmpty())
            user.setLastName(userDto.getLastName());
        if (userDto.getEmail() != null && !userDto.getEmail().isEmpty())
            user.setEmail(userDto.getEmail());
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty())
            user.setPassword(userDto.getPassword());
        if (userDto.getPhone() != null && !userDto.getPhone().isEmpty())
            user.setPhone(userDto.getPhone());
        if (userDto.getUserRoles() != null && !userDto.getUserRoles().isEmpty()) {
            user.setUserRoles(userDto.getUserRoles());
        }

        userRepository.save(user);

    }
}
