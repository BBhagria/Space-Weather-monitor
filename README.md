# 🌌 Space Weather Monitor

A real-time dashboard that visualizes space weather events, near-Earth asteroid data, and NASA’s Astronomy Picture of the Day (APOD), using data from NASA’s public APIs. Built with a React + Vite frontend and an Express backend, the application provides an engaging and informative UI for monitoring cosmic activity.

---

## 📁 Project Structure

```
├── frontend/         # React + Vite UI for data visualization
├── backend/          # Express server for proxying and securing NASA API requests
└── README.md         # You're here!
```
"Note: This app is hosted on Render's free tier. It may take a few seconds to wake up after a period of inactivity due to cold start."
---

## 🚀 Live Application

🔗 **Deployed URL:** [https://space-weather-monitor.vercel.app/](https://space-weather-monitor.vercel.app/)

---

## 💻 GitHub Repository

📦 **Repo URL:** [https://github.com/BBhagria/Space-Weather-monitor](https://github.com/BBhagria/Space-Weather-monitor)

---

## 📦 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **APIs Used:**  
  - [NASA APOD](https://api.nasa.gov/#apod)  
  - [NASA DONKI](https://api.nasa.gov/#donki)  
  - [NASA NEO (Asteroid Feed)](https://api.nasa.gov/#neo)

---

## 🧪 Features

- 📷 Astronomy Picture of the Day (APOD)
- ☄️ Real-time Asteroid Monitoring
- ☀️ Solar Flare & CME Tracking via DONKI
- 🌍 Geomagnetic Storms and K-index monitoring
- 💨 Solar Wind visualization
- 🧊 Animated and responsive UI

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/BBhagria/Space-Weather-monitor.git
cd space-weather-monitor
```

---

### 2. Frontend Setup (`frontend/`)

```bash
cd frontend
npm install
npm run dev
```

> Runs the app at `http://localhost:8080` (or similar)

---

### 3. Backend Setup (`backend/`)

```bash
cd backend
npm install
npm run start
```

> The backend runs on `http://localhost:5000` and proxies requests to NASA APIs.

---

### 4. Environment Variables

Create a `.env` file in the `backend/` folder with:

```env
PORT=5000
NASA_API_KEY=your_nasa_api_key_here
```

You can obtain a NASA API key here: [https://api.nasa.gov](https://api.nasa.gov)

---

## 📃 License

MIT License — feel free to fork, clone, and enhance.

---

## 📩 Submission Checklist

✅ Deployed Application Link  
✅ GitHub Source Repository  
✅ Complete README with setup instructions

---

## 🙋‍♂️ Author

**Your Name**  
📧 your.email@example.com  
🔗 [GitHub](https://github.com/BBhagria)
