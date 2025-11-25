package com.lostsetbit.APOD_API.controller;

import com.lostsetbit.APOD_API.model.ApodResponse;
import com.lostsetbit.APOD_API.service.NasaApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/apod")
public class ApodController {

    private final NasaApiService nasaService;

    @Autowired
    public ApodController(NasaApiService nasaService) {
        this.nasaService = nasaService;
    }

    @GetMapping
    public ResponseEntity<ApodResponse> getApod(
            @RequestParam(value = "date", required = false) String date) {
        try {
            ApodResponse response = nasaService.getApod(date);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/recent")
    public ResponseEntity<List<ApodResponse>> getRecent() {
        return ResponseEntity.ok(nasaService.getRecentApods(12));
    }

    @GetMapping("/last-week")
    public ResponseEntity<List<ApodResponse>> getLastWeek() {
        return ResponseEntity.ok(nasaService.getLast7Days());
    }
}
