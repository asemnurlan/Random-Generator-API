const express =require("express");
const axios=require("axios");
const app=express();
app.use(express.static("public"));

require("dotenv").config();
const COUNTRY_API_KEY = process.env.COUNTRY_API_KEY;
const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY;

app.get("/api/user",async (req,res)=>{
    try{
        const response=await axios.get("https://randomuser.me/api/");
        const user = response.data.results[0];
        const countryResponse = await axios.get(`https://restcountries.com/v3.1/name/${user.location.country}`);
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
        res.json({user: userData,
                  country: countryData});

    } catch(error){
        res.status(500).json({error: "fail"});
    }
});


app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000")
})