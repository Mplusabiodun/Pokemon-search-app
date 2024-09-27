let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-button");
let hp = document.getElementById("hp");
let attack = document.getElementById("attack");
let defense = document.getElementById("defense");
let specialAttack = document.getElementById("special-attack");
let specialDefense = document.getElementById("special-defense");
let speed = document.getElementById("speed");
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
    const { name, id, height, weight, sprites, types, stats } =
      individualPokemanData;
    const { back_default } = sprites;

    console.log(types);
    types.forEach((obj) => {
      console.log(obj.type.name);
      let typesOfPokemon = document.querySelector(".middle-container");
      typesOfPokemon.innerHTML = `<span class="type ${
        obj.type.name
      }">${obj.type.name.toUpperCase()}</span>`;
    });

    let pokemonInfo = document.querySelector(".top-container");
    pokemonInfo.innerHTML = `
              <div class="name-and-id">
                <span id="pokemon-name">${name.toUpperCase()}</span>
                <span id="pokemon-id">#${id}</span>
              </div>
              <div class="size">
                <span id="weight">Weight: ${weight}</span>
                <span id="height">Height: ${height}</span>
              </div>
              <div id="sprite-container" class="sprite-container"><img id="sprite" src="${back_default}" alt="${name} front default sprite"></div>

              
            `;
    hp.textContent = stats[0].base_stat;
    attack.textContent = stats[1].base_stat;
    defense.textContent = stats[2].base_stat;
    specialAttack.textContent = stats[3].base_stat;
    specialDefense.textContent = stats[4].base_stat;
    speed.textContent = stats[5].base_stat;
  } else {
    alert("Pokémon not found");
  }
};

// searchBtn.addEventListener("click", (event) => event.preventDefault());
searchBtn.addEventListener("click", searchPokemon);

const fetchPokemon = async (pokemanIdentifier) => {
  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemanIdentifier}`
    );
    const responseData = await response.json();
    individualPokemanData = responseData;
    console.log(individualPokemanData);
  } catch (err) {
    console.log(err);
  }
};

// if (pokemanName.trim() === "") {
//   alert("Please enter a Pokémon name!");
//   return;
// }
