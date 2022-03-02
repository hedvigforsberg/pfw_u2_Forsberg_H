"use strict";

// GitHub Repository:

// FUNCTION DECLARATIONS

function addFilm(title, year, director, genre, runtime, score) {
  let film = {
    title: title,
    year: year,
    director: director,
    genre: genre,
    runtime: runtime,
    score: score,
  };

  return film;
}

function addFilmSubmit(event) {
  event.preventDefault();

  let title = document.getElementById("title").value;
  let year = Number(document.getElementById("year").value);
  let director = document.getElementById("director").value;
  let genre = document.getElementById("genre").value;
  let runtime = Number(document.getElementById("runtime").value);
  let score = Number(document.getElementById("score").value);

  if (title == "") {
    return alert("Please fill in all of the boxes!");
  } else if (year == 0) {
    return alert("Please fill in all of the boxes!");
  } else if (director == "") {
    return alert("Please fill in all of the boxes!");
  } else if (genre == "") {
    return alert("Please fill in all of the boxes!");
  } else if (runtime == 0) {
    return alert("Please fill in all of the boxes!");
  } else if (score == 0) {
    return alert("Please fill in all of the boxes!");
  }

  let film = addFilm(title, year, director, genre, runtime, score);

  film.id = database[database.length - 1].id + 1;

  addFilmToDatabase(database, film);
  renderFilms(database);

  let form = document.getElementById("add-film-form");
  form.reset();
}

function addFilmToDatabase(database, film) {
  database.push(film);
}

function filterByGenreSubmit(event) {
  event.preventDefault();

  let genre = document.getElementById("filter-genre").value;

  let films = getFilmsByGenre(database, genre);

  renderFilms(films);
}

function filterByScoreSubmit(event) {
  event.preventDefault();

  let score = document.getElementById("filter-score").value;

  let films = getFilmsByScore(database, score);

  renderFilms(films);
}

function getFilmsByGenre(films, genre) {
  let filmsByGenre = [];

  for (let film of films) {
    if (film.genre.toLowerCase() == genre.toLowerCase()) {
      filmsByGenre.push(film);
    }
  }

  return filmsByGenre;
}

function getFilmsByScore(films, score) {
  let filmsByScore = [];

  for (let film of films) {
    if (film.score == score) {
      filmsByScore.push(film);
    }
  }

  return filmsByScore;
}

function removeFilmClick(event) {
  let button = event.target;
  let id = button.parentElement.id;

  if (confirm("Are you sure you want to delete this film?") == true) {
    removeFilmById(database, id);
  } else {
    return false;
  }

  // removeFilmById(database, id);
  renderFilms(database);
}


function removeFilmById(films, id) {
  for (let i = 0; i < films.length; i++) {
    let film = films[i];

    if (film.id == id) {
      films.splice(i, 1);
      return;
    }
  }
}

function renderFilm(film) {
  let div = document.createElement("div");
  div.classList.add("film");
  div.id = film.id;

  div.innerHTML = `
        <li></li>
        <div>${film.title}</div>
        <div>${film.year}</div>
        <div>${film.director}</div>
        <div>${film.genre}</div>
        <div>${film.runtime} minutes</div>
        <div>${film.score} out of 5</div>
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

function setAddFilmHandler() {
  let form = document.getElementById("add-film-form");
  form.addEventListener("submit", addFilmSubmit);
}

function setFilterFilmHandlers() {
  let genreForm = document.getElementById("filter-by-genre");
  let scoreForm = document.getElementById("filter-by-score");
  let showAll = document.getElementById("show-all");

  genreForm.addEventListener("submit", filterByGenreSubmit);
  scoreForm.addEventListener("submit", filterByScoreSubmit);
  showAll.addEventListener("click", showAllClick);
}

function setRemoveFilmHandlers() {
  let buttons = document.querySelectorAll(".film button");

  for (let button of buttons) {
    button.addEventListener("click", removeFilmClick);
  }
}

function showAllClick() {
  document.getElementById("filter-genre").value = "";
  document.getElementById("filter-score").value = "";
  renderFilms(database);
}

// DIRECT CODE

renderFilms(database);
setAddFilmHandler();
setFilterFilmHandlers();

// CHECKLIST

// add data X
// alert if no data in form X
// remove data X
// confirm before remove X
// filter data X
// row numbers X
// data in seperate database-js X
// CSS-styling (for fun... mostly)
