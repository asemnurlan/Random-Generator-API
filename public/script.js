/*async function getUser() {
  const response = await fetch("/api/user");
  const data = await response.json();   

  const user = data.user;           
  const country = data.country;        

  document.getElementById("user").innerHTML = `
    <div style="border:1px solid #ccc; padding:15px; width:320px; font-family: 'Times New Roman', Times, serif;">
      
      <img src="${user.picture}" width="150"><br><br>

      <p><b>Name:</b> ${user.firstName} ${user.lastName}</p>
      <p><b>Gender:</b> ${user.gender}</p>
      <p><b>Age:</b> ${user.age}</p>
      <p><b>Date of Birth:</b> ${user.dob}</p>
      <p><b>City:</b> ${user.city}</p>
      <p><b>Country:</b> ${user.country}</p>
      <p><b>Address:</b> ${user.address}</p>

      <hr>

      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Languages:</strong> ${country.languages}</p>
      <p><strong>Currency:</strong> ${country.currency}</p>

      <img src="${country.flag}" width="80">
      <hr>
      <p><strong>Exchange rates:</strong></p>
      <p>1 ${data.exchange.base} = ${data.exchange.usd} USD</p>
      <p>1 ${data.exchange.base} = ${data.exchange.kzt} KZT</p>
      <hr> 
      

    </div>
  `;
const newsHTML = data.news.map(article => `
  <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
    ${article.image ? `<img src="${article.image}" width="120"><br>` : ""}
    <b>${article.title}</b><br>
    <p>${article.description}</p>
    <a href="${article.url}" target="_blank">Read more</a>
  </div>
`).join("");

document.getElementById("news").innerHTML = newsHTML;

}*/

app.get("/api/user", async (req, res) => {
  try {
    // 1. Random User
    const response = await axios.get("https://randomuser.me/api/");
    const user = response.data.results[0];

    // 2. Country
    const countryResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${user.location.country}`
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

    const userData = {
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

    // 3. Exchange rates (SAFE)
    let exchange = { base: "N/A", usd: "N/A", kzt: "N/A" };
    const currencyCode = country.currencies
      ? Object.keys(country.currencies)[0]
      : null;

    if (currencyCode && process.env.EXCHANGE_API_KEY) {
      try {
        const exchangeResponse = await axios.get(
          `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${currencyCode}`
        );
        exchange = {
          base: currencyCode,
          usd: exchangeResponse.data.conversion_rates.USD,
          kzt: exchangeResponse.data.conversion_rates.KZT
        };
      } catch {
        console.log("Exchange API failed");
      }
    }

    // 4. News (SAFE)
    let news = [];
    if (process.env.NEWS_API_KEY) {
      try {
        const newsResponse = await axios.get(
          "https://newsapi.org/v2/everything",
          {
            params: {
              q: user.location.country,
              language: "en",
              pageSize: 5,
              apiKey: process.env.NEWS_API_KEY
            }
          }
        );

        news = newsResponse.data.articles.map(a => ({
          title: a.title || "No title",
          description: a.description || "No description",
          image: a.urlToImage || "",
          url: a.url
        }));
      } catch {
        console.log("News API failed");
      }
    }

    // 5. Final response
    res.json({
      user: userData,
      country: countryData,
      exchange,
      news
    });

  } catch (error) {
  console.error("ERROR MESSAGE:", error.message);
  console.error("ERROR RESPONSE:", error.response?.data);
  res.status(500).json({ error: "fail" });

  }
});

