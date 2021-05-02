import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;
  _numPage;

  addHandlerClick(handler) {
    //event delegation
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    this._numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(`this._numPages : ${this._numPages}`);

    return this.generateMarkupButton();
  }

  generateMarkupButton() {
    const prevBtn = `
        <button data-goto="${
          this._curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._curPage - 1}</span>
        </button>
    `;
    const nextBtn = `
        <button data-goto="${
          this._curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;

    // Page 1, and there are other pages
    if (this._curPage === 1 && this._numPages > 1) {
      return nextBtn;
    }
    // Last page
    if (this._curPage === this._numPages && this._numPages > 1) {
      return prevBtn;
    }
    // Other page
    if (this._curPage < this._numPages) {
      return prevBtn + nextBtn;
    }
    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
