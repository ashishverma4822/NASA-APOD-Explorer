package com.lostsetbit.APOD_API.service;

import com.lostsetbit.APOD_API.model.ApodResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.time.ZoneId;

@Service
public class NasaApiService {

    private final RestTemplate restTemplate;

    @Value("${nasa.api.key}")
    private String apiKey;

    @Value("${nasa.api.url}")
    private String apiUrl;

    public NasaApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Cacheable(value = "apod", key = "#date ?: 'today'")
    public ApodResponse getApod(String date) {

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("api_key", apiKey);

        if (date != null && !date.isEmpty()) {
            uriBuilder.queryParam("date", date);
        }

        System.out.println("Fetching from NASA API for date: " + (date == null ? "Today" : date));

        URI uri = uriBuilder.build().toUri();

        return restTemplate.getForObject(uri, ApodResponse.class);
    }

    @Cacheable(value = "apod-recent")
    public List<ApodResponse> getRecentApods(int count) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("api_key", apiKey)
                .queryParam("count", count);

        System.out.println("Fetching " + count + " random APODs...");

        URI uri = uriBuilder.build().toUri();

        ApodResponse[] response = restTemplate.getForObject(uri, ApodResponse[].class);
        return Arrays.asList(response);
    }

    public List<ApodResponse> getLast7Days() {
        LocalDate today = LocalDate.now(ZoneId.of("America/New_York"));

        LocalDate sevenDaysAgo = today.minusDays(6);

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("api_key", apiKey)
                .queryParam("start_date", sevenDaysAgo.toString())
                .queryParam("end_date", today.toString());

        System.out.println("Fetching range (NY Time): " + sevenDaysAgo + " to " + today);

        URI uri = uriBuilder.build().toUri();

        ApodResponse[] response = restTemplate.getForObject(uri, ApodResponse[].class);

        List<ApodResponse> list = Arrays.asList(response);
        Collections.reverse(list);
        return list;
    }
}