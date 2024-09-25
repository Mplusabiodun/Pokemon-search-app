let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-button");
let pokemonName = document.getElementById("pokemon-name");
let pokemonId = document.getElementById("pokemon-id");
let pokemonWeight = document.getElementById("weight");
let pokemonHeight = document.getElementById("height");
let pokemonImage = document.getElementById("sprite-container");
let pokemonType = document.getElementById("types");
let validPokémon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

searchBtn.addEventListener("click", (event) => event.preventDefault());
// searchBtn.addEventListener("click", checkCashRegister);

const fetchData = async () => {
  try {
    const res = await fetch(validPokémon);
    const data = await res.json();
    console.log(data);
    // showLatestPosts(data);
  } catch (err) {
    console.log(err);
  }
};

fetchData();
