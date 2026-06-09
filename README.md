# 🤟 SignBridge AI — Intelligent Real-Time Sign Language & Multilingual Translation

SignBridge AI is a fully featured, elegant, and responsive full-stack platform designed to bridge the communication gap between individuals who express themselves in American Sign Language (ASL) and those who speak or read English and other global languages. 

Leveraging low-latency computer-assisted computer vision directly inside the browser and modern server-side generative AI LLM models, the system delivers frictionless translation, real-time hand-landmark telemetry tracking, dynamic sentence construction, interactive learning paths, and an active Emergency SOS assistant.

---

## 🚀 Key Modules & Capabilities

### 1. ⚡ Live Sign Language Interpreter & Hand Telemetry
*   **MediaPipe Hands Integration:** High-precision, zero-latency 21-point hand landmark coordinate extraction running entirely on the user's local hardware.
*   **Gesture Stabilization & Filtering:** Implements temporal frame smoothing to filter noise and eliminate word flickering during transitions.
*   **Intake HUD Stats:** Live telemetry displaying:
    *   Active Hand Count (Single/Double hands)
    *   Dominant Hand Identification (Left vs. Right)
    *   Active Finger Tracker (Real-time mapping of which fingers are extended)
    *   Vision Confidence Ratings (%) and Render Frame Rate (FPS)

### 2. 🤖 Gemini-Powered Multilingual Translation Pipeline
*   **Sequential Translation:** As you perform individual letters or motion coordinates, they append to a responsive dynamic Sentence Builder. A server-side `gemini-3.5-flash` route intelligently compiles the gesture stream into fluid, grammatically sound English sentences.
*   **Multilingual Target Output:** Convert the translated English sentences into global languages of your choice including **Spanish, Telugu, Hindi, French, German**, and more on-demand via the Gemini translation endpoint.
*   **Vocabulary Phrasebook & Bookmarking:** Save and export helpful phrases, track practice milestones, and earn experience points (**XP**) stored locally.

### 3. 🚨 High-Priority Emergency SOS Assistance
*   **High-Visibility Interface:** Quickly trigger targeted alerts across various categories: General Assistance, Medical distress, Fire/Hazards, Police Dispatch, Breathing difficulties, or Geo-location assistance.
*   **Bystander Voice Synthesis:** Integrates physical Text-To-Speech (TTS) synthesized audio read aloud directly in the environment to alert nearby individuals or paramedics.
*   **Flashing Distress Beacon:** A pulsing physical screen overlay to attract visual attention in loud or low-visibility situations.

### 4. 🎓 Gamified Interactive Learning Curriculum
*   **Alphabet Practice (A–Z):** Complete hand positioning guidance with real-time accuracy scoring and immediate AI feedback.
*   **Number Training (0–20):** Interactive levels designed to test and reinforce counting gestures.
*   **Phrase Mastery:** Learn complete expressions for daily dialogue like "Hello", "Thank You", "Learned", and "Help".
*   **Score Verification:** Evaluates images using server-side vision parameters to identify wrist angles, knuckle folds, and finger coordinates.

---

## 🛠️ The Tech Stack

| Domain | Technolgies & Libraries |
| :--- | :--- |
| **Frontend Framework** | **React 19** with **Vite** & **TypeScript** |
| **Styling & Motion** | **Tailwind CSS**, **Framer Motion** / **Motion** |
| **Vision Model Execution**| **MediaPipe Hands** (`@mediapipe/hands`), **TensorFlow.js** |
| **Generative AI Agent** | **Google GenAI SDK** (`@google/genai`) on **Gemini 3.5 Flash** |
| **Proxy Server & Backend**| **Express.js** powered by `tsx` (TypeScript Execute) |
| **Authentication** | **Firebase client SDK** (Optional account synchronization) |
| **Vector Icons** | **Lucide React** (Clean, uniform icon pairings) |

---

## 📂 Project Structure

```text
├── server.ts                 # Full-stack backend Express application with Gemini AI proxy routing
├── vite.config.ts            # Vite asset Bundler & development pipeline settings
├── package.json              # System script executions, core dependencies, and devDependencies
├── .env.example              # Template containing essential environment configuration variables
├── src/
│   ├── main.tsx              # Single-page application mounting point
│   ├── App.tsx               # Primary App controller, router mapping, and global layouts
│   ├── types.ts              # Declarative TypeScript type models
│   ├── pages/
│   │   ├── HomePage.tsx      # Landing page, feature overview, and quick-launch menus
│   │   ├── LearnPage.tsx     # Curriculum directory, training modes, and visual guide sheets
│   │   ├── CommunicatePage.ts# Vision intake camera canvas, telemetry telemetry, and text-to-speech
│   │   └── ProfilePage.tsx   # Personalized analytics logs, streaks, and achievement status
│   ├── components/
│   │   └── EmergencySOSModal.tsx # Global alarm overlay with localized audio broadcasting
│   ├── ai/
│   │   ├── handTracker.ts    # Direct controller bound to MediaPipe Hand Vision pipelines
│   │   ├── staticClassifier.ts# Geometric coordinate algorithms for fixed posture letters
│   │   ├── dynamicClassifier.ts# Vector trajectory mapping for gesture motions ("Hello", "Master")
│   │   └── gestureStabilizer.ts# Frame-buffer stabilization engine 
│   └── services/
│       └── aiService.ts      # Client client communication requesting Server-side AI proxies
```

---

## 🚦 Getting Started (Local Setup & Run)

Follow these directions to spin up the server locally on your machine or inside **Visual Studio Code**:

### 1. Prerequisites
Ensure you have **Node.js** installed (v18.x or v20.x recommended) alongside **npm**.

### 2. Install Project Dependencies
In your local CLI terminal, download and cache the verified packages:
```bash
npm install
```

### 3. Declare Environment Keys (`.env`)
The program communicates securely with Gemini via an environment file. 
1. Create a file named **`.env`** in the root of your directory.
2. Open **`.env`** and input your API key (get one from Google AI Studio):
   ```env
   GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY
   ```
*(Note: Do not commit your actual `.env` file containing the key to your remote repository! It is excluded by default in the `.gitignore`.)*

### 4. Execute the Application
Run the bundler-plus-backend development loop:
```bash
npm run dev
```
The console will log the active network socket. Open **`http://localhost:3000`** inside your web browser. 

---

## 📦 Setting Up Your GitHub Repository

If you are committing this project to a remote **GitHub** repository for the first time, carry out these steps in your command interface:

### 1. Launch Git & Stage Code
Initialize a local vault, add your files, and prepare your initial snapshot:
```bash
git init
git add .
git commit -m "feat: initialize SignBridge AI with real-time interpretation, handwriting HUD, and SOS beacon"
```

### 2. Bind to a GitHub Repository
Set your branch name to `main`, link it to your newly created remote repository on GitHub, and perform the initial upload:
```bash
# Rename the default branch to 'main'
git branch -M main

# Link to your remote GitHub (replace with your actual git address)
git remote add origin https://github.com/your-username/signbridge-ai.git

# Push code securely
git push -u origin main
```

### 3. Deploying Secrets
If you deploy your app to hosted platforms like **Vercel**, **Render**, or **Cloud Run**, make sure to add `GEMINI_API_KEY` to the platform's Environment Variables panel!
