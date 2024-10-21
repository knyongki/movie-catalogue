import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORAGE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORAGE_NAME, { keyPath: 'id' });
  },
});

const FavoriteMovieIdb = {
  async getMovie(id) {
    return (await dbPromise).get(OBJECT_STORAGE_NAME, id);
  },

  async getAllMovies() {
    return (await dbPromise).getAll(OBJECT_STORAGE_NAME);
  },

  async putMovie(movie) {
    return (await dbPromise).put(OBJECT_STORAGE_NAME, movie);
  },

  async deleteMovie(id) {
    return (await dbPromise).delete(OBJECT_STORAGE_NAME, id);
  },
};

export default FavoriteMovieIdb;