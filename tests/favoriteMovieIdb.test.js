import { itActsAsFavoriteMovieModel } from "./contracts/favoriteMovieContract";
import FavoriteMovieIdb from "../src/scripts/data/favorite-movie-idb";

describe('Favorite Movie Idb Contact Test Implemented', () => { 
  afterEach(async () => {
    (await FavoriteMovieIdb.getAllMovies()).forEach(async (movie) => {
      await FavoriteMovieIdb.deleteMovie(movie.id);
    });
  });

  itActsAsFavoriteMovieModel(FavoriteMovieIdb);
})