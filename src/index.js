document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const searchForm = document.querySelector("#pokemon-search-form")
  const searchInput = document.querySelector("#pokemon-search-input")
  const pokemonList = document.querySelector("#pokemon-container")

  // Event listeners

  // render every time search input is altered
  searchInput.addEventListener('keydown', function(event) {
    render()
  })

  // render the pokemon list
  const render = function() {
    // fetch all pokemon
    fetch('http://localhost:3000/pokemon')
      .then(function(response) {
        return response.json()
      }).then(function(pokemon) {
        // reset the pokemon list div to empty
        pokemonList.innerHTML = ''
        // filter pokemon by input search string
        const filteredPokemon = searchFilter(pokemon)
        // iterate through filtered pokemon
        filteredPokemon.forEach(function(currentPokemon) {
          // render a display card for each pokemon
          renderCard(currentPokemon)
        })
      })
  }


  // render one pokemon card
  const renderCard = function(currentPokemon, spriteFront = true) {

    // Append a child div container element into the pokemon container
    const cardContainer = pokemonList.appendChild(document.createElement('div'))
    cardContainer.className = 'pokemon-container'

    // Append a child div element for the card itself into the card container
    const card = cardContainer.appendChild(document.createElement('div'))
    card.className = 'pokemon-frame'

    // Append a child header element containing the pokemon's name into the card
    const name = card.appendChild(document.createElement('h1'))
    name.className = 'center-text'
    name.innerText = `${currentPokemon.name}`

    // Append a child button element to give user option to see current pokemon's details
    const infoButton = card.appendChild(document.createElement('button'))
    infoButton.id = currentPokemon.id
    infoButton.style.width = '230px'
    infoButton.style.margin = 'auto'
    infoButton.innerText = 'View Moves & Abilities'

    // Append a child div container elememt for the pokemon sprite into the card
    const spriteContainer = card.appendChild(document.createElement('div'))
    spriteContainer.style.width = '239px'
    spriteContainer.style.margin = 'auto'

    // Append a child div element for the sprite itself into the sprite container
    const sprite = spriteContainer.appendChild(document.createElement('div'))
    sprite.id = currentPokemon.id
    sprite.style.width = '96px'
    sprite.style.margin = 'auto'
    sprite.innerHTML = `<img data-id="${currentPokemon.id}" src="${currentPokemon.sprites.front}">`

    // Event listener for click on button
    infoButton.addEventListener('click', function() {
      renderDetails(currentPokemon)
    })

    // Event listener for click on individual pokemon sprite/avatar
    sprite.addEventListener('click', function() {
      flipSprite(currentPokemon)
    })
  }

  // filter out pokemon whose names do not contain the input string
  const searchFilter = function(pokemon) {
    return pokemon.filter(function(currentPokemon) {
      return currentPokemon.name.includes(searchInput.value)
    })
  }

  // render details for one pokemon
  const renderDetails = function(currentPokemon) {
    const sprite = document.querySelector(`div[id="${currentPokemon.id}"`)
    const button = document.querySelector(`button[id="${currentPokemon.id}"`)

    if (sprite.innerHTML === `<img data-id="${currentPokemon.id}" src="${currentPokemon.sprites.front}">`) {
      let abilities = ''
      currentPokemon.abilities.forEach(function(ability) {
        abilities += `${ability} `
      })
      sprite.innerHTML = `<p>Abilities: ${abilities}</p>`
      button.innerText = 'View Picture'
    } else {
      sprite.innerHTML = `<img data-id="${currentPokemon.id}" src="${currentPokemon.sprites.front}">`
      button.innerText = 'View Moves & Abilities'
    }
  }

  // flip (toggle) the sprite avatar from front to back (and reset to front when new search is initiated)
  const flipSprite = function(currentPokemon) {
    const sprite = document.querySelector(`[data-id="${currentPokemon.id}"`)

    if (sprite.src === currentPokemon.sprites.front) {
      sprite.src = currentPokemon.sprites.back
    } else {
      sprite.src = currentPokemon.sprites.front
    }
  }

  render()
})
