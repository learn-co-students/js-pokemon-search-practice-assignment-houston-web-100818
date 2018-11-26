document.addEventListener('DOMContentLoaded', () => {
  const pokemonContainer = document.querySelector('#pokemon-container');
  const searchBar = document.querySelector('input#pokemon-search-input');
  
  function fetchData() {
    fetch('http://localhost:3000/pokemon') 
      .then( function(response) {
      return response.json()
    })
      .then ( function(data) {
       render(data)
      
    })

  };

  function render(pokemons) {
    pokemonContainer.innerHTML = ''
    pokemons.forEach(function(element) {
      
      let pokemonListItem = document.createElement('div')
     
      pokemonListItem.style = "width:230px;margin:10px;background:#fecd2f;color:#2d72fc;display:inline-block"
      pokemonListItem.className = "pokemon-frame"

      let image = document.createElement("img");
      image.src= `${element.sprites.front}`
      image.className="center"
      pokemonListItem.innerHTML = `<h1 class='center-text'> ${element.name}</h1>`
      pokemonListItem.append(image);


      image.addEventListener("click", function() {
        if (image.src == element.sprites.front) {
          image.src = element.sprites.back;
        }
        else {
          image.src = element.sprites.front;
        }
      })
      

      pokemonContainer.append(pokemonListItem)
    });
    filter(pokemons);
  }

  function filter(pokemons) {
    let currentInput;
    let filtered;

    searchBar.addEventListener('keydown', function(e) {
      currentInput = e.target.value.toLowerCase();
      filtered = pokemons.filter(pokemon => pokemon.name.includes(`${currentInput}`))     
      render(filtered)
    })
  }
  fetchData();
})
