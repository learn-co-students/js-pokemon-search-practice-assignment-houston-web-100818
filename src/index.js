document.addEventListener('DOMContentLoaded', () => {

  const pokemonSearchForm = document.querySelector('#pokemon-search-form')
  const pokemonContainer = document.querySelector('#pokemon-container')
  const pokemonSearchInput = document.querySelector('#pokemon-search-input')

  const render = function(){

    fetch('http://localhost:3000/pokemon')
      .then( function(response) {
        return response.json()
      })
      .then ( function(pokemon) {
        renderPokemon(pokemon)
        pokemonSearchInput.addEventListener('keyup', function(e){
          let search = e.target.value
          renderPokemon(pokemon, search)
        })
      })

  };

  const renderPokemon = function(pokemonList, filter = false){
    pokemonContainer.innerHTML = ''
    for(const pokemon of pokemonList){
      if(!filter || pokemon.name.includes(filter)){
        const pokemonDetail = document.createElement('div')
        pokemonDetail.name = pokemon.name
        pokemonDetail.style = "width:230px;margin:10px;background:#fecd2f;color:#2d72fc;display:inline-block"
        pokemonContainer.append(pokemonDetail)

        const pokemonName = document.createElement('h1')
        pokemonName.innerHTML = pokemon.name
        pokemonName.class = 'center-text'
        pokemonDetail.append(pokemonName)

        const pokemonImage = document.createElement('img')
        var image_tracker = 'front';
        pokemonImage.src = pokemon.sprites.front
        pokemonImage.addEventListener('click', function(e){
          if(image_tracker == 'front'){
              pokemonImage.src = pokemon.sprites.back
              image_tracker = 'back'
            }else{
              pokemonImage.src = pokemon.sprites.front
              image_tracker = 'front';
            }
        })
        pokemonDetail.append(pokemonImage)
      }
    };
  };


  render()

})
