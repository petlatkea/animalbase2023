import * as RESTAPI from "../rest-api.js";

export default class SearchBox {
  constructor(container) {
    this.container = document.querySelector("#"+container);
    this.searchTerm = undefined;
    this.searchType = "all";
  }

  render() {
    const html = /*html*/`
    <p>
      Search: <input type="search" name="searchField" id="searchField" data-action="search">
      <select name="searchType" id="searchType" data-action="search">
        <option value="all">all</option>
        <option value="name">Name</option>
        <option value="type">Type</option>
        <option value="desc">Description</option>
      </select>
    </p>`;

    this.container.insertAdjacentHTML("beforeend", html);
    this.postRender(this.container.lastElementChild);
  }

  postRender(element) {
    element.querySelectorAll("[data-action='search']").forEach(field => {
      field.addEventListener("search", updateSearch.bind(this)); // Non-standard, but included just in case
      field.addEventListener("blur", updateSearch.bind(this));
      field.addEventListener("change", updateSearch.bind(this));
      field.addEventListener("keyup", updateSearch.bind(this));
    })
    function updateSearch() {
      const searchTerm = element.querySelector("#searchField").value.toLowerCase().trim();
      const searchType = element.querySelector("#searchType").value;
      
      if(searchTerm != this.searchTerm || searchType != this.searchType) {
        this.setSearch(searchTerm, searchType);
      }
    }
  }

  setListToUpdate(aListRenderer) {
    this.listToUpdate = aListRenderer;
  }

  async setSearch(searchTerm, searchType) {
    this.searchTerm = searchTerm;
    this.searchType = searchType;
//    console.log(`Search for ${this.searchTerm} in ${this.searchType}`);

    // A bit hacky perhaps ... Doesn't feel quite right, but should work for now
    // Really it should search the backend, and set the list to the returned data ...
    const allAnimals = await RESTAPI.getAllAnimals();
    if(this.searchTerm.length === 0) {
      this.listToUpdate.setList(allAnimals);
    } else if( this.searchType === "all" ) {
      this.listToUpdate.setList(allAnimals
        .filter(animal => Object.values(animal)
        .some(value => value.toString().toLowerCase().includes(this.searchTerm))));
    } else {
      this.listToUpdate.setList(allAnimals
        .filter(animal => animal[this.searchType].toString().toLowerCase().includes(this.searchTerm)));
    }

    this.listToUpdate.render();
  }
}