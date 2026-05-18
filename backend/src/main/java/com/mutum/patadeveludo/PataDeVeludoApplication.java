package com.mutum.patadeveludo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PataDeVeludoApplication {

    public static void main(String[] args) {
        SpringApplication.run(PataDeVeludoApplication.class, args);
    }
}
