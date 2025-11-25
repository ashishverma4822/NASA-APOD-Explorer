package com.lostsetbit.APOD_API.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class CacheEvictor {

    @Autowired
    private CacheManager cacheManager;

    @Scheduled(fixedRate = 86400000)
    public void evictAllCaches() {
        System.out.println("Executing scheduled cache clearance...");

        if(cacheManager.getCache("apod") != null) {
            Objects.requireNonNull(cacheManager.getCache("apod")).clear();
        }

        if(cacheManager.getCache("apod-recent") != null) {
            Objects.requireNonNull(cacheManager.getCache("apod-recent")).clear();
        }
    }
}