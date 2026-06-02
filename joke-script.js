// Joke APIs
const APIs = {
    general: 'https://v2.jokeapi.dev/joke/Any',
    programming: 'https://v2.jokeapi.dev/joke/Programming',
    'knock-knock': 'https://v2.jokeapi.dev/joke/Knock-Knock'
};

// DOM Elements
const getJokeBtn = document.getElementById('getJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const jokeDisplay = document.getElementById('jokeDisplay');
const jokeText = document.getElementById('jokeText');
const loadingSpinner = document.getElementById('loading');
const jokeTypeSelect = document.getElementById('jokeType');
const jokeCountSpan = document.getElementById('jokeCount');

// State
let jokeCount = 0;
let currentJoke = '';

// Event Listeners
getJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyJoke);
jokeTypeSelect.addEventListener('change', fetchJoke);

// Fetch joke from API
async function fetchJoke() {
    const jokeType = jokeTypeSelect.value;
    const apiUrl = APIs[jokeType];

    // Show loading state
    showLoading(true);
    getJokeBtn.disabled = true;
    copyBtn.disabled = true;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusCode}`);
        }

        const data = await response.json();

        // Handle different joke formats
        if (data.type === 'twopart') {
            currentJoke = `${data.setup}\n\n${data.delivery}`;
        } else if (data.type === 'single') {
            currentJoke = data.joke;
        } else {
            throw new Error('Unknown joke format');
        }

        // Check if the joke contains flagged content
        if (data.flags && data.flags.nsfw) {
            currentJoke = '🔞 This joke is marked NSFW. Please try another one!';
        }

        // Display the joke
        displayJoke(currentJoke);
        jokeCount++;
        jokeCountSpan.textContent = jokeCount;

    } catch (error) {
        console.error('Error fetching joke:', error);
        displayError(`Failed to fetch joke: ${error.message}`);
    } finally {
        showLoading(false);
        getJokeBtn.disabled = false;
        copyBtn.disabled = false;
    }
}

// Display joke
function displayJoke(joke) {
    jokeText.textContent = joke;
    jokeDisplay.style.animation = 'none';
    setTimeout(() => {
        jokeDisplay.style.animation = 'slideIn 0.5s ease-out';
    }, 10);
}

// Display error message
function displayError(message) {
    jokeText.innerHTML = `<span class="error-message">${message}</span>`;
}

// Copy joke to clipboard
function copyJoke() {
    if (!currentJoke) {
        showNotification('No joke to copy!');
        return;
    }

    navigator.clipboard.writeText(currentJoke).then(() => {
        showNotification('Joke copied to clipboard! 📋');
    }).catch(() => {
        showNotification('Failed to copy joke!');
    });
}

// Show/hide loading spinner
function showLoading(isLoading) {
    loadingSpinner.style.display = isLoading ? 'flex' : 'none';
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-message';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Load joke count from localStorage
function loadJokeCount() {
    const saved = localStorage.getItem('jokeCount');
    if (saved) {
        jokeCount = parseInt(saved);
        jokeCountSpan.textContent = jokeCount;
    }
}

// Save joke count to localStorage
function saveJokeCount() {
    localStorage.setItem('jokeCount', jokeCount);
}

// Update localStorage on every joke fetch
getJokeBtn.addEventListener('click', () => {
    setTimeout(saveJokeCount, 100);
});

// Initialize
loadJokeCount();
jokeText.textContent = '😂 Click "Get Joke" to start laughing!';