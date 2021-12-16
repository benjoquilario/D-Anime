import View from './View.js';

class AnimeView extends View {
   _parentElement = document.querySelector('#content');
   _errorMessage = 'We could not find any anime for your query!';
   _message = '';

   _generateMarkup() {
      const themes = this._data.themes;
      return `
        <section class="content__section">
                  <div class="td left">
                     <div class="td__left">
                        <div class="td__left__image">
                           <h2 class="td__left__title">${this._data.title}</h2>
                           <a href="#">
                              <img
                                 src="${this._data.imageUrl}"
                                 alt="${this._data.title}"
                              />
                           </a>
                           <div class="td__left__alt">
                              <h3 class="td__left__alt__title">
                                 Alternative Titles
                              </h3>
                              <div class="td__left__type">
                                 <span class="td__left__text">
                                    Japanese :
                                 </span>
                                 <span class="td__left__value">
                                    ${this._data.titleJP}
                                 </span>
                              </div>
                           </div>
                           <div class="td__left__info">
                              <h3 class="td__left__alt__title">Information</h3>
                              <div class="td__left__type">
                                 <span class="td__left__text">
                                    Episodes :
                                 </span>
                                 <span class="td__left__value"> ${
                                    this._data.episodes
                                       ? this._data.episodes
                                       : ''
                                 } </span>
                              </div>
                              <div class="td__left__type">
                                 <span class="td__left__text"> Themes : </span>
                                 <span class="td__left__value">${
                                    Array.isArray(themes) && themes.length === 0
                                       ? ''
                                       : this._data.themes[0].name
                                 }</span>
                              </div>
                              <div class="td__left__type">
                                 <span class="td__left__text">
                                    Duration :
                                 </span>
                                 <span class="td__left__value"
                                    >${this._data.duration}</span
                                 >
                              </div>
                              <div class="td__left__type">
                                 <span class="td__left__text"> Rating : </span>
                                 <span class="td__left__value">
                                    ${this._data.rating}
                                 </span>
                              </div>
                              <div class="td__left__type" style="display: flex">
                                 <span class="td__left__text">Genres</span>
                                 <ul class="genres">
                                 ${this._data.genres.map(genre => {
                                    return `
                                     <li>
                                        <a href="${genre.url}">${genre.name}</a>
                                     </li>
                                     `;
                                 })}
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="td" style="flex: 1">
                     <table cellpadding="0" cellspacing="0">
                        <tbody>
                           <tr class="tr__right">
                              <td valign="top">
                                 <div class="td__top">
                                    <div class="td__top__score">
                                       <div class="scores__text" style="color: #fff">score</div>
                                       <span class="scores__score">${
                                          this._data.score
                                       }</span>
                                    </div>
                                    <div class="td__top__top">
                                       <div class="td__top__rank">
                                          <div class="td__top__text">
                                             Rank #
                                          </div>
                                          <span class="td__top__score">${
                                             this._data.rank
                                          }</span>
                                       </div>
                                       <div class="td__top__popularity">
                                          <div class="td__top__text">
                                             Popularity #
                                          </div>
                                          <span class="td__top__score">${
                                             this._data.popularity
                                          }</span>
                                       </div>
                                       <div class="td__top__member">
                                          <br />
                                          <span
                                             class="td__top__score"
                                             style="font-weight: 400"
                                          >
                                             Members
                                             <strong>${
                                                this._data.members
                                             }</strong></span
                                          >
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td valign="top" class="td__bottom">
                                 <div class="td__bottomContainer">
                                    <div class="synopsis">
                                       <h3 class="td__bottom__title">
                                          Synopsis
                                       </h3>
                                       <p>
                                          ${this._data.synopsis}
                                       </p>
                                    </div>

                                    <div class="background">
                                       <h3 class="td__bottom__title">
                                          Background
                                       </h3>
                                       <p>
                                          ${
                                             this._data.background
                                                ? this._data.background
                                                : 'No Background'
                                          }
                                       </p>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </section>
        `;
   }
   setupEvent(handler) {
      ['hashchange', 'load'].forEach(ev =>
         window.addEventListener(ev, handler)
      );
   }
}

export default new AnimeView();
