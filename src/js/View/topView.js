import View from './View.js';

class TopAnime extends View {
   _parentElement = document.querySelector('.top__result');
   _data;

   _generateMarkup() {
      return this._data.map(this._generateMarkupTop).join('');
   }

   setupEvent(handler) {
      window.addEventListener('load', handler);
   }

   _generateMarkupTop(d) {
      return `
         <li>
            <span class="top__rank">${d.rank}.</span>
            <a href="#${d.id}" class="top__link">
               <img src="${d.imageUrl}" alt="${d.title}"/>
               <div class="top__description">
               <h2 class="top__title">${d.title}</h2>
               </div>
            </a>
         </li>`;
   }
}

export default new TopAnime();
