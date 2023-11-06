import * as RESTAPI from "./rest-api.js";

import ListRenderer from "./view/listrenderer.js";
import AnimalRenderer from "./view/animalrenderer.js";
import AnimalCreateDialog from "./view/animalcreatedialog.js";
import AnimalUpdateDialog from "./view/animalupdatedialog.js";
import ConfirmDeleteDialog from "./view/confirmdeletedialog.js";
import SearchBox from "./view/searchbox.js";

window.addEventListener("load", start);

// model
let animals = [];

// views
let animalList = null;
let createDialog = null;
let updateDialog = null;
let confirmDialog = null;
let searchBox = null;

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

  confirmDialog = new ConfirmDeleteDialog("delete-dialog");

  searchBox = new SearchBox("search");
  searchBox.setListToUpdate(animalList);
  searchBox.render();


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

function confirmDeleteAnimal(animal) {
  confirmDialog.setAnimal(animal);
  confirmDialog.render();
  confirmDialog.show();
}

async function deleteAnimal(animal) {
  await RESTAPI.deleteAnimal(animal);

   // update list
   animals = await RESTAPI.getAllAnimals();
   animalList.setList(animals);
   animalList.render();
}

export { createAnimal , selectAnimalForUpdate, updateAnimal, updateSingleProperty, confirmDeleteAnimal, deleteAnimal};
