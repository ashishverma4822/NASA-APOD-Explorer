#  NASA APOD Explorer

> **A futuristic portal to the cosmos.** > A full-stack web application that transforms NASA's Astronomy Picture of the Day (APOD) API into an immersive, dark-themed visual experience.

![Project Banner](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_%2B_Spring_Boot-blue?style=for-the-badge)

## Overview

**NASA APOD Explorer** is designed to present the wonders of the universe through a high-performance interface. It leverages the public NASA API to fetch astronomical imagery, wrapping it in a "Space-Dark" UI designed for immersion. 

Unlike standard API wrappers, this project implements a **Java Spring Boot backend** to handle caching, security (hiding API keys), and complex date logic (timezone conversions), ensuring a seamless experience for users regardless of their location.

---

## Key Features

### Immersive Frontend
* **3D Coverflow Slider:** A custom-built 3D carousel on the home page that strictly fetches the **last 7 days** of history (chronological).
* **Cinematic Gallery:** Features a large hero slider for top images and a responsive infinite grid for discovery.
* **Deep Time Search:** A custom dark-mode calendar allows users to jump back to specific dates (starting from 1995).
* **Smart Media:** Handles both HD images and video content (YouTube/Vimeo) seamlessly.
* **Interactive Modals:** Full-screen details view with split-layout metadata.

### Robust Backend
* **Performance Caching:** Implements in-memory caching to prevent API Rate Limiting (429 Errors) and speed up repeated requests.
* **Timezone Intelligence:** Automatically converts user requests to **New York Time (EST)** to ensure the "Today" and "Last 7 Days" endpoints never fail due to timezone differences between the user and NASA servers.
* **Secure Architecture:** Acts as a proxy to keep the NASA API Key hidden from the client-side browser.

---

## Tech Stack

### Frontend (Client)
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS (Custom "Space-Black" Palette)
* **Icons:** Lucide React
* **Components:** React Datepicker, Custom 3D Carousel
* **HTTP Client:** Axios

### Backend (Server)
* **Framework:** Java Spring Boot 3
* **Build Tool:** Maven
* **Caching:** Spring Cache (ConcurrentMap)
* **Utilities:** Java Time API (ZoneId), RestTemplate

---

## 📸 Screenshots

| Home Page (3D Slider) | Gallery View | Detail Modal |
|:---:|:---:|:---:|
| ![Home](https://github.com/ashishverma4822/NASA-APOD-Explorer/blob/main/ScreentShot/Home1.png?raw=true) | ![Gallery](https://github.com/ashishverma4822/NASA-APOD-Explorer/blob/main/ScreentShot/Gallery.png?raw=true) | ![Modal](https://github.com/ashishverma4822/NASA-APOD-Explorer/blob/main/ScreentShot/Search.png?raw=true) |

---

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites
* **Node.js** (v16+)
* **Java JDK** (v17+)
* **NASA API Key** (Get one for free at [api.nasa.gov](https://api.nasa.gov/))

### 1. Backend Setup (Spring Boot)

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Open `src/main/resources/application.properties` and add your API Key:
    ```properties
    server.port=5000
    nasa.api.key=YOUR_ACTUAL_API_KEY_HERE
    nasa.api.url=[https://api.nasa.gov/planetary/apod](https://api.nasa.gov/planetary/apod)
    ```
3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
    *The server will start on `http://localhost:5000`*

### 2. Frontend Setup (React)

1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and visit the URL shown (usually `http://localhost:5173`).

---

## API Endpoints

The Java Backend exposes the following REST endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/apod` | Fetches today's APOD. |
| `GET` | `/api/apod?date=YYYY-MM-DD` | Fetches APOD for a specific date. |
| `GET` | `/api/apod/last-week` | Fetches the strictly chronological last 7 days (for Home Slider). |
| `GET` | `/api/apod/recent?count=12` | Fetches random images (for Gallery). |

---

## 📂 Project Structure

```text
nasa-apod-explorer/
├── backend/                 # Java Spring Boot
│   ├── src/main/java/com/lostsetbit/APOD_API/
│   │   ├── config/          # Cache & CORS Config
│   │   ├── controller/      # REST Endpoints
│   │   ├── model/           # Data Classes
│   │   └── service/         # Business Logic & NASA API Calls
│   └── pom.xml
│
└── frontend/                # React + Vite
    ├── src/
    │   ├── components/      # Reusable UI (ApodCard, Navbar, Footer)
    │   ├── pages/           # Home, Gallery, Search
    │   ├── services/        # Axios API Configuration
    │   └── App.jsx
    └── tailwind.config.js
```
---

## License
This project is developed for educational purposes.
Data and Imagery courtesy of NASA.
© 2025 LostSetBit hiAyu(💞).
