// DOM Elements
const searchInput = document.getElementById('search');
const moviesContainer = document.getElementById('movies-container');

// Movie data fetching with client-side search
async function fetchMovies(searchTerm = '') {
  try {
    const response = await fetch('https://api.sampleapis.com/movies/animation');
    const data = await response.json();
    
    if (searchTerm) {
      return data.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return data.slice(0, 8);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Display movies
function displayMovies(movies) {
  if (!movies || movies.length === 0) {
    moviesContainer.innerHTML = "<p>No movies found. Try another search.</p>";
    return;
  }
  
  moviesContainer.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <h3>${movie.title}</h3>
      <p>Year: ${movie.year}</p>
      <img src="${movie.posterURL}" alt="${movie.title}">
    </div>
  `).join('');
}

// Initial load
window.addEventListener('DOMContentLoaded', async () => {
  const movies = await fetchMovies();
  displayMovies(movies);
});

// Search with debounce
let timeoutId;
searchInput.addEventListener('input', (e) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    const movies = await fetchMovies(e.target.value);
    displayMovies(movies);
  }, 300);
});

