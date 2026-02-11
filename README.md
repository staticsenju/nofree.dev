# NoFree.dev

A static site and public API for declining requests for free work. Inspired by nohello.com.

**Live Site:** https://nofree.dev
**API Base URL:** https://api.nofree.dev

## Overview

NoFree.dev provides a standard link to set boundaries with clients or friends asking for unpaid labor. It includes a functional JSON API built on Cloudflare Workers that serves refusal messages with varying levels of intensity.

## API Documentation

The API allows you to fetch messages, submit new ones, and vote on existing entries.

### 1. Get a Message
Fetch a random refusal message.

**Endpoint:** `GET /`

**Parameters:**
* `intensity` (optional): Integer `1-10`.
    * `1-4`: Professional / Polite
    * `5-7`: Firm / Direct
    * `8-10`: Rude / Aggressive

**Example Request:**
```bash
curl "https://api.nofree.dev/?intensity=10"

```

**Example Response:**

```json
{
  "id": 42,
  "content": "Read my lips: Pay me.",
  "intensity": 10,
  "votes": 150
}

```

### 2. Get Specific Message
Fetch a refusal by its unique ID.

**Endpoint:** `GET /{id}`

**Example:**
```bash
curl "https://api.nofree.dev/1"
```

### 3. Submit a Message

Add a new refusal to the database.

**Endpoint:** `POST /submit`

**Body:**

```json
{
  "content": "I do not code for exposure.",
  "intensity": 5
}

```

### 4. Upvote

Upvote a message by ID.

**Endpoint:** `POST /vote`

**Body:**

```json
{
  "id": 42
}

```

## Tech Stack

* **Frontend:** HTML5 / CSS3 (Hosted on GitHub Pages)
* **Backend:** Cloudflare Workers (Serverless JavaScript)
* **Database:** Cloudflare D1 (SQLite)

## Local Development

To run the backend locally, you need `npm` and `wrangler` installed.

1. **Install Dependencies**
```bash
npm install

```


2. **Create Database**
Run this command and **copy the `database_id**` it outputs:
```bash
npx wrangler d1 create nofree-db

```


3. **Configure Database**
Open `wrangler.toml` and paste the ID you just copied into the `database_id` field:
```toml
[[d1_databases]]
binding = "DB"
database_name = "nofree-db"
database_id = "PASTE_YOUR_ID_HERE"

```


4. **Apply Schema**
Create the tables:
```bash
npx wrangler d1 execute nofree-db --local --file=./schema.sql

```


5. **Deploy**
```bash
npx wrangler deploy

```



## License

MIT License.

```

```
