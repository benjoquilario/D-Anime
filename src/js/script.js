import 'core-js/stable';
import 'regenerator-runtime/runtime';

const resultContainer = document.querySelector('.result');
const topContainer = document.querySelector('.top__result');
const search = document.getElementById('search');

const timeOUt = function (time) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         reject(new Error('We could not find any anime for your query'));
      }, time * 1000);
   });
};

const renderAnime = function (result) {
   const markup = `
         <li>
            <div class="result__img">
               <img
                  src="${result.image_url}"
                  alt="${result.title}"
                  />
            </div>
            <div class="result__description">
               <h2 class="result__title">${result.title}</h2>
               <p class="result__episodes">
                  Episodes
                  <span class="type">${result.episodes}</span>
               </p>
               <p class="result__type">
                  <span class="type">Type: </span>
                        ${result.type}
               </p>
               <p class="result__synopsis">
                        ${result.synopsis}
               </p>
               <a href="${result.url}" target="_blank" class="result__link">Read More</a>
            </div>
         </li>
      `;
   resultContainer.insertAdjacentHTML('beforeend', markup);
};

const renderTopAnime = function (top) {
   const markup = `
      <li>
         <span class="top__rank">${top.rank}.</span>
         <a href="${top.url}" target="_blank" class="top__link"
            ><img
               src="${top.image_url}"
               alt="${top.title}"
            />
            <div class="top__description">
               <h2 class="top__title">${top.title}</h2>
               <p class="top__episodes">
                  Episodes
                  <span class="type">${top.episodes}</span>
               </p>
            </div>
            <div class="top__score">
               <span class="top__score__text">score</span>
               <span class="top__score__score">${top.score}</span>
            </div>
         </a>
      </li>
   `;

   topContainer.insertAdjacentHTML('beforeend', markup);
};

const renderError = function (err) {
   resultContainer.innerHTML = `
   <div class="error-message">
      <h2>Whoops!</h2>
      ${err.message}
   </div>
   `;
};

const renderSpinner = function (parentEl) {
   const markup = `<div class="spinner"></div>`;
   parentEl.insertAdjacentHTML('beforeend', markup);
};

const showAnime = async function (query) {
   try {
      renderSpinner(resultContainer);
      const url = `https://jikan1.p.rapidapi.com/search/anime?q=${query}&order_by=title&sort=asc&limit=12`;
      const res = await Promise.race([
         fetch(url, {
            method: 'GET',
            headers: {
               'x-rapidapi-host': 'jikan1.p.rapidapi.com',
               'x-rapidapi-key':
                  '87ee0f81a3mshf54783944a96ff4p1203eejsn646c65b32de5',
            },
         }),
         timeOUt(12),
      ]);
      const data = await res.json();

      if (!res.ok)
         throw new Error('We could not find any anime for your query');
      const { results } = data;

      results.forEach(result => renderAnime(result));
   } catch (err) {
      renderError(err);
   }
};

const form = document.querySelector('form');

form.addEventListener('submit', event => {
   event.preventDefault();

   const searchTerm = search.value;

   if (!searchTerm) return;
   search.value = '';

   showAnime(searchTerm);
   resultContainer.innerHTML = '';
});

const topAnime = async function () {
   try {
      const url = `https://jikan1.p.rapidapi.com/top/anime/1/bypopularity`;
      const res = await fetch(url, {
         method: 'GET',
         headers: {
            'x-rapidapi-host': 'jikan1.p.rapidapi.com',
            'x-rapidapi-key':
               '87ee0f81a3mshf54783944a96ff4p1203eejsn646c65b32de5',
         },
      });
      const data = await res.json();

      if (!res.ok)
         throw new Error('We could not find any anime for your query');
      const { top } = data;
      const getTenAnime = top.slice(0, 12);

      console.log(getTenAnime);

      getTenAnime.forEach(top => renderTopAnime(top));
   } catch (err) {
      renderError(err);
   }
};

window.addEventListener('load', topAnime);
