import View from './View.js';

class ResultsView extends View {
   _parentElement = document.querySelector('.top__result');
   _errorMessage = 'No anime found for your query! Please try again';
   _message = '';

   _generateMarkup() {
      return this._data.map(this._generateMarkupPreview).join('');
   }

   _generateMarkupPreview(d) {
      return `
        <li>
            <span class="sr-only"></span>
            <a href="#${d.id}" class="top__link">
                <img src="${d.imageUrl}" alt="${d.title}"/>
            <div class="top__description">
                <h2 class="top__title">${d.title}</h2>
            </div>
            </a>
        </li>
        `;
   }
}

export default new ResultsView();
