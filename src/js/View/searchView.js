class SearchView {
   _parentElement = document.querySelector('#form');
   _parentEl = document.querySelector('.top__result');

   setupEvent(handler) {
      this._parentElement.addEventListener('submit', function (e) {
         e.preventDefault();
         handler();
      });
   }

   getQuery() {
      const query = this._parentElement.querySelector('.form__search').value;
      document.querySelector('.top__anime').textContent = 'Anime Results';
      this.clearInput();
      return query;
   }

   _clear() {
      this._parentEl.innerHTML = '';
   }

   clearInput() {
      this._parentElement.querySelector('.form__search').value = '';
   }
}

export default new SearchView();
