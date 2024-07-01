document.addEventListener("DOMContentLoaded", function() {
    const API_URL = "http://www.omdbapi.com/?apikey=32ddd981&s=";
    const API_URL_SEARCH = "https://www.omdbapi.com/?apikey=32ddd981&i=";

    var searchInput = document.getElementById("search-input");
    var card = document.getElementsByClassName("movie-cards")[0];

    document.getElementsByClassName("search")[0].addEventListener("click", function() {
        console.log(searchInput.value);
        const query = searchInput.value;
        if (query) {
            getMovies(API_URL + query);
        }
    });

    async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();
        console.log(respData);
        showMovies(respData.Search);  // Corrected from respData.search to respData.Search
    }

    function showMovies(movies) {
        card.innerHTML = "";
        movies.forEach(async function(movie) {
            const movieData = await fetch(API_URL_SEARCH + movie.imdbID);
            const movieDataObj = await movieData.json();  // Corrected movieDataobj to movieDataObj
            movie_display(movieDataObj);
        });
    }

    function movie_display(imovie) {
        const movieElm = document.createElement("div");
        movieElm.classList.add("movie-card");  // Corrected to "movie-card" as a string
        movieElm.innerHTML = `
            <div class="card">
                <img src="${imovie.Poster}" alt="Poster" width="300px" height="300px"/>
                <br>
                <div class="movie-description">
                    <span class="movie-title"><b>Title:</b> <span class="value">${imovie.Title}</span></span>
                    <span class="movie-title"><b>Rating:</b> <span class="value">${imovie.imdbRating}</span></span>
                    <span class="movie-title"><b>Director:</b> <span class="value">${imovie.Director}</span></span>
                    <span class="movie-title"><b>Released Date:</b> <span class="value">${imovie.Released}</span></span>
                    <span class="movie-title"><b>Genre:</b> <span class="value">${imovie.Genre}</span></span>
                </div>
            </div>
        `;
        card.appendChild(movieElm);
    }
});
