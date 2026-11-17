// Global array to store fetched movies so we can filter them live with the search box
let currentShows = [];

// Wait until the HTML document is fully loaded before running code
document.addEventListener('DOMContentLoaded', () => {
    const theaterSelect = document.getElementById('theater-select');
    const searchInput = document.getElementById('search-input');

    // 1. Fetch the list of theaters when the page loads
    loadTheaters();

    // 2. DYNAMIC EVENT LISTENER: Triggered when user picks a different theater from the dropdown
    theaterSelect.addEventListener('change', (event) => {
        const theaterId = event.target.value;
        if (theaterId) {
            loadSchedule(theaterId);
        }
    });

    // 3. DYNAMIC EVENT LISTENER: Triggered live as the user types letters in the search box
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase().trim();
        filterAndDisplayShows(searchTerm);
    });
});

/**
 * Fetches theater areas from Finnkino XML API and populates the dropdown menu
 */
async function loadTheaters() {
    const theaterSelect = document.getElementById('theater-select');
    const url = 'https://www.finnkino.fi/xml/TheatreAreas/';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch theater list');

        // Parse XML response
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const areas = xmlDoc.getElementsByTagName('TheatreArea');
        theaterSelect.innerHTML = ''; // Clear loading option

        // Loop through XML nodes and create dropdown options
        for (let i = 0; i < areas.length; i++) {
            const id = areas[i].getElementsByTagName('ID')[0].textContent;
            const name = areas[i].getElementsByTagName('Name')[0].textContent;

            const option = document.createElement('option');
            option.value = id;
            option.textContent = name;
            theaterSelect.appendChild(option);
        }

        // Automatically load schedule for the first theater in the list
        if (areas.length > 0) {
            loadSchedule(theaterSelect.value);
        }

    } catch (error) {
        console.error('Error loading theaters:', error);
        theaterSelect.innerHTML = '<option value="">Error loading theaters</option>';
    }
}

/**
 * Fetches today's movie schedule for the selected theater ID
 */
async function loadSchedule(theaterId) {
    const statusEl = document.getElementById('status-message');
    const container = document.getElementById('movies-container');
    const url = `https://www.finnkino.fi/xml/Schedule/?area=${theaterId}`;

    statusEl.textContent = 'Loading showtimes...';
    container.innerHTML = '';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch schedule');

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const shows = xmlDoc.getElementsByTagName('Show');

        // Save shows into our global array
        currentShows = [];
        for (let i = 0; i < shows.length; i++) {
            const show = shows[i];

            const title = show.getElementsByTagName('Title')[0]?.textContent || 'Untitled';
            const startTimeRaw = show.getElementsByTagName('dttmShowStart')[0]?.textContent || '';
            const auditorium = show.getElementsByTagName('TheatreAndAuditorium')[0]?.textContent || '';
            const genres = show.getElementsByTagName('Genres')[0]?.textContent || '';
            const rating = show.getElementsByTagName('Rating')[0]?.textContent || 'N/A';

            const imagesNode = show.getElementsByTagName('Images')[0];
            const posterUrl = imagesNode?.getElementsByTagName('EventMediumImagePortrait')[0]?.textContent || '';

            currentShows.push({
                title,
                startTime: formatTime(startTimeRaw),
                auditorium,
                genres,
                rating,
                posterUrl
            });
        }

        statusEl.textContent = '';

        // Render shows using current search filter value
        const currentSearch = document.getElementById('search-input').value.toLowerCase().trim();
        filterAndDisplayShows(currentSearch);

    } catch (error) {
        console.error('Error loading schedule:', error);
        statusEl.textContent = 'Could not load movie schedule. Please check your connection.';
    }
}

/**
 * Filters movies by search query and builds HTML cards dynamically
 */
function filterAndDisplayShows(searchTerm) {
    const container = document.getElementById('movies-container');
    const statusEl = document.getElementById('status-message');
    container.innerHTML = '';

    // Filter array based on title match
    const filteredShows = currentShows.filter(show =>
        show.title.toLowerCase().includes(searchTerm)
    );

    if (filteredShows.length === 0) {
        statusEl.textContent = 'No movies found matching your search.';
        return;
    }

    statusEl.textContent = `Showing ${filteredShows.length} screenings`;

    // Loop through filtered shows and create cards on the page
    filteredShows.forEach(show => {
        const card = document.article || document.createElement('article');
        card.className = 'movie-card';

        card.innerHTML = `
            <img src="${show.posterUrl || 'https://via.placeholder.com/200x300?text=No+Poster'}" alt="${show.title} poster">
            <div class="movie-info">
                <span class="badge">${show.rating}</span>
                <h3>${show.title}</h3>
                <p class="time">🕒 <strong>${show.startTime}</strong></p>
                <p class="location">📍 ${show.auditorium}</p>
                <p class="genre">${show.genres}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

/**
 * Helper function to turn ISO timestamp into a short readable time (e.g. 18:30)
 */
function formatTime(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
}