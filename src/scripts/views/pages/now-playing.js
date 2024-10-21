import TheMovieDbSource from '../../data/themoviedb-source';
import { createMovieItemTemplate } from '../templates/template-creator';

const NowPlaying = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Now Playing in Cinema</h2>
        <div id="movies" class="movies">
      </div>
    `;
  },

  async afterRender() {
    const movies = await TheMovieDbSource.nowPlayingMovies();
    const movieContainer = document.querySelector('#movies');
    movies.forEach((movie) => {
      movieContainer.innerHTML += createMovieItemTemplate(movie);
    });
  },
};

export default NowPlaying;
