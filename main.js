// FUNCTIONS

// NOTE: Database-add function is not working.
// NOTE: Database-remove function is not working.

function createNewFilm(
  id,
  title,
  year,
  director,
  actors,
  genre,
  runtime,
  score
) {
  let film = {
    id: id,
    title: title,
    year: year,
    director: director,
    actors: actors,
    genre: genre,
    runtime: runtime,
    score: score,
  };

  return film;
}

function addFilmToDatabase(database, film) {
  database.push(film);
}

function removeFilmById(database, id) {
  for (let i = 0; i < database.length; i++) {
    let film = database[i];

    if (film.id == id) {
      database.splice(i, 1);
      return;
    }
  }
}

function getFilmsByGenre(database, genre) {
  let filmsByGenre = [];

  for (let i = 0; i < database.length; i++) {
    if (film.genre.toLowerCase() == genre.toLowerCase()) {
      filmsByGenre.push(film);
    }
  }

  return filmsByGenre;
}

function getFilmsByScore(database, score) {
  let filmsByScore = [];

  for (let i = 0; i < database.length; i++) {
    if (film.score.toLowerCase() == score.toLowerCase()) {
      filmsByScore.push(film);
    }
  }
}

function renderFilm(film) {
  let div = document.createElement("div");
  div.classList.add("film");
  div.id = film.id;

  div.innerHTML = `
        <div>${film.id}</div>
        <div>${film.title}</div>
        <div>${film.year}</div>
        <div>${film.director}</div>
        <div>${film.actors}</div>
        <div>${film.genre}</div>
        <div>${film.runtime}</div>
        <div>${film.score}</div>
        <button type="button">Remove</button>
    `;

  return div;
}

function renderFilms(films) {
  let filmsElement = document.getElementById("films");
  filmsElement.innerHTML = "";

  for (let film of films) {
    let filmElement = renderFilm(film);
    filmsElement.appendChild(filmElement);
  }

  setRemoveFilmHandlers();
}

function onAddFilmSubmit(event) {
  event.preventDefault();

  let id = document.getElementById("id").value;
  let title = document.getElementById("title").value;
  let year = Number(document.getElementById("year").value);
  let director = document.getElementById("director").value;
  let actors = document.getElementById("actors").value;
  let genre = document.getElementById("genre").value;
  let runtime = Number(document.getElementById("runtime").value);
  let score = Number(document.getElementById("score").value);

  let film = createNewFilm(
    id,
    title,
    year,
    director,
    actors,
    genre,
    runtime,
    score
  );

  film.id = database[database.length - 1].id + 1;

  addFilmToDatabase(database, film);
  renderFilms(database);

  let form = documen.getElementById("add-film-form");
  form.reset();
}

function setAddFilmHandler () {
    let form = document.getElementById("add-film-form");
    form.addEventListener("submit", onAddFilmSubmit);
}

function onRemoveFilmClick (event) {
    let button = event.target;
    let id = button.parentElement.id;

    removeDogById(database, id);
    renderFilms(database);
}

function setRemoveFilmHandlers() {
    let buttons = document.querySelectorAll(".film button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveFilmClick);
    }
}

function onFilterByGenreSubmit(event) {
    event.preventDefault();

    let genre = document.getElementById("filter-genre").value;

    let films = getFilmsByGenre(database, genre);

    renderFilms(films);
}

function onFilterByScoreSubmit (event) {
    event.preventDefault();

    let score = document.getElementById("filter-score").value;

    let films = getFilmsByScore(database, score);

    renderFilms(films);
}

function onShowAllClick () {
    document.getElementById("filter-genre").value = "";
    document.getElementById("filter-score").value = "";
    renderFilms(database);
}

function setFilterFilmHandlers () {
    let genreForm = document.getElementById("filter-by-genre");
    let scoreForm = document.getElementById("filter-by-score");
    let showAll = document.getElementById("show-all");

    genreForm.addEventListener("submit", onFilterByGenreSubmit);
    scoreForm.addEventListener("submit", onFilterByScoreSubmit);
    showAll.addEventListener("click", onShowAllClick);
}

renderFilms(database);
setAddFilmHandler();
setFilterFilmHandlers();