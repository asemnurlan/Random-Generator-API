# Random User Generator API Project

## Objective
The objective of this assignment is to learn how to work with external APIs to retrieve,
process, and display data. The project integrates multiple APIs on the server side and
presents cleaned and structured information on the frontend.

The application is built using Node.js and Express, following best practices for clean
code, separation of concerns, and error handling.

---

## Project Overview
This web application generates a random user and displays:
- Personal information
- Country information
- Currency exchange rates
- Related news headlines

All API requests are handled on the **server side**.  
The frontend only receives and renders processed data.

---

## Technologies Used
- Node.js
- Express.js
- Axios
- Random User API
- REST Countries API
- ExchangeRate API
- News API

---

## Project Structure
project/
├── app.js
├── package.json
├── .env
└── public/
├── index.html
└── script.js

2. Create .env file

Create a .env file in the root directory and add:

EXCHANGE_API_KEY=your_exchange_api_key
NEWS_API_KEY=your_news_api_key


If API keys are missing or invalid, the application will handle this gracefully
and still function correctly.

3. Run the server
node app.js


The server runs on:

http://localhost:3000

API Integration Details
1. Random User API

Endpoint: https://randomuser.me/api/

Used to generate a random user and extract:

First name

Last name

Gender

Profile picture

Age

Date of birth

City

Country

Full address

2. REST Countries API

Endpoint: https://restcountries.com/v3.1/name/{country}

Uses the country name from Random User API to retrieve:

Country name

Capital city

Official languages

Currency

National flag

Only relevant and cleaned data is sent to the frontend.

3. Exchange Rate API

Endpoint: https://www.exchangerate-api.com/

Uses the user’s currency to display exchange rates compared to:USD, KZT

Example:

1 EUR = 1.08 USD
1 EUR = 495.20 KZT


If the API key is unavailable, the application displays "N/A" instead of crashing.

4. News API

Endpoint: https://newsapi.org/

Fetches five English news headlines related to the user’s country.
Each article includes:
Headline title

Image (if available)

Short description

Link to full article

News data is fetched and filtered on the server side.


Conclusion

This project demonstrates how to integrate multiple APIs in a Node.js application,
handle asynchronous data safely, and present structured information to users in a
clear and user-friendly way.
