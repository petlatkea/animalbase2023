import ListRenderer from "./listrenderer.js";
import { getSomeAnimals } from "../rest-api.js";

export default class Paginater extends ListRenderer {
  constructor(route, containerparent, itemRenderer, itemsPrPage) {
    super([], document.querySelector(containerparent + " tbody"), itemRenderer);

    this.containerParent = document.querySelector(containerparent);
    this.itemsPrPage = itemsPrPage;

    this.setPage(1);
    this.renderPageButtons();
  }

  setList(list) {
    // set list without sorting
    if (list) {
      this.list = list.map(item => new this.itemRenderer(item));
    }
    this.render();
  }

  async setPage(page) {
    const offset = (page - 1) * this.itemsPrPage;
    this.setList(await getSomeAnimals(this.itemsPrPage, offset));
  }

  renderPageButtons() {
    const totalNumberOfItems = 100; // TODO: Find from backend
    // create a list of buttons - add them below the parent
    let html = '<div id="paginator">';
    for (let p = 0; p < totalNumberOfItems / this.itemsPrPage; p++) {
      html += `<a href="#">${p * this.itemsPrPage + 1}-${(p + 1) * this.itemsPrPage}</a> . `;
    }
    html += `</div>`;
    this.containerParent.insertAdjacentHTML("afterend", html);

    // create eventlisteners on "buttons"
    document.querySelectorAll("#paginator a").forEach((pageButton, index) => {
      pageButton.addEventListener("click", event => {
        event.preventDefault(); // avoid following links of submitting
        const page = index + 1;
        console.log("Clicked page: " + page);
        this.setPage(page);
      });
    });
  }
}
