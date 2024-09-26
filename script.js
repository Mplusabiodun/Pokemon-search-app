let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-button");
let pokemonName = document.getElementById("pokemon-name");
let pokemonId = document.getElementById("pokemon-id");
let pokemonWeight = document.getElementById("weight");
let pokemonHeight = document.getElementById("height");
let pokemonImage = document.getElementById("sprite-container");
let pokemonType = document.getElementById("types");
let validPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
let pokemanData;
let individualPokemanData;

const fetchValidPokemon = async () => {
  try {
    const res = await fetch(validPokemon);
    const data = await res.json();
    // searchPokemon(data);
    pokemanData = data;
  } catch (err) {
    console.log(err);
  }
};
fetchValidPokemon();

const searchPokemon = async (event) => {
  event.preventDefault();
  let pokemanValidName = searchInput.value.toLowerCase();

  const { results } = pokemanData;
  const pokemon = results?.find((result) => {
    return result.name === pokemanValidName;
  });
  if (pokemon) {
    await fetchPokemon(pokemon.name || pokemon.id);
  } else {
  }

  // const pokemonInfo = document.getElementsByClassName("top-container");
  // pokemonInfo.innerHTML = `
  //             <div class="name-and-id">
  //               <span id="pokemon-name">${pokemon.name}</span>
  //               <span id="pokemon-id">${pokemon.id}</span>
  //             </div>
  //             <div class="size">
  //               <span id="weight"></span>
  //               <span id="height"></span>
  //             </div>
  //             <div id="sprite-container" class="sprite-container"></div>
  //             <div id="types"></div>
  //           `;
};

// searchBtn.addEventListener("click", (event) => event.preventDefault());
searchBtn.addEventListener("click", searchPokemon);

const fetchPokemon = async (pokemanIdentifier) => {
  try {
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemanIdentifier}`
    );
    const data = await res.json();
    individualPokemanData = data;
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

// if (pokemanName.trim() === "") {
//   alert("Please enter a Pokémon name!");
//   return;
// }
