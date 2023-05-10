import { getAllAnimals } from "./rest-api.js";
import { displayList } from "./table.js";

let sortingBy = "name";
let sortingDirection = "asc";

function selectSort(event) {
  const sortBy = event.target.dataset.sortBy;
  const sortDir = event.target.dataset.sortDirection;

  // TODO: Show status in UI

  // Toggle direction in ui
  if(sortDir === "asc") {
    event.target.dataset.sortDirection = "desc";
  } else {
    event.target.dataset.sortDirection = "asc";
  }

  setSort(sortBy, sortDir);

  displaySortedList();
}

function setSort(sortBy, sortDir) {
  sortingBy = sortBy;
  sortingDirection = sortDir;
}

function sortList(animals) {
  return animals.sort((a, b) => (a[sortingBy] == b[sortingBy] ? 0 : a[sortingBy] > b[sortingBy] ? sortingDirection==="asc"?1:-1 : sortingDirection==="asc"?-1:1));
}

async function displaySortedList() {
  const allAnimals = await getAllAnimals();
  const sortedList = sortList(allAnimals);
  displayList(sortedList);
}

export { selectSort };
