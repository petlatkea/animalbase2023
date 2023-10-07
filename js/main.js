import { getAllAnimals } from "./rest-api.js";
import { selectSearch, searchList } from "./search.js";
import { showCreateDialog } from "./create.js";

import ListRenderer from "./view/listrenderer.js";
import AnimalRenderer from "./view/animalrenderer.js";

window.addEventListener("load", start);

async function start() {
  console.log("JavaScript is running");

  const animals = await getAllAnimals();

  const animalList = new ListRenderer(animals, "#list tbody", AnimalRenderer);
  animalList.render();
  initializeActionButtons();

  document.querySelectorAll("[data-action='sort']").forEach(button => button.addEventListener("click", 
  () => {
    // before sorting - remove .selected from previous selected header
    document.querySelector("[data-action=sort].selected")?.classList.remove("selected");

    animalList.sort(button.dataset.sortBy, button.dataset.sortDirection);
    
    // indicate selected sort header
    button.classList.add("selected");
    // indicate sort-direction on button
    button.dataset.sortDirection = animalList.sortDir;
  } ));

  document.querySelectorAll("[data-action='filter']").forEach(button => button.addEventListener("click", 
  () => {
    const [prop,val] = button.dataset.filter.split(":");
    animalList.filter(prop, val);
  }
  
  ));


}

function initializeActionButtons() {
  


  document.querySelectorAll("[data-action='search']").forEach(field => {
    field.addEventListener("search", selectSearch); // Non-standard, but included just in case
    field.addEventListener("blur", selectSearch);
    field.addEventListener("change", selectSearch);
    field.addEventListener("keyup", selectSearch);
  });

  document.querySelectorAll("[data-action='create']").forEach(button => button.addEventListener("click", showCreateDialog));
}

async function displayUpdatedList() {
  const animals = await getAllAnimals();

  const sortedList = sortList(animals);
  const filteredList = filterList(sortedList);
  const searchedList = searchList(filteredList);

  displayList(searchedList);
}

export { displayUpdatedList };
