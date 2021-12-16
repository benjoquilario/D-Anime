import View from './View';

class Pagination extends View {
   _parentElement = document.querySelector('.pagination');

   setupEvent(handler) {
      this._parentElement.addEventListener('click', function (e) {
         const btn = e.target.closest('.btn--inline');
         if (!btn) return;

         const goToPage = +btn.dataset.page;
         handler(goToPage);
      });
   }

   _generateMarkup() {
      const curPage = this._data.page;
      const numPages = Math.ceil(
         this._data.results.length / this._data.resultsPerPage
      );

      if (curPage === 1 && numPages > 1) {
         return `
            <button data-page="${
               curPage + 1
            }" class="btn--inline btn--next">NEXT</button>
            `;
      }

      if (curPage === numPages && numPages > 1) {
         return `
         <button data-page="${curPage - 1}" 
            class="btn--inline btn--prev">
                PREV
        </button>
            `;
      }

      if (curPage < numPages) {
         return `
         <button data-page="${
            curPage - 1
         }" class="btn--inline btn--prev">PREV</button>
        <button data-page="${
           curPage + 1
        }" class="btn--inline btn--prev">NEXT</button>
            `;
      }

      return '';
   }
}

export default new Pagination();
