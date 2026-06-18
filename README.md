# 🍃 CarbonIQ

**CarbonIQ** is an intelligent, full-stack platform designed to help users track, understand, and reduce their personal carbon footprint through data and artificial intelligence. 

Instead of manual guessing, CarbonIQ leverages the Gemini AI model to automatically extract emissions data from uploaded receipts and utility bills, while providing an interactive "Sustainability Coach" to offer personalized, actionable advice for an eco-friendly lifestyle.

### ✨ Key Features
- **📊 Real-time Footprint Tracking:** Log daily activities (transportation, diet, energy) to visualize your carbon footprint.
- **🤖 AI Sustainability Coach:** Chat with an AI trained in climate science to get personalized reduction tips.
- **📸 Smart OCR Scanning:** Upload grocery receipts or energy bills, and let our AI automatically extract the consumption data and calculate the emissions.
- **🎯 Dynamic Goals:** Set targeted reduction goals and track your progress daily towards net-zero.
- **🌍 Community Feed:** Join eco-challenges, share milestones, and compete on the global leaderboard.

### 🛠️ Tech Stack
- **Frontend:** Next.js 15, React, Tailwind CSS, Shadcn UI, Recharts, Lucide Icons.
- **Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL.
- **Database & Auth:** PostgreSQL, Supabase
- **AI Integrations:** Google Gemini 2.5 Flash

---

## How to Run Locally

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- A Supabase Project
- A Google Gemini API Key

### 1. Database Setup (Supabase)
1. Create a new Supabase project.
2. Get your `URL` and `anon key` from the project settings.
3. Your database should have a `users` table and a `carbon_activities` table (SQLAlchemy creates these automatically if you run `models.Base.metadata.create_all(bind=engine)` in `main.py`).

### 2. Backend Setup (FastAPI)
Navigate to the `be` directory:
```bash
cd be
```

Create a virtual environment and install dependencies:
```bash
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `be` directory:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

Start the FastAPI server:
```bash
uvicorn main:app --reload
```
The backend will run at `http://localhost:8000`.

### 3. Frontend Setup (Next.js)
Open a new terminal and navigate to the `fe` directory:
```bash
cd fe
```

Install NPM dependencies:
```bash
npm install
```

Create a `.env.local` file in the `fe` directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the Next.js development server:
```bash
npm run dev
```
The frontend will run at `http://localhost:3000`.

---

## Deployment
- **Frontend:** The `fe` folder is optimized for deployment on [Vercel](https://vercel.com).
- **Backend:** The `be` folder contains a `Dockerfile` ready to be deployed on services like Render, Google Cloud Run, or AWS ECS.
