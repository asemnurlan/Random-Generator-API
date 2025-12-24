/*async function getUser() {
  const response = await fetch("/api/user");
  const user = await response.json();

  document.getElementById("user").innerHTML = `
    <div style="border:1px solid #ccc; padding:15px; width:300px; font-family: 'Times New Roman', Times, serif;">
      <img src="${user.picture}" width="150">
      <p><b>Name:</b> ${user.firstName} ${user.lastName}</p>
      <p><b>Gender:</b> ${user.gender}</p>
      <p><b>Age:</b> ${user.age}</p>
      <p><b>Date of Birth:</b> ${user.dob}</p>
      <p><b>City:</b> ${user.city}</p>
      <p><b>Country:</b> ${user.country}</p>
      <p><b>Address:</b> ${user.address}</p>
      <hr>

        <p><strong>Country:</strong> ${country.name}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Languages:</strong> ${country.languages}</p>
        <p><strong>Currency:</strong> ${country.currency}</p>

        <img src="${country.flag}" width="80" class="mt-2">

    </div>
  `;
}


data.country.name
data.country.capital
data.country.languages
data.country.currency
data.country.flag
*/
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

    </div>
  `;
}
