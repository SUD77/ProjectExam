package com.exam.repository;

import com.exam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface UserRepository extends JpaRepository<User,Long> {

    public User findByUserName(String userName);

    @Query(value = "Select * from Users where id=?1",nativeQuery = true)
    public User findByUserId(Long userId);

}
