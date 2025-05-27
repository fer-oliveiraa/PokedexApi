// URL base da PokéAPI
const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Elementos do DOM
const pokemonInput = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const pokemonCard = document.getElementById('pokemonCard');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// Elementos do card
const pokemonName = document.getElementById('pokemonName');
const pokemonNumber = document.getElementById('pokemonNumber');
const pokemonSprite = document.getElementById('pokemonSprite');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonTypes = document.getElementById('pokemonTypes');

// Função principal para buscar Pokémon
async function fetchPokemon(pokemon) {
    try {
        // Exibe loading e esconde outros elementos
        showLoading();
        
        // Faz a requisição para a API
        const response = await fetch(`${API_URL}${pokemon.toLowerCase()}`);
        
        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        
        // Converte a resposta para JSON
        const data = await response.json();
        
        // Exibe os dados do Pokémon
        displayPokemon(data);
        
    } catch (err) {
        // Trata erros
        showError();
    }
}

// Função para exibir os dados do Pokémon
function displayPokemon(data) {
    // Preenche os elementos com os dados
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = `#${data.id.toString().padStart(3, '0')}`;
    pokemonSprite.src = data.sprites.front_default;
    pokemonSprite.alt = `Sprite de ${data.name}`;
    pokemonHeight.textContent = `${data.height / 10} m`;
    pokemonWeight.textContent = `${data.weight / 10} kg`;
    
    // Formata os tipos do Pokémon
    const types = data.types.map(type => type.type.name).join(', ');
    pokemonTypes.textContent = types;
    
    // Exibe o card
    hideLoading();
    hideError();
    pokemonCard.classList.remove('hidden');
}

// Funções auxiliares para controlar a exibição
function showLoading() {
    loading.classList.remove('hidden');
    pokemonCard.classList.add('hidden');
    error.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError() {
    hideLoading();
    pokemonCard.classList.add('hidden');
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const pokemon = pokemonInput.value.trim();
    if (pokemon) {
        fetchPokemon(pokemon);
    }
});

// Permite buscar pressionando Enter
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const pokemon = pokemonInput.value.trim();
        if (pokemon) {
            fetchPokemon(pokemon);
        }
    }
});

// Busca um Pokémon inicial para demonstração
fetchPokemon('pikachu');