# 🎉 MemorAI_zer 🚀

**MemorAI_zer** is your ultimate AI-powered flashcard app that transforms passive reading into active learning! By blending cognitive science principles with state-of-the-art deep learning models, MemorAI_zer helps you remember more—faster, and for longer. 💡

---

## 📚 Table of Contents
1. [✨ Key Features](#-key-features)
2. [🛠️ Tech Stack](#️-tech-stack)
3. [⚙️ Installation & Setup](#️-installation--setup)
4. [🚀 Running the App](#-running-the-app)
5. [📂 Project Structure](#-project-structure)
6. [🤝 Contributing](#-contributing)
7. [📝 License](#-license)

---

## ✨ Key Features

- 🎯 **AI-Powered Q&A Generation**: Automatically generate flashcards from any STEM text using a fine-tuned T5 model.
- ⏰ **Smart Spaced Repetition**: Combines SM-2, reinforcement learning heuristics, and Bayesian Knowledge Tracing for personalized review schedules.
- 🖼️ **Dual-Coding Booster**: Generate illustrative images offline with Stable Diffusion to enhance recall.(Future Plans)
- 📊 **Progress Tracking**: Visualize your mastery curve and review history in integrated dashboards.
- ⚡ **Offline-First PWA**: Study anywhere—even without internet—thanks to a lightweight service worker cache.

---

## 🛠️ Tech Stack

| Layer        | Technology                                    |
|--------------|-----------------------------------------------|
| **Frontend** | React, TypeScript, Redux, React-Bootstrap, PWA|
| **Backend**  | Python, Flask, Hugging Face Transformers, Diffusers, SuperMemo2, pyBKT, SB3 DQN|
| **Storage**  | IndexedDB (frontend caching), Flask Static 🌐 |
| **Deployment** | Any WSGI server + CDN for static assets     |

---

## ⚙️ Installation & Setup

1. **Clone the Repo**
   ```bash
   git clone https://github.com/yourusername/MemorAI_zer.git
   cd MemorAI_zer
   ```

2. **Backend (Flask)**
   ```bash
   cd backend
   python -m venv .venv       # Create virtual env
   source .venv/bin/activate  # macOS/Linux
   .\.venv\Scripts\activate # Windows
   pip install -r requirements.txt
   ```

3. **Frontend (React)**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment**
   - For offline model caching: set `HF_HUB_OFFLINE=1`
   - (Optional) Add API_BASE_URL in `.env` for custom endpoints

---

## 🚀 Running the App

1. **Start the Backend**
   ```bash
   cd backend
   flask run --reload
   ```

2. **Start the Frontend**
   ```bash
   cd frontend
   npm start
   ```

3. **Open in Browser**
   👉 Frontend: [http://localhost:3000](http://localhost:3000)

4. **Study Mode**
   - Paste your STEM text, click **Generate Flashcards** 💥
   - Reveal answers, rate recall quality, and watch your mastery grow!

---

## 📂 Project Structure

```
MemorAI_zer/
├── backend/        # Flask API + AI models
│   ├── app.py      # Main server
│   ├── drl_scheduler.py
│   ├── bkt_model.py
│   └── requirements.txt
└── frontend/       # React PWA
    ├── public/     # index.html, sw.js, manifest.json
    ├── src/        # React components & Redux store
    └── package.json
```

---

## 🤝 Contributing

Love MemorAI_zer? We welcome contributions! 🎉

1. Fork this repo 📋
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add fancy new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request 🚀

Please follow our [Code of Conduct](./CODE_OF_CONDUCT.md) and writing style (Prettier + BEM for CSS). 

---

## 📝 License

This project is licensed under the **CC BY-NC-ND 4.0** License. See [LICENSE.md](LICENSE.md) for details.

---

💡 **Happy Learning!** 💡
