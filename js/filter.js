import { getAllAnimals } from "./rest-api.js";
import { displayList } from "./table.js";

let currentFilter = "*";

function selectFilter(event) {
  const filter = event.target.dataset.filter;
  console.log(`User selected ${filter}`);

  setFilter(filter);
  displayFilteredList();
}

function setFilter(filter) {
  currentFilter = filter;
}

function filterList(animals) {
  return animals.filter(animal => currentFilter === "*" || animal.type === currentFilter);
}

async function displayFilteredList() {
  const allAnimals = await getAllAnimals();
  const filteredList = filterList(allAnimals);
  displayList(filteredList);
}

export {selectFilter}