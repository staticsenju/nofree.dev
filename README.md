# NoFree.dev
A static site and public API for declining requests for free work. Inspired by nohello.com.

Live Site: https://nofree.dev API Base URL: https://api.nofree.dev

Overview
NoFree.dev provides a standard link to set boundaries with clients or friends asking for unpaid labor. It includes a functional JSON API built on Cloudflare Workers that serves refusal messages with varying levels of intensity.

API Documentation
The API allows you to fetch messages, submit new ones, and vote on existing entries.

1. Get a Message
Fetch a random refusal message.

Endpoint: GET /

Parameters:

intensity (optional): Integer 1-10.

1-4: Professional / Polite

5-7: Firm / Direct

8-10: Rude / Aggressive

Example Request:

Bash
curl "https://api.nofree.dev/?intensity=10"
Example Response:

JSON
{
  "id": 42,
  "content": "Read my lips: Pay me.",
  "intensity": 10,
  "votes": 150
}
2. Submit a Message
Add a new refusal to the database.

Endpoint: POST /submit

Body:

JSON
{
  "content": "I do not code for exposure.",
  "intensity": 5
}
3. Upvote
Upvote a message by ID.

Endpoint: POST /vote

Body:

JSON
{
  "id": 42
}
Tech Stack
Frontend: HTML5 / CSS3 (Hosted on GitHub Pages)

Backend: Cloudflare Workers (Serverless JavaScript)

Database: Cloudflare D1 (SQLite)

Local Development
To run the backend locally, you need npm and wrangler installed.

Install Dependencies

Bash
npm install
Create Database

Bash
npx wrangler d1 create nofree-db
Apply Schema

Bash
npx wrangler d1 execute nofree-db --local --file=./schema.sql
Deploy

Bash
npx wrangler deploy
License
MIT License.
