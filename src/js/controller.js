import { async } from 'regenerator-runtime/runtime';
import * as model from './model.js';
import { themeMode } from './mode.js';
import animeView from './View/animeView.js';
import topView from './View/topView.js';
import searchView from './View/searchView.js';
import resultsView from './View/resultsView.js';
import paginationView from './View/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlTopAnime = async function () {
   try {
      await model.loadTopAnime();
      topView.render(model.state.top);
   } catch (err) {
      alert(err);
   }
};

const controlSearchAnime = async function () {
   try {
      const query = searchView.getQuery();

      if (!query) return;

      resultsView.renderSpinner();
      await model.loadSearchResult(query);
      console.log(model.state.search.results);
      resultsView.render(model.getSearchPagination());
      paginationView.render(model.state.search);
   } catch (err) {
      resultsView.renderErorr();
   }
};

const controlAnime = async function () {
   try {
      const id = window.location.hash.slice(1);
      if (!id) return;

      animeView.renderSpinner();
      await model.loadAnime(id);
      animeView.render(model.state.anime);
   } catch (err) {
      animeView.renderErorr();
   }
};

const controlPagination = function (goToPage) {
   resultsView.render(model.getSearchPagination(goToPage));
   paginationView.render(model.state.search);
};

const init = function () {
   topView.setupEvent(controlTopAnime);
   animeView.setupEvent(controlAnime);
   searchView.setupEvent(controlSearchAnime);
   paginationView.setupEvent(controlPagination);
   themeMode();
};

init();
