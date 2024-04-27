const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/github", async (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.github.com/users?id=1",
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(`${response.data.id.login}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/unplash", (req, res) => {
  let id = req.query.id;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.unsplash.com/photos/random?client_id=J0VOmU8SIFqsJxntqyRy2YcnHCVVF6t3HLon0plfS1I`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      let sizeOutput = `<td colspan="2">${response.data.width} x ${response.data.height}</td>`;

      res.send(`
      <h3>Unplash API 📸</h3>
      <hr>
        <table>
        <tr>
          <th>Data</th>
          <th>Info</th>
        </tr>
        <tr>
          <td>Title</td>
          <td>${response.data.alt_description}</td>
        </tr>
        <tr>
          <td>Size</td>
          ${sizeOutput}
        </tr>
        <tr>
          <td>Photo</td>
          <td><img width="550" height="auto" src="${response.data.urls.full}" /></td>
        </tr>
        </table>
        <style>
        body{
          background-color: green;
          color: white;
          font-family:"Arial";
          font-size: 12;
        }
        h3{
          margin: 0px;
        }

        table, th, td {
          border: 1px solid;
        }

        td, h3 {
          text-align: center;
        }
        </style>
      `);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred while fetching data.");
    });
});

app.get("/thecocktaildb", (req, res) => {
  let id = req.query.id;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      let ingredient = response.data.ingredients[0];
      res.send(`
      <h3>🍸 The Cocktail DB API 🥂</h3>
      <hr>
        <table>
        <tr>
          <th>Data</th>
          <th>Info</th>
        </tr>
        <tr>
          <td>Name</td>
          <td>${ingredient.strIngredient}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>${ingredient.strDescription}</td>
        </tr>
        <tr>
          <td>Alcohol?</td>
          <td>${ingredient.strAlcohol}</td>
        </tr>
        </table>
        <style>
        body{
          background-color: green;
          color: white;
          font-family:"Arial";
          font-size: 12;
        }
        h3{
          margin: 0px;
        }

        table, th, td {
          border: 1px solid;
        }

        td, h3 {
          text-align: center;
        }
        </style>
      `);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred while fetching data.");
    });
});

app.get("/randomuser", (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://randomuser.me/api/`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));

      // Acceder al primer resultado
      const user = response.data.results[0];

      res.send(`
      <h3>Random User API 🏪</h3>
      <hr>
        <table>
        <tr>
          <th>Data</th>
          <th>Info</th>
        </tr>
        <tr>
          <td>Gender</td>
          <td>${user.gender}</td>
        </tr>
        <tr>
          <td>FullName</td>
          <td>${user.name.title} ${user.name.first} ${user.name.last}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>${user.location.city}, ${user.location.state}, ${user.location.country}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${user.email}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>${user.phone}</td>
        </tr>
        <tr>
          <td>Photo</td>
          <td><img width="auto" height="100" src="${user.picture.large}"></td>
        </tr>
        </table>
        <style>
        h3{
          margin: 0px;
        }

        table, th, td {
          border: 1px solid;
        }

        td {
          text-align: center;
        }
        </style>
      `);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/fakestore", (req, res) => {
  let id = req.query.id;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://fakestoreapi.com/products/${id}`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(`
      <h3>Fake Store API 🏪</h3>
      <hr>
        <table>
        <tr>
          <th>Data</th>
          <th>Info</th>
        </tr>
        <tr>
          <td>Title</td>
          <td>${response.data.title}</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>$${response.data.price}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>${response.data.description}</td>
        </tr>
        <tr>
          <td>Category</td>
          <td>${response.data.category}</td>
        </tr>
        <tr>
          <td>Photo</td>
          <td><img width="auto" height="100" src="${response.data.image}"></td>
        </tr>
        <style>
        h3{
          margin: 0px;
        }

        table, th, td {
          border: 1px solid;
        }

        td {
          text-align: center;
        }
        </style>
      `);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/rickandmortyapi", (req, res) => {
  let id = req.query.id;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://rickandmortyapi.com/api/character/${id}`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      const originName = response.data.origin.name;
      const regex = /\(([^)]+)\)/;
      const match = regex.exec(originName);
      const planetCode = match ? match[1] : originName;

      res.send(`
      <h3>Rick&Morty API 👴👦</h3>
      <hr>
        <table>
        <tr>
          <th>Data</th>
          <th>Info</th>
        </tr>
        <tr>
          <td>Name</td>
          <td>${response.data.name}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>${response.data.status}</td>
        </tr>
        <tr>
          <td>Species</td>
          <td>${response.data.species}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>${response.data.gender}</td>
        </tr>
        <tr>
          <td>Earth</td>
          <td>${planetCode}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>${response.data.location.name}</td>
        </tr>
        <tr>
          <td>Photo</td>
          <td><img src="${response.data.image}"></td>
        </tr>
        </table>
        <style>
        h3{
          margin: 0px;
        }

        table, th, td {
          border: 1px solid;
        }

        td {
          text-align: center;
        }
        </style>
      `);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/nasa", (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.nasa.gov/planetary/apod?api_key=kbYyOHQcrQEyIAlYUYdxDU7Hiwgdz97I0n39dVEd`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(`
      <h3>Nasa API 🧑‍🚀🚀</h3>
      <hr>
        <table>
        <tr>
          <th>Data</th>
          <th>Info</th>
        </tr>
        <tr>
          <td>Title</td>
          <td>${response.data.title}</td>
        </tr>
        <tr>
          <td>Explabation</td>
          <td>${response.data.explanation}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td>${response.data.date}</td>
        </tr>
        <tr>
          <td>Photo</td>
          <td><img width="155" height="100" src="${response.data.url}"></td>
        </tr>
        </table>
        <style>
        h3{
          margin: 0px;
        }

        table, th, td {
          border: 1px solid;
        }

        td {
          text-align: center;
        }
        </style>
      `);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/rapidapi", (req, res) => {
  let ciudad = req.query.ciudad;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://the-weather-api.p.rapidapi.com/api/weather/${ciudad}`,
    headers: {
      "X-RapidAPI-Key": "73d70d2c28msh7f79106bce6c25ep19a96ajsn943644966186",
      "X-RapidAPI-Host": "the-weather-api.p.rapidapi.com",
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(`
      <h3>Rapid API 🌦️</h3>
      <hr>
      <table>
      <tr>
          <th>Data</th>
          <th>Info</th>
      </tr>
      <tr>
          <td>City</td>
          <td>${response.data.data.city}</td>
      </tr>
      <tr>
          <td>Temperature</td>
          <td>${response.data.data.temp}</td>
      </tr>
      <tr>
          <td>Humity</td>
          <td>${response.data.data.humidity}</td>
      </tr>
      <tr>
          <td>Decription</td>
          <td>${response.data.data.aqi_description}</td>
      </tr>
      <tr>
          <td>Photo</td>
          <td><img width="155" height="100"  src="${response.data.data.bg_image}"></td>
      </tr>
  </table>
  <style>
  h3{
    margin: 0px;
  }

  table, th, td {
    border: 1px solid;
  }

  td {
    text-align: center;
  }
  </style>`);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/pokeapi", (req, res) => {
  let id = req.query.id;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://pokeapi.co/api/v2/pokemon-form/${id}`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(`
      <h3>Pokémon API 🐣</h3>
      <hr>
        <table>
        <tr>
          <th>Pokémon</th>
          <th>Info</th>
        </tr>
        <tr>
          <td>Name</td>
          <td>${response.data.name}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>${response.data.types[0].type.name}</td>
        </tr>
        <tr>
          <td>Photo</td>
          <td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="pokemon ${response.data.name}"</td>
        </tr>
        </table>
        <style>
        h3{
          margin: 0px;
        }

        table, th, td {
          border: 1px solid;
        }

        td {
          text-align: center;
        }
        </style>
        `);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/frankfurter", (req, res) => {
  /* Conversion de Monedad */
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.frankfurter.app/latest?amount=1&from=USD&to=EUR",
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      const rates = response.data.rates;
      let ratesOutput = "";
      for (const currency in rates) {
        ratesOutput += `<tr>
          <td>${currency}</td>
          <td>${rates[currency]}</td>
        </tr>`;
      }
      res.send(`
      <h3>💱 Frankfurter API 🪙</h3>
      <hr>
      <table>
      <tr>
        <th>Data</th>
        <th>Info</th>
      </tr>
      <tr>
        <td>Date</td>
        <td>${response.data.date}</td>
      </tr>
      <tr>
        <td>Curreny</td>
        <td>${response.data.base}</td>
      </tr>
      <tr>
        <td>Amount</td>
        <td>${response.data.amount}</td>
      </tr>
      <tr>
        <td>Rate</td>
        <td>
          <table>
            <tr>
              <th>Currency</th>
              <th>Value</th>
            </tr>
            ${ratesOutput}
          </table>
        </td>
      </tr>
    </table>

    <style>
        h3{
          margin: 0px;
        }

        table, th, td {
          border: 1px solid;
        }

        td {
          text-align: center;
        }

        </style>
    `);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
