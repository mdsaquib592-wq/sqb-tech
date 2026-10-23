# Tech SQB — Enterprise Software & Web Services Platform

<div align="center">
  <img src="public/Logo.png" alt="Tech SQB Logo" width="480"/>
  <p><strong>Next-Gen Software Products & Scalable Web Solutions Marketplace</strong></p>

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_%26_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment_Gateway-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)](https://razorpay.com/)

</div>

---

## 📌 Executive Summary

**Tech SQB** is an e-commerce and showcase platform built for software engineers, agency owners, and digital creators. It bridges the gap between downloadable client software (installers, desktop utilities, Android `.apk` builds) and on-demand professional web services (SaaS architecture, DevSecOps, AI integrations).

The application features an authentication barrier, ensuring visitors must register and authenticate before downloading tools or placing orders. Transactions are handled via **Razorpay**, which automatically authorizes direct downloads and mints unique client license keys in real time.

---

## 🚀 Key Features

- **Split Catalog Sliders:** Smooth, swipeable horizontal carousels displaying Software Products and Web Services.
- **Mandatory Authentication Gate:** Downloads and checkout workflows are locked behind user login/registration.
- **Role-Based Access Control (RBAC):** Dedicated administrative capabilities reserved for `admin@techsqb.com`.
- **Live Cloud Database (Firebase Firestore):** Products, services, and transactions are synchronized in real time without page reloads.
- **Built-in Payment Gateway (Razorpay):** Automated transaction fulfillment with instant post-payment file delivery and license key generation.
- **Dynamic Link Manager:** Administrators can add new binaries, APKs, source code archives, or services directly through the live UI.
- **Brand Aesthetic:** Deep slate and obsidian backgrounds (`#050811`) complemented by metallic typography and cyan neon flare accents.

---

## 🛠️ Technology Stack

| Layer                  | Technology                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Frontend Framework** | [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)                                       |
| **Styling & Design**   | [Tailwind CSS v3](https://tailwindcss.com/) & Vanilla CSS animations                                  |
| **Iconography**        | [Lucide React](https://lucide.dev/)                                                                   |
| **Authentication**     | [Firebase Authentication](https://firebase.google.com/products/auth) (Email & Password)               |
| **Database**           | [Cloud Firestore](https://firebase.google.com/products/firestore) (Real-Time NoSQL)                   |
| **Payment Gateway**    | [Razorpay Checkout SDK](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/) |

---

## 📂 Architecture & Directory Structure

```text
sqb-tech/
├── public/
│   ├── Logo.png              # Primary Tech SQB high-res logo
│   ├── Hero.png              # Showcase hero artwork
│   └── founder.jpg           # Founder & Chief Architect portrait
├── src/
│   ├── components/
│   │   ├── About.jsx         # Company mission, pillars & founder profile
│   │   ├── ActionModal.jsx   # Razorpay checkout & download fulfillment
│   │   ├── AdminPanel.jsx    # Real-time product/service publisher
│   │   ├── AuthModal.jsx     # Firebase email/password login & registration
│   │   ├── Contact.jsx       # Interactive contact form & business channels
│   │   ├── Footer.jsx        # Navigation links & copyright notices
│   │   ├── Hero.jsx          # Hero display with primary CTAs
│   │   ├── HorizontalSlider.jsx # Interactive horizontal carousel
│   │   └── Navbar.jsx        # Navigation bar with dynamic admin controls
│   ├── data/
│   │   └── catalogData.js    # Seed catalog (10 software items + 10 web services)
│   ├── App.jsx               # Central state controller & Firestore listeners
│   ├── firebase.js           # Firebase app initialization & service exports
│   ├── index.css             # Tailwind base layers & custom scrollbar resets
│   └── main.jsx              # React DOM render root
├── index.html                # HTML entry point with Razorpay script
├── tailwind.config.js        # Theme definitions & brand color palette
└── package.json              # Project dependencies & scripts
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- [npm](https://www.npmjs.com/) (version `9.x` or higher)
- [Git](https://git-scm.com/)

### 2. Clone the Repository

```bash
git clone https://github.com/<your-username>/sqb-tech.git
cd sqb-tech
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables & Firebase

Create a `src/firebase.js` file and add your Firebase project credentials:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 5. Configure Razorpay

In `src/components/ActionModal.jsx`, insert your public test key ID:

```javascript
const options = {
  key: "rzp_test_YOUR_KEY_ID",
  amount: Math.round(Number(item.price) * 100),
  currency: "INR",
  // ...
};
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 🛡️ Administrative Authentication

Administrative controls are locked to the primary administrator address:

- **Default Master Admin Email:** `admin@techsqb.com`
- **Privileges:** Unlocks the **Admin Link Manager** in the navbar to publish new software binaries, APKs, and web service packages to the live database.

To customize the admin identity, modify the `ADMIN_EMAIL` constant in `src/App.jsx`.

---

## 📦 Production Build & Deployment

To create an optimized production build:

```bash
npm run build
```

The compiled assets will be placed in the `dist/` directory, ready to be deployed to platforms like [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [Firebase Hosting](https://firebase.google.com/docs/hosting).

---

## 📄 License

This project is proprietary and developed under **Tech SQB**. All rights reserved.
