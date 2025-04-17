# 🧠 RAG Chatbot with F1 Tech Stack (Full TypeScript)

A blazing-fast Retrieval-Augmented Generation (RAG) Chatbot using a unified **TypeScript** stack on both frontend and backend. Powered by **Next.js**, **TailwindCSS**, **Gemini API**, and **DataStax Astra Vector DB**.

---

## 🚀 Tech Stack

| Layer     | Tech                                |
|-----------|-------------------------------------|
| Frontend  | Next.js, TypeScript, TailwindCSS    |
| Backend   | Node.js, TypeScript, Express or tRPC |
| Vector DB | DataStax Astra (Vector Search)      |
| LLM       | Gemini API (Google AI)              |

---

## 🔧 Project Structure

```
.
├── backend/                # TypeScript backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── rag/            # RAG logic (embeddings, vector search)
│   │   └── server.ts       # Express server or tRPC handler
│   └── tsconfig.json
│
├── frontend/               # Next.js frontend
│   ├── components/         # Reusable UI components
│   ├── pages/              # Pages using app router or pages router
│   └── styles/             # TailwindCSS
│
├── .env
└── README.md
```

---

## 🧠 Features

- 🤖 Retrieval-Augmented Generation chatbot
- 📁 Document embedding and Astra vector search
- 🧠 Gemini API for intelligent, contextual responses
- 🎨 TailwindCSS-based chat UI
- 🌐 Unified TypeScript codebase

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rag-chatbot-ts.git
cd rag-chatbot-ts
```

### 2. Configure Environment Variables

Create a `.env` file in the root:

```env
GEMINI_API_KEY=your_gemini_api_key
ASTRA_DB_ID=your_astra_db_id
ASTRA_DB_REGION=your_region
ASTRA_DB_KEYSPACE=your_keyspace
ASTRA_DB_APPLICATION_TOKEN=your_astra_application_token
```

---

## 🖥️ Frontend (Next.js + TailwindCSS)

### Install & Start Dev Server

```bash
cd frontend
npm install
npm run dev
```

### TailwindCSS is pre-configured in:

- `tailwind.config.js`
- `postcss.config.js`
- `index.css`

---

## 🔙 Backend (TypeScript + Node.js + Express/tRPC)

### Install & Run

```bash
cd backend
npm install
npm run dev
```

Make sure your `server.ts` handles:

- Routes for chat input
- Embedding and querying Astra Vector DB
- Gemini API request/response

---

## 🔍 How the RAG Pipeline Works

```text
[User Question]
      ⬇
[Convert to Vector Embedding]
      ⬇
[Search Vector DB (Astra)]
      ⬇
[Retrieve Top-k Matches]
      ⬇
[Send Context + Question to Gemini]
      ⬇
[Generate Response]
      ⬇
[Display in UI]
```

---

## 📚 Useful Resources

- 🔗 [Gemini API Docs](https://ai.google.dev/docs)
- 🔗 [Astra DB Docs](https://docs.datastax.com/en/astra/)
- 🔗 [Next.js](https://nextjs.org/)
- 🔗 [Tailwind CSS](https://tailwindcss.com/)
- 🔗 [tRPC (optional)](https://trpc.io/)
- 🔗 [TypeScript](https://www.typescriptlang.org/)

---

## 🛠️ Deployment Tips

- Frontend: Deploy via [Vercel](https://vercel.com)
- Backend: Host with [Railway](https://railway.app), [Render](https://render.com), or self-hosted
- Set env vars securely in your dashboard

---

## 📌 License

MIT License.  
Feel free to fork, improve, and contribute!

---

## 👨‍💻 Author

Built by [Your Name] with 💙  
Have suggestions? PRs welcome.
