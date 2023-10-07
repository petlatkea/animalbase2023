export default class ListRenderer {
  constructor(list, container, itemRenderer) {
    this.list = list;
    this.itemRenderer = new itemRenderer(); // Note: itemRenderer is not the class, but a variable containing the class!
    if (container instanceof Element) {
      this.container = container;
    } else if (typeof container === "string") {
      this.container = document.querySelector(container);
    } else {
      console.error("Container is not of the required type");
      console.error(container);
    }
  }

  clear() {
    this.container.innerHTML = "";
  }

  render() {
    this.clear();

    // create a filtered list to render
    const filteredList = this.list.filter(item => this.filterProperty === "*" || item[this.filterProperty] == this.filterValue);

    for (const item of filteredList) {
      const html = this.itemRenderer.render(item);
      this.container.insertAdjacentHTML("beforeend", html);
    }
  }

  sort(sortBy, sortDir) {
    // if sorting by the same property as last time
    if(sortBy === this.sortBy) {
      // Toggle sort direction, ignore what sortDir is given 
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    } else {
      if(sortDir) {
        this.sortDir = sortDir;
      } else {
        this.sortDir = "asc";
      }
    }
    // store sortBy in property for next time
    this.sortBy = sortBy;

    // make direction into a number, to make it easier to flip
    const dir = this.sortDir === "asc" ? 1 : -1;

    // NOTE: sortFunctions MUST be arrow-functions, to keep the reference to this!
    const valueSortFunction = (a,b) => a[this.sortBy] > b[this.sortBy] ? dir : -dir;
    const stringSortFunction = (a,b) => a[sortBy]?.localeCompare(b[sortBy]) * dir;

    // select between sortFunctions, depending on the type on the sortBy property in the first item in the list
    const sortFunction = typeof this.list[0][sortBy] === "string" ? stringSortFunction : valueSortFunction;

    // sort the list with the chosen sortFunction
    this.list.sort(sortFunction);

    // and re-render the list
    this.render();
  }

  filter(filterProperty, filterValue) {
    // simply remember the settings
    this.filterProperty = filterProperty;
    this.filterValue = filterValue;

    // and re-render the list - this will do the actual filtering
    this.render();
  }
}


