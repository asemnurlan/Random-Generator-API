const express =require("express");
const axios=require("axios");
const app=express();
app.use(express.static("public"));

require("dotenv").config();
const COUNTRY_API_KEY = process.env.COUNTRY_API_KEY;
const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;


app.get("/api/user",async (req,res)=>{
    try{
        const response=await axios.get("https://randomuser.me/api/");
        const user = response.data.results[0];
        const countryResponse = await axios.get(
  `https://restcountries.com/v3.1/name/${encodeURIComponent(user.location.country)}`
);

        const country = countryResponse.data[0];
        const countryData = {
  name: country.name?.common || "N/A",
  capital: country.capital ? country.capital[0] : "N/A",
  languages: country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A",
  currency: country.currencies
    ? Object.values(country.currencies)[0].name
    : "N/A",
  flag: country.flags?.png || ""
};

        const userData={
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            age: user.dob.age,
            dob: user.dob.date,
            city: user.location.city,
            country: user.location.country,
            address: `${user.location.street.name}, ${user.location.street.number}`,
            picture: user.picture.large

        };
        const currencyCode = country.currencies
  ? Object.keys(country.currencies)[0]
  : null;
let exchangeRates = {
  usd: "N/A",
  kzt: "N/A"
};

if (currencyCode && EXCHANGE_API_KEY) {
  try {
    const exchangeResponse = await axios.get(
      `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${currencyCode}`
    );

    exchangeRates.usd = exchangeResponse.data.conversion_rates?.USD || "N/A";
    exchangeRates.kzt = exchangeResponse.data.conversion_rates?.KZT || "N/A";
  } catch {
    console.log("Exchange API failed");
  }
}

let newsData = [];

try {
  const newsResponse = await axios.get("https://newsapi.org/v2/everything", {
    params: {
      q: user.location.country,  
      language: "en",
      pageSize: 5,
      apiKey: NEWS_API_KEY
    }
  });

  newsData = newsResponse.data.articles.map(article => ({
    title: article.title || "No title",
    description: article.description || "No description",
    image: article.urlToImage || "",
    url: article.url
  }));
} catch (e) {
  console.log("News API failed");
}



res.json({
  user: userData,
  country: countryData,
  exchange: {
    base: currencyCode,
    usd: exchangeRates.usd,
    kzt: exchangeRates.kzt
  },
  news: newsData
});




    } catch(error){
        res.status(500).json({error: "fail"});
    }
});


app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000")
})