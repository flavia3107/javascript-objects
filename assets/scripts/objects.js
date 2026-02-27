'use strict';
const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');
  const emptyImg = document.querySelector('#empty');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    emptyImg.style.display = 'block';
    return;
  } else {
    movieList.classList.add('visible');
    emptyImg.style.display = 'none';
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));
  if (filteredMovies.length === 0) movieList.classList.remove('visible');
  else movieList.classList.add('visible');

  emptyImg.style.display = !filteredMovies.length ? 'block' : 'none';
  filteredMovies.forEach(movie => {
    const movieEl = document.createElement('li');
    const { info, ...otherProps } = movie;
    let { getFormattedTitle } = movie;
    let text = `<h2 class='movie-title'>${getFormattedTitle.apply(movie)}</h2>`;
    for (const key in info) {
      if (key !== 'title' && key !== '_title')
        text = text + `<span class='movie-release'>${key}</span><br/> <span class='movie-subtitle'>${info[key]}</span>`;
    }
    movieEl.innerHTML = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (extraName.trim() === '' || extraValue.trim() === '') return;

  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT';
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue
    },
    id: Math.random().toString(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    }
  };

  newMovie.info.title = title;
  movies.push(newMovie);
  renderMovies();
  reset();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

const reset = () => {
  document.getElementById('title').value = '';
  document.getElementById('extra-name').value = '';
  document.getElementById('extra-value').value = '';
}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
