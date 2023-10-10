import { selectSearch, searchList } from "./search.js";
import * as RESTAPI from "./rest-api.js";

import ListRenderer from "./view/listrenderer.js";
import AnimalRenderer from "./view/animalrenderer.js";
import AnimalCreateDialog from "./view/animalcreatedialog.js";
import AnimalUpdateDialog from "./view/animalupdatedialog.js";

window.addEventListener("load", start);

// model
let animals = [];

// views
let animalList = null;
let createDialog = null;
let updateDialog = null;

// controller
// THIS is the controller ...


async function start() {
  console.log("JavaScript is running");

  // create models
  animals = await RESTAPI.getAllAnimals();

  // create views
  initializeViews();
  
}

// *** VIEWS ***



function initializeViews() {
  // Create list-component
  animalList = new ListRenderer(animals, "#list tbody", AnimalRenderer);
  animalList.render();

  // Create dialog-component
  createDialog = new AnimalCreateDialog("create-dialog");
  createDialog.render();

  updateDialog = new AnimalUpdateDialog("update-dialog");
  updateDialog.render();

  // initialize create-button
  document.querySelectorAll("[data-action='create']").forEach(button => button.addEventListener("click", createDialog.show.bind(createDialog)));



  // initialize sort buttons
  document.querySelectorAll("[data-action='sort']").forEach(button =>
    button.addEventListener("click", () => {
      // before sorting - remove .selected from previous selected header
      document.querySelector("[data-action=sort].selected")?.classList.remove("selected");

      animalList.sort(button.dataset.sortBy, button.dataset.sortDirection);

      // indicate selected sort header
      button.classList.add("selected");
      // indicate sort-direction on button
      button.dataset.sortDirection = animalList.sortDir;
    })
  );

  // initialize filter buttons
  document.querySelectorAll("[data-action='filter']").forEach(button =>
    button.addEventListener("click", () => {
      const [prop, val] = button.dataset.filter.split(":");
      animalList.filter(prop, val);
    })
  );
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


// *** Controller things ***

async function createAnimal(animal) {
  // call rest-api
  await RESTAPI.createAnimal(animal);

  // update list
  animals = await RESTAPI.getAllAnimals();
  animalList.setList(animals);
  animalList.render();

}

function selectAnimalForUpdate(animal) {
  updateDialog.setAnimal(animal);
  updateDialog.show();
}

async function updateAnimal(animal) {
  // call rest-api
  await RESTAPI.updateAnimal(animal);

  // update list
  animals = await RESTAPI.getAllAnimals();
  animalList.setList(animals);
  animalList.render();

}

async function updateSingleProperty(animal, property) {
  await RESTAPI.patchAnimal(animal, property, animal[property]);  
  // Do not re-render the entire list for a single property - expect the View to re-render itself!
}

export { displayUpdatedList, createAnimal , selectAnimalForUpdate, updateAnimal, updateSingleProperty};
