# SignLink AI - Real-time ASL Interpreter

SignLink AI is an advanced web application designed to facilitate learning and communication using American Sign Language (ASL). It leverages cutting-edge computer vision to provide real-time feedback and translation.

## 🚀 Features

### 1. Real-time Communication Bridge
- **Hand Tracking:** Powered by MediaPipe Hands for high-precision 21-point landmark detection.
- **Dynamic Recognition:** Supports motion-based signs (e.g., "Hello", "Thank You", "Yes/No") using temporal trajectory analysis.
- **Gesture Stabilization:** Implements a frame-buffer consensus system to prevent flickering and ensure accurate transcriptions.
- **Visual Debugging:** Live hand skeleton overlay and confidence meters.

### 2. Interactive Learning
- **A-Z Alphabet:** Visual guides for every letter.
- **Numbers 0-20:** Practice counting with real-time verification.
- **Common Phrases:** Learn essential signs for daily interaction.
- **XP System:** Track progress and level up as you master new signs.

### 3. Professional UI/UX
- **Bento-style Dashboard:** Modern, clean interface for easy navigation.
- **Responsive Design:** Optimized for both desktop and mobile web.
- **Low Latency:** Optimized ML pipeline running directly in the browser.

## 🛠️ Tech Stack
- **Frontend:** React 18, Vite, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **AI/ML:** MediaPipe (@mediapipe/hands), TensorFlow.js
- **Icons:** Lucide React

## 📂 Project Structure
- `/src/pages`: Main application views (Home, Learn, Communicate, Profile).
- `/src/services`: Core logic for hand tracking and gesture classification.
- `/src/components`: Reusable UI components.
- `/src/constants.ts`: Data definitions for lessons and ASL vocabulary.

## 🚦 Getting Started
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open `http://localhost:3000` in your browser.

*Note: Access to the webcam is required for the Communicate and Learn features.*
