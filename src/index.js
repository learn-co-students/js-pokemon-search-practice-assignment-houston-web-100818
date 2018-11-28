const pokemonList = document.body.querySelector('#pokemon-container')
const searchBar = document.body.querySelector('#pokemon-search-input')
let searchKeys

const render = function(){

  fetch('http://localhost:3000/pokemon')
    .then( function(response) {
      return response.json()
    })
    .then ( function(pokemons) {
      pokemonList.innerHTML = '';
        pokemons.forEach(function(pokemon, indexOfPokemon){
          if(searchBar.value == '' || pokemon.name.includes(searchKeys)){

            pokemonName = document.createElement('div')
            pokemonName.className = 'pokemon-container'
            pokemonName.style = "width:230px;margin:10px;background:#e9d58d;color:#2d72fc"
            pokemonImage = document.createElement('img')
            pokemonImage.className = 'center-image'
            pokemonName.name = pokemon.name
            pokemonImage.src = pokemon.sprites.front
            pokemonName.innerHTML = `
              <h1 class="center-text">${pokemon.name}</h1>
            `
            pokemonImage.addEventListener('click', function(e) {
              if (this.src == pokemon.sprites.front) {
                this.src = pokemon.sprites.back
              } else this.src = pokemon.sprites.front
            })
            pokemonList.append(pokemonName)
            pokemonName.append(pokemonImage)
          }
        })
    })
};

searchBar.addEventListener('input', function(e) { //change
  searchKeys = e.target.value
  console.log(searchKeys)
  render()
})

render()
