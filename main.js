"use strict";

// GitHub Repository:

// FUNCTION DECLARATIONS

// Function to add (or create) a new film.
function addFilm(title, year, director, genre, runtime, score) {
  // Create a variable called 'film' which contains an object consisting of each category.
  let film = {
    title: title,
    year: year,
    director: director,
    genre: genre,
    runtime: runtime,
    score: score,
  };

  // Return 'film' to make it accessible outside of the function.
  return film;
}

// Function to be able to submit a form containing the required information for the new object in the database.
function addFilmSubmit(event) {
  event.preventDefault();

  // Create a variable for each category, which contains the value of each category using their ID:s.
  let title = document.getElementById("title").value;
  let year = Number(document.getElementById("year").value);
  let director = document.getElementById("director").value;
  let genre = document.getElementById("genre").value;
  let runtime = Number(document.getElementById("runtime").value);
  let score = Number(document.getElementById("score").value);

  // If and if-else statements to check if any of the boxes in the form are empty. If they are, an alert is presented.
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

  // Assigns the value database[database.length - 1].id + 1 to the variable film's id.
  film.id = database[database.length - 1].id + 1;

  // Run the functions to both add the new film to the database, and render it in the list.
  addFilmToDatabase(database, film);
  renderFilms(database);

  // Declare the variable form which contains the html-id "add-film-form".
  let form = document.getElementById("add-film-form");

  // Use 'form.reset' in order the reset what is written in the form upon adding. 
  form.reset();
}

// Function to add a new film to the existing database.
function addFilmToDatabase(database, film) {
  // Push the new film into the database.
  database.push(film);
}

// Function to add a filter which filters by the assigned genre.
function filterByGenreSubmit(event) {
  event.preventDefault();

  let genre = document.getElementById("filter-genre").value;

  let films = getFilmsByGenre(database, genre);

  // Call the function renderFilms to only display the desired films.
  renderFilms(films);
}

// Function to add a filter which filters by the assigned score.
function filterByScoreSubmit(event) {
  event.preventDefault();

  let score = document.getElementById("filter-score").value;

  let films = getFilmsByScore(database, score);
  
  // Call the function renderFilms to only display the desired films. 
  renderFilms(films);
}

// Function to get (or collect) only the films that have the correct genre-value.
function getFilmsByGenre(films, genre) {
  // Declare an empty array that we can add objects to. 
  let filmsByGenre = [];

  // For-loop to loop through all films.
  for (let film of films) {
    
    // If-statement in order to only get the film which genre is the same as the one we have requested.
    if (film.genre.toLowerCase() == genre.toLowerCase()) {
      filmsByGenre.push(film);
    }
  }

  return filmsByGenre;
}

// Function to get (or collect) only the films that have the correct score-value.
function getFilmsByScore(films, score) {
  // Declare an empty array that we can add objects to. 
  let filmsByScore = [];

  // For-loop to loop through all films.
  for (let film of films) {

    // If-statement in order to only get the film which score is the same as the one we have requested.
    if (film.score == score) {
      filmsByScore.push(film);
    }
  }

  return filmsByScore;
}

// Function to remove a film form the database by clicking the button.
function removeFilmClick(event) {
  let button = event.target;
  let id = button.parentElement.id;

  // If-statement containing 'confirm() == true' in order to confirm the decision.
  if (confirm("Are you sure you want to delete this film?") == true) {
    removeFilmById(database, id);
  } else {
    return false;
  }

  renderFilms(database);
}

// Function to remove a film using its id.
function removeFilmById(films, id) {

  // For-loop in order to go through each film. 
  for (let i = 0; i < films.length; i++) {
    let film = films[i];

    // If-statement which says that if the film.id is the same as id, the film is deleted from the database. 
    if (film.id == id) {
      films.splice(i, 1);
      return;
    }
  }
}

// Function to render (display) a film in the visible list on the page. 
function renderFilm(film) {
  // Declare a variable for the creation of a new div, adding a class and adding the id. 
  let div = document.createElement("div");
  div.classList.add("film");
  div.id = film.id;

  // Adds the text on the page using 'div.innerHTML'. Template literals to make the content dynamic.
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

  // Return div to make it accessible outside of the function.
  return div;
}

// Function to render (display) the films in the visible list on the page. 
function renderFilms(films) {
  let filmsElement = document.getElementById("films");
  filmsElement.innerHTML = "";

  for (let film of films) {
    let filmElement = renderFilm(film);
    filmsElement.appendChild(filmElement);
  }

  // Runs the function 'setRemoveFilmHandlers' each time the films are rendered.
  setRemoveFilmHandlers();
}

// Function to set the other function 'addFilmSubmit' to the id 'add-film-form'. 
function setAddFilmHandler() {
  let form = document.getElementById("add-film-form");
  form.addEventListener("submit", addFilmSubmit);
}

// Function to set the other functions 'filterByGenreSubmit', 'filterByScoreSubmit' and 'showAllClick' to the corresponsing id:s.
function setFilterFilmHandlers() {
  let genreForm = document.getElementById("filter-by-genre");
  let scoreForm = document.getElementById("filter-by-score");
  let showAll = document.getElementById("show-all");

  // Adds the eventListeners to the id:s.
  genreForm.addEventListener("submit", filterByGenreSubmit);
  scoreForm.addEventListener("submit", filterByScoreSubmit);
  showAll.addEventListener("click", showAllClick);
}

// Function to set the other function 'removeFilmClick' to the 'remove-button'.
function setRemoveFilmHandlers() {
  let buttons = document.querySelectorAll(".film button");

  for (let button of buttons) {
    button.addEventListener("click", removeFilmClick);
  }
}

// Function to collect all films regardless of id and display (render) them all in the list. 
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
