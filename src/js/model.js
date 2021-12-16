import { async } from 'regenerator-runtime';
import { getJSON } from './helper.js';
import { API_URL } from './config.js';

export const state = {
   anime: {},
   top: [],
   search: {
      query: '',
      results: [],
      page: 1,
      resultsPerPage: 10,
   },
};

export const loadAnime = async function (id) {
   try {
      const data = await getJSON(`${API_URL}anime/${id}`);
      console.log(data);
      state.anime = {
         id: data.mal_id,
         imageUrl: data.image_url,
         rank: data.rank,
         score: data.score,
         duration: data.duration,
         synopsis: data.synopsis,
         title: data.title,
         titleJP: data.title_japanese,
         type: data.type,
         themes: data.themes,
         rating: data.rating,
         members: data.members,
         background: data.background,
         favorites: data.favorites,
         episodes: data.episodes,
         popularity: data.popularity,
         genres: data.genres,
      };
   } catch (err) {
      throw err;
   }
};

export const loadTopAnime = async function () {
   try {
      const data = await getJSON(`${API_URL}top/anime/1/bypopularity`);

      const { top } = data;

      state.top = top
         .map(t => {
            return {
               id: t.mal_id,
               rank: t.rank,
               imageUrl: t.image_url,
               title: t.title,
            };
         })
         .slice(0, 10);
   } catch (err) {
      throw err;
   }
};

export const loadSearchResult = async function (query) {
   try {
      const data = await getJSON(`${API_URL}search/anime?q=${query}`);

      state.search.results = data.results.map(result => {
         return {
            id: result.mal_id,
            rank: result.rank,
            imageUrl: result.image_url,
            title: result.title,
         };
      });
   } catch (err) {
      throw err;
   }
};

export const getSearchPagination = function (page = state.search.page) {
   state.search.page = page;

   const start = (page - 1) * state.search.resultsPerPage;
   const end = page * state.search.resultsPerPage;
   return state.search.results.slice(start, end);
};
