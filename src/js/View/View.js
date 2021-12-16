export default class View {
   _data;

   render(data) {
      if (!data || (Array.isArray(data) && data.length === 0))
         return this.renderErorr();

      this._data = data;
      const markup = this._generateMarkup();
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
   }

   _clear() {
      this._parentElement.innerHTML = '';
   }

   renderSpinner() {
      const markup = `
          <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
         </div>
     `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
   }

   renderErorr(message = this._errorMessage) {
      const markup = `
         <div class="error">
            <div>
               <h2 class="error__title">Whoops!</h2>
               <p class="error__message">
                  ${message}
               </p>
            </div>
         </div>
      `;

      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
   }

   renderMessage(message = this._errorMessage) {
      const markup = `
         <div class="message">
            <div>
               <h2 class="error__title">Whoops!</h2>
               <p class="error__message">
                  ${message}
               </p>
            </div>
         </div>
      `;

      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
   }
}
