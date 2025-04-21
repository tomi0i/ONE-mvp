# AI MVPプラットフォーム

## セットアップ
```bash
# Frontend
cd frontend
npm install
npm run dev
# Backend
cd ../backend
pip install -r requirements.txt
uvicorn app.main:app --reload


# AI MVP Builder β / コード生成アプリ

> **EN / JP bilingual README** — English comes first, 日本語は後ろに続きます。

---

## 🇬🇧 English Quick Start

### 0. Project Overview
A two‑tier demo that generates starter code from an idea:

* **Backend** — FastAPI + OpenAI SDK (async).  
* **Frontend** — Next.js 15 + React + Tailwind CSS.

### 1. Prerequisites
| Tool | Minimum Version | Used for |
|------|-----------------|----------|
| **Python** | 3.11 | FastAPI backend |
| **Node.js** | 20 LTS | Next.js frontend |
| **npm** | ≥ 10 | package manager |
| **Git** | any | clone / version control |

### 2. Clone & Initialise
```bash
# 1. clone
$ git clone <your-fork-url> ai-mvp-builder
$ cd ai-mvp-builder

# 2. create virtual env (Windows PowerShell)
$ python -m venv backend/.venv
$ backend/.venv/Scripts/Activate.ps1
```

### 3. Backend Setup
```bash
# inside backend/
(venv) $ pip install -r requirements.txt

# --- .env (do NOT commit) ---
OPENAI_API_KEY=sk-********************************
OPENAI_MODEL=gpt-4o-mini-2024-07-18
```
Run dev server (auto‑reload):
```bash
(venv) $ uvicorn app.main:app --reload
```

### 4. Frontend Setup
```bash
$ cd ../frontend
# install deps
$ npm install
# dev server
$ npm run dev
```
Open <http://localhost:3000> and generate code!

### 5. Handy Scripts
| Command | Description |
|---------|-------------|
| `npm run dev:all` | **concurrently** starts backend + frontend |
| `pip freeze > requirements.txt` | update exact backend deps |

### 6. Troubleshooting
* **Port already in use** → change `3000/8000` in dev scripts.
* **CORS 405** → confirm `allow_origins=["http://localhost:3000"]`.
* **Tailwind CLI missing** → `npm dlx @tailwindcss/cli init -p`.

---

## 🇯🇵 日本語クイックスタート

### 0. プロジェクト概要
アイデアから**スターターコード**を生成する 2 層構成のデモ。

* **バックエンド** — FastAPI + OpenAI SDK (非同期)  
* **フロントエンド** — Next.js 15 + React + Tailwind CSS

### 1. 前提ツール
| ツール | 最低バージョン | 用途 |
|--------|----------------|------|
| **Python** | 3.11 | バックエンド実行 |
| **Node.js** | 20 LTS | フロントビルド |
| **npm** | 10 以上 | パッケージ管理 |
| **Git** | 任意 | リポジトリ取得 |

### 2. クローン & 初期化
```bash
# 1. クローン
$ git clone <your-fork-url> ai-mvp-builder
$ cd ai-mvp-builder

# 2. 仮想環境 (Windows PowerShell)
$ python -m venv backend/.venv
$ backend/.venv/Scripts/Activate.ps1
```

### 3. バックエンドセットアップ
```bash
# backend/ ディレクトリで
(venv) $ pip install -r requirements.txt

# --- .env (コミットしない) ---
OPENAI_API_KEY=sk-********************************
OPENAI_MODEL=gpt-4o-mini-2024-07-18
```
自動リロード付き開発サーバー:
```bash
(venv) $ uvicorn app.main:app --reload
```

### 4. フロントエンドセットアップ
```bash
$ cd ../frontend
$ npm install          # 依存インストール
$ npm run dev          # 開発サーバー起動
```
ブラウザで <http://localhost:3000> を開いて「生成」ボタンを試す。

### 5. よく使うスクリプト
| コマンド | 説明 |
|----------|------|
| `npm run dev:all` | バックエンド & フロント同時起動 |
| `pip freeze > requirements.txt` | 依存を確定して書き出し |

### 6. トラブルシューティング
* **ポート競合** → `3000` や `8000` を `.env` で変更。
* **CORS 405** → `allow_origins=["http://localhost:3000"]` を確認。
* **Tailwind CLI が無い** → `npm dlx @tailwindcss/cli init -p` で生成。

---

Made with  ChatGPT (GPT‑4o mini)

