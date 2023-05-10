"use strict";
import { getAllAnimals } from "./rest-api.js";
import { displayList } from "./table.js";
import { selectFilter } from "./filter.js";
window.addEventListener("load", start);

async function start() {
  console.log("JavaScript is running");
  initializeActionButtons();

  const animals = await getAllAnimals();

  console.log(animals);

  displayList(animals);
}

function initializeActionButtons() {
  document.querySelectorAll("[data-action='filter']")
  .forEach(button => button.addEventListener("click", selectFilter));
}

