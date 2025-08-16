# 🌐 Website Analyzer API

A powerful Node.js REST API to analyze websites by extracting brand information, metadata, and descriptions with optional AI enhancement.

## 🚀 Features

- 🔎 **Website Analysis** – Extract brand name, title, and description from any website  
- ⚡ **Smart Scraping** – Uses Cheerio + Axios for reliable scraping  
- 💾 **Database Storage** – Persistent storage using Supabase (PostgreSQL)  
- 🛡 **Rate Limiting** – Prevents API abuse  
- 🐞 **Error Handling** – Clean validation + error responses  
- 🧩 **AI (Optional)** – Enrich results with OpenAI GPT  

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: Supabase (PostgreSQL)  
- **Scraping**: Cheerio, Axios  
- **Validation**: Joi  
- **AI (Optional)**: OpenAI GPT-3.5 Turbo  

---

## 📋 Prerequisites

- Node.js (>= 14.x)  
- Supabase Account & Database URL  
- OpenAI API key (optional for AI enrichment)  

---

## ⚡ Quick Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/surajit21102004/WebScrapperBackend.git
cd WebScrapperBackend


API Endpoints : 

POST /api/websites/analyze : 

curl -X POST https://webscrapperbackend-production.up.railway.app/api/websites/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}'

Body (JSON):

{
  "url": "https://github.com"
}

GET /api/websites : 

curl https://webscrapperbackend-production.up.railway.app/api/websites

Update Website by ID

PUT /api/websites/:id

curl -X PUT https://webscrapperbackend-production.up.railway.app/api/websites/1 \
  -H "Content-Type: application/json" \
  -d '{"brand_name": "Updated Name"}'


Purpose: Update brand name or metadata of a website.

4. ❌ Delete Website by ID

DELETE /api/websites/:id

curl -X DELETE https://webscrapperbackend-production.up.railway.app/api/websites/1
