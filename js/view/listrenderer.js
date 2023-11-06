export default class ListRenderer {

  constructor(list, container, itemRenderer) {
    
    this.itemRenderer = itemRenderer; // Only remember the class, not an actual instance
    if (container instanceof Element) {
      this.container = container;
    } else if (typeof container === "string") {
      this.container = document.querySelector(container);
    } else {
      console.error("Container is not of the required type");
      console.error(container);
    }
    this.setList(list);
  }

  setList(list) {
    // Build list of renderers with items in them
    this.list = list.map(item => new this.itemRenderer(item));
    // reset sortby to avoid toggling direction
    const sortBy = this.sortBy;
    this.sortBy = undefined;
    // and re-sort the new list from the existing settings
    this.sort(sortBy, this.sortDir);
  }

  clear() {
    this.container.innerHTML = "";
  }

  render() {
    this.clear();

    // create a filtered list to render
    const filteredList = this.list.filter(item => this.filterProperty === "*" || item.item[this.filterProperty] == this.filterValue);

    for (const itemRenderer of filteredList) {
      const html = itemRenderer.render();
      this.container.insertAdjacentHTML("beforeend", html);

      if(itemRenderer.postRender) {
        const element = this.container.lastElementChild;
        itemRenderer.postRender(element);
      }
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
    const valueSortFunction = (a,b) => a.item[this.sortBy] > b.item[this.sortBy] ? dir : -dir;
    const stringSortFunction = (a,b) => a.item[this.sortBy]?.localeCompare(b.item[this.sortBy]) * dir;

    // select between sortFunctions, depending on the type on the sortBy property in the first item in the list
    const sortFunction = typeof this.list[0]?.item[this.sortBy] === "string" ? stringSortFunction : valueSortFunction;

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


