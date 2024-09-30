let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-button");
let validPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

let hp = document.getElementById("hp");
let attack = document.getElementById("attack");
let defense = document.getElementById("defense");
let specialAttack = document.getElementById("special-attack");
let specialDefense = document.getElementById("special-defense");
let speed = document.getElementById("speed");
let typesOfPokemon = document.querySelector("#types");

let pokemonName = document.getElementById("pokemon-name");
let pokemonId = document.getElementById("pokemon-id");
let pokemonWeight = document.getElementById("weight");
let pokemonHeight = document.getElementById("height");
let spriteContainer = document.getElementById("sprite-container");

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
  let pokemanInvalid = searchInput.value;
  let pokemanValidName = searchInput.value.toLowerCase();
  let pokemanValidId = parseInt(pokemanValidName);
  console.log(pokemanInvalid);
  if (pokemanValidName === "red") {
    alert("Pokémon not found");
    resetDisplay();
    return;
  }
  resetDisplay();
  console.log(pokemanValidName);
  const { results } = pokemanData;
  const pokemon = results?.find((result) => {
    return result.name === pokemanValidName || result.id === pokemanValidId;
  });
  if (pokemon) {
    await fetchPokemon(pokemon.name || pokemon.id);
    const { name, id, height, weight, sprites, types, stats } =
      individualPokemanData;
    const { front_default } = sprites;

    pokemonName.textContent = name.toUpperCase();
    pokemonId.textContent = `#${id}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonHeight.textContent = `Height: ${height}`;
    spriteContainer.innerHTML = `<img id="sprite" src="${front_default}" alt="${name} front default sprite">`;

    console.log(types);
    // types.forEach((obj) => {
    //   console.log(obj.type.name);
    //   let typesOfPokemon = document.querySelector("#types");
    //   typesOfPokemon.innerHTML = `<span class="type ${
    //     obj.type.name
    //   }">${obj.type.name.toUpperCase()}</span>`;
    // });

    for (const obj of types) {
      console.log(obj.type.name);
      typesOfPokemon.innerHTML += `<span class="type ${
        obj.type.name
      }">${obj.type.name.toUpperCase()}</span>`;
    }

    hp.textContent = stats[0].base_stat;
    attack.textContent = stats[1].base_stat;
    defense.textContent = stats[2].base_stat;
    specialAttack.textContent = stats[3].base_stat;
    specialDefense.textContent = stats[4].base_stat;
    speed.textContent = stats[5].base_stat;
  } else {
    alert("Pokémon not found");
    resetDisplay();
  }
};

const resetDisplay = () => {
  // searchInput.value = "";
  pokemonName.textContent = "";
  pokemonId.textContent = ``;
  pokemonWeight.textContent = ``;
  pokemonHeight.textContent = ``;
  spriteContainer.innerHTML = ``;
  typesOfPokemon.replaceChildren();
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
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
    alert("Pokémon not found");
    resetDisplay();
    console.log(err);
  }
};
