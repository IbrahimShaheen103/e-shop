# 🛒 E-Shop App

A modern **E-commerce mobile application** built with **React Native + Expo**, featuring authentication, product browsing, cart management, profile screen, and smooth UI animations.

---

## 📱 Features

- 🔐 **Authentication**
  - Login with persisted session
  - Secure token handling
  - Logout with confirmation

- 🏠 **Home**
  - Product grid (2 columns)
  - Add / remove items directly
  - Animated header & cart badge

- 🔍 **Search**
  - Product search with autocomplete
  - Animated compact header

- 🛒 **Cart**
  - Increase / decrease quantity
  - Remove items
  - Total price & quantity
  - Cart badge in tab bar

- 👤 **Profile**
  - User avatar & info
  - Clean card-based UI
  - Logout from header

- 🎨 **UI / UX**
  - Animated headers
  - Modern card-based design
  - Custom app icon
  - Smooth transitions

---

## 🧱 Tech Stack

- React Native
- Expo (Managed Workflow)
- TypeScript
- Zustand – state management
- Axios – API calls + interceptors
- React Navigation
  - Native Stack Navigator
  - Bottom Tabs Navigator
- EAS Build – APK generation

---

## 🌐 API Used

**DummyJSON API**

- Products  
  https://dummyjson.com/products

- Authentication  
  https://dummyjson.com/auth/login

- Carts  
  https://dummyjson.com/carts

---

## 📂 Project Structure

src/
│
├── api/ # API calls (auth, products, cart)
├── components/ # Reusable UI components
│ └── AppHeader
│
├── hooks/ # Custom hooks (auth guard, etc.)
├── navigation/ # RootStack, AuthStack, Tabs
├── screens/
│ ├── Home
│ ├── Cart
│ ├── Search
│ ├── Profile
│ └── Login
│
├── store/ # Zustand stores
│ ├── auth.store
│ ├── cart.store
│ └── products.store
│
├── types/ # Shared types & themes
└── assets/ # Images & app icon

---

## ▶️ Running the App Locally

### 1️⃣ Install dependencies

```bash
npm install
### 2️⃣ Start development server
npx expo start
3️⃣ Run on device

-Expo Go (Android / iOS)

-Android Emulator

-iOS Simulator (macOS)
```
