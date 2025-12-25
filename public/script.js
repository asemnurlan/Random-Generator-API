async function getUser() {
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
/*let newsHTML = "<p>No news available</p>";

if (data.news && data.news.length > 0) {
  newsHTML = data.news.map(article => `
    <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
      ${article.image ? `<img src="${article.image}" width="120"><br>` : ""}
      <b>${article.title}</b><br>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    </div>
  `).join("");
}

document.getElementById("news").innerHTML = newsHTML;*/
   let newsHTML = "<h3>News</h3>";

  if (data.news.length === 0) {
    newsHTML += "<p>No news available</p>";
  } else {
    data.news.forEach(n => {
      newsHTML += `
        <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
          <b>${n.title}</b><br>
          ${n.image ? `<img src="${n.image}" width="120"><br>` : ""}
          <p>${n.description}</p>
          <a href="${n.url}" target="_blank">Read more</a>
        </div>
      `;
    });
  }

  document.getElementById("news").innerHTML = newsHTML;

}

