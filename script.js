const input = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');

const loading = document.getElementById('loading');
const error = document.getElementById('error');
const pokemonCard = document.getElementById('pokemonCard');

const pokemonName = document.getElementById('pokemonName');
const pokemonNumber = document.getElementById('pokemonNumber');
const pokemonSprite = document.getElementById('pokemonSprite');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonTypes = document.getElementById('pokemonTypes');

searchBtn.addEventListener('click', async () => {
    const query = input.value.trim().toLowerCase();

    if (!query) return;

    showLoading();
    hideError();
    hideCard();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (!response.ok) throw new Error('Pokémon não encontrado');

        const data = await response.json();

        // Preencher os elementos HTML com os dados da API
        pokemonName.textContent = capitalize(data.name);
        pokemonNumber.textContent = `#${data.id}`;
        pokemonSprite.src = data.sprites.front_default || '';
        pokemonSprite.alt = `Sprite do Pokémon ${data.name}`;
        pokemonHeight.textContent = `${data.height / 10} m`;
        pokemonWeight.textContent = `${data.weight / 10} kg`;
        pokemonTypes.textContent = data.types.map(t => capitalize(t.type.name)).join(', ');

        showCard();
    } catch (err) {
        showError();
    } finally {
        hideLoading();
    }
});

function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError() {
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function showCard() {
    pokemonCard.classList.remove('hidden');
}

function hideCard() {
    pokemonCard.classList.add('hidden');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
