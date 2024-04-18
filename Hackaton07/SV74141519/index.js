const express = require('express')
const path= require("path");
const axios = require('axios');
const { Console } = require('console');
const app = express()
const port = 8080
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "./public")));

//Ruta get 
app.get('/', (req, res) => {
  res.send('Hello World desde x-codec.net!')
})

app.get('/usuarioGit', (req, res) =>{

    let nombreUsuario = req.query.user;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.github.com/users/${nombreUsuario}`,
        headers: {
        'X-GitHub-Api-Version': '2022-11-28'
        }
      };

      axios.request(config)
      .then((response) => {
       
        res.send(
            `<p1> ${JSON.stringify(response.data)} </p1>`
        );
      })
      .catch((error) => {
        console.log(error);
      }); 
    
})

app.get('/climaUbicacion', (req, res)=>{

    let latitud = parseFloat(req.query.latitud);
    let longitud = parseFloat(req.query.longitud);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://open-weather13.p.rapidapi.com/city/latlon/${latitud}/${longitud}`,
        headers: { 
          'X-RapidAPI-Key': 'f4bf684981msh788f535840831d9p112d51jsnf9111c2a62d0', 
          'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com', 
        }
      };
      
      axios.request(config)
      .then((response) => {
        res.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
    })
})

app.get('/cambioDolar', (req, res) =>{
    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.apis.net.pe/v1/tipo-cambio-sunat`,
        headers:  
            'Referer: https://apis.net.pe/tipo-de-cambio-sunat-api'
      };
      
      axios.request(config)
      .then((response) => {
        res.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
    })
})

app.get('/listaPokemons', (req, res) =>{
    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1500`
      };
      
      axios.request(config)
      .then((response) => {
        let listaPokemon = response.data.results.map(pokemon => pokemon.name);
        let html = '<ol>';
        listaPokemon.forEach(element => {
            html += `<li>${element}</li>`;
        });
        html += '</ol>';
        res.send(html);
      })
      .catch((error) => {
        console.log(error);
    })
    
})

app.get('/pokemonHabilidades', (req, res)=>{

  let pokemon = req.query.poke;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  };
  
  axios.request(config)
  .then((response) => {
    
    console.log(response.data.abilities);
    let habilidades = response.data.abilities;
    let data = [];
    habilidades.forEach(element => {
      data.push(element.ability.name);
    });
  
    res.send(JSON.stringify(data));
  })
  .catch((error) => {
    console.log(error);
})
})

app.get('/rickandmorty',  (req, res)=> {

  let PJ = [];
  let fin = 827;
  let contador = 0;
  
  for(let i = 1; i < fin ; i++){

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://rickandmortyapi.com/api/character/${i}`
    };
    axios.request(config)
      .then((response) => {
        PJ.push(response.data.name);
        contador++;
        if (contador === fin - 1) {
          let html = '<ol>';
          PJ.forEach(element =>{
            html += '<li>' + element + "</li>";
          })
          html += '</ol>';
          res.send(html);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send('Error interno del servidor');
      });
}
})

app.get('/pjrickandmorty', (req, res)=> {

  let id = req.query.pj;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://rickandmortyapi.com/api/character/${id}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(`<table>
      <tr>
          <th>Dato</th>
          <th>Valor</th>
      </tr>
      <tr>
          <td>Nombre</td>
          <td>${response.data.name}</td>
      </tr>
      <tr>
          <td>Icono</td>
          <td><img src="${response.data.image}"></td>
      </tr>
    </table>`);
      })
    .catch((error) => {
    console.log(error);
    })
})

app.get('/bebidascocteles', (req, res)=>{
  let tipo = req.query.tipo;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: tipo == "Bebidas" ? "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink" : "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail",
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
      let data = response.data.drinks.map(drink => drink).slice(0,10);
      let html = `<table>
        <tr>
            <th>Nombre</th>
            <th>Icono</th>
        </tr>
        ${data.map(drink => `
          <tr>
              <td>${drink.strDrink}</td>
              <td><img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"></td>
          </tr>`).join('')}
      </table>`;
      res.send(html);
    })
    .catch((error) => {
    console.log(error);
    })
})

app.get('/productos', (req, res) =>{

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://fakestoreapi.com/products`
  };
  
  axios.request(config)
  .then((response) => {
    
    let data = response.data.map(producto => producto);
      let html = `<table>
        <tr>
            <th>Nombre</th>
            <th>Icono</th>
        </tr>
        ${data.map(producto => `
          <tr>
              <td>${producto.title}</td>
              <td><img src="${producto.image}" alt="${producto.title}"></td>
          </tr>`).join('')}
      </table>`;
      res.send(html);
  })
  .catch((error) => {
    console.log(error);
})
})

app.get('/fotos', (req, res) => {

  const tema = req.query.tema || 'food'; 
  const tamaño = req.query.tamaño || 'regular';  

  axios.get('https://api.unsplash.com/photos/random', {
    params: {
      query: tema,
      w: tamaño,
      client_id: 'J7OTMa06g4zqJuQZy4sGxVhfvTMGFZf_tKsdHZdsn_c',
    },
  })
  .then((response) => {
    console.log(response.data.tags);

    let img = response.data.urls.regular;
    
    
    res.send(`<img src="${img}" alt="${tema}" style="max-width: 90%;">`);
  })
  .catch((error) => {
    console.log(error);
  });
});

app.get('/citasFamosas', (req, res) =>{

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.quotable.io/random`
  };
  
  axios.request(config)
  .then((response) => {
      let html = `<table>
        <tr>
            <th>Autor</th>
            <th>Cita</th>
        </tr>
        <tr>
            <th><span style="color: red;">${response.data.author}</span></th>
            <th><span style="color: blue;">${response.data.content}</span></th>
        </tr>
      </table>`;
      res.send(html);
  })
  .catch((error) => {
    console.log(error);

  })
})

app.get('/randomUser', (req, res) =>{

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://randomuser.me/api/`
  };
  
  axios.request(config)
  .then((response) => {
    let data = response.data.results.map(persona => [persona.name, persona.picture])
    console.log(data);
    console.log(data[0][0].first);
    
    let html = `<table>
        <tr>
            <th>Nombre</th>
            <th>Foto</th>
        </tr>
        <tr>
            <th>${data[0][0].first + " " + data[0][0].last}</th>
            <td><img src="${data[0][1].large}"></td>
        </tr>
      </table>`;
      res.send(html);
  })
  .catch((error) => {
    console.log(error);

  })

})

app.get('/pelisEstreno', (req, res) => {
  
  let config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/movie/upcoming`,
    params: {
      api_key: "66bdd450043ad718c27683c8d2bfa521",
      page: 1,
    },
  };

  axios.request(config)
    .then((response) => {
      
      let peliculas = response.data.results.map(peli => [peli.original_title, peli.release_date, peli.poster_path]);
      
      let html = `<table>
        <tr>
            <th>Pelicula</th>
            <th>Fecha Estreno</th>
            <th>Poster</th>
        </tr>
        ${peliculas.map(peli => `
          <tr>
              <td>${peli[0]}</td>
              <td>${peli[1]}</td>
              <td><img src="${peli[2]}" alt="${peli[0]}"></td>
          </tr>`).join('')}
      </table>`;
      res.send(html);

    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/pelisDetalles', (req, res)=>{

  let id = req.query.id;
  
  let config = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}`,
    params: {
      api_key: "66bdd450043ad718c27683c8d2bfa521",
      page: 1,
    },
  };

  axios.request(config)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

})

app.get('/marte', (req, res) =>{

  const config = {
    method: 'get',
    url: 'https://api.nasa.gov/insight_weather/',
    params: {
      api_key: "Utl6KcEbmT0wrLrMqLZjEFy2Afr7m0on9t2n01C7",
      feedtype: 'json',
      ver: '1.0',
    },
  };
  
  axios.request(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})