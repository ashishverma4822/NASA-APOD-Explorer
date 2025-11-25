package com.lostsetbit.APOD_API.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ApodResponse {
    private String date;
    private String explanation;

    @JsonProperty("media_type")
    private String mediaType;

    @JsonProperty("service_version")
    private String serviceVersion;

    private String title;
    private String url;
    private String copyright;
}