# 🛍️ Shoe Store — Demo Application

A small web application for managing a simple shoe purchasing flow.  
Includes authentication, product browsing, purchasing, video pages, and Google Analytics tracking.

## 🚀 Demo

- **Frontend (Netlify):** https://nielsen-shoe-store.netlify.app/
- **Backend (Render):** (may take 30–60 sec to wake up)
- **[Google Analytics Looker Studio Report](https://lookerstudio.google.com/reporting/cd95ce32-97b5-4632-887f-f9bf25234a95)**

---

## 📦 Features

### 🔐 Authentication

- Login using email + password (stored in SQLite)
- Login with Google and Facebook (Firebase Auth)
- Protected routes

### 🛒 Shopping & Purchase Flow

- Product list loaded from the database
- Stock availability per product
- Quantity input with validation
- Flow: Buy → Summary → Complete Purchase
- Database stock updates after successful purchase

### 📹 Product Video Page

- Clicking a product description opens a video page
- Video links stored in the database (YouTube URLs)

### 📊 Google Analytics

Tracks:

- Page views
- Form input errors
- Product video views and play events
- Checkout start and purchase completion
- Login attempts (password, Google, Facebook)

Public Looker Studio dashboard available at the link above.

---

## 🛠️ Tech Stack

### Frontend

- React + TypeScript + Vite
- Zustand (state management)
- Ant Design (UI)
- React Router
- Firebase Authentication
- React Player
- Google Analytics (gtag)

### Backend

- Node.js + Express
- SQLite
- CORS
- REST API

---

## ⚙️ Local Setup

### 1. Backend

```
cd server
npm install
npm run dev
```

Backend runs at: `http://localhost:4000`

### 2. Frontend

Create `.env` inside `/client`:

```
VITE_API_BASE=http://localhost:4000/api

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

Run:

```
cd client
npm install
npm run dev
```

App will be available at: `http://localhost:5173`

---

## 🧪 Test Users

| Email                     | Password |
| ------------------------- | -------- |
| John.papas@hotmail.com    | pass38i  |
| nick.tesla@gmail.com      | hi345s   |
| Mike.macdonalds@gmail.com | nh487    |
