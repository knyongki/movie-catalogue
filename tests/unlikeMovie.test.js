import LikeButtonPresenter from '../src/scripts/utils/like-button-presenter';
import FavoriteMovieIdb from "../src/scripts/data/favorite-movie-idb";
import * as TestFatories from "./helpers/testFactories";

describe('Unlike A movie', () => { 
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteMovieIdb.putMovie({ id: 1});
  });

  it('should display unlike widget when the movie has been liked', async () => {
    await TestFatories.createLikeButtonPresenterWithMovie({ id: 1});
    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeTruthy();
  });

  it('should not display like widget when the movie has been liked', async () => {
    await TestFatories.createLikeButtonPresenterWithMovie({ id: 1 });
    expect(document.querySelector('[aria-label="like this movie"]')).toBeFalsy();
  });

  it('should be able to remove liked movie from the list', async () => {
    await TestFatories.createLikeButtonPresenterWithMovie({ id: 1 });
    document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));
    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked movie is not in the list', async () => {
    await TestFatories.createLikeButtonPresenterWithMovie({ id: 1 });

    await FavoriteMovieIdb.deleteMovie(1);

    document.querySelector('[aria-label="unlike the movie"]').dispatchEvent(new Event('click'));
    expext(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});