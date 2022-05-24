package com.ctmrepository;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class Application {

    /**
     * @param args Command line args
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
