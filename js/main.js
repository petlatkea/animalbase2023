"use strict";
import { getAllAnimals } from "./rest-api.js";
import { displayList } from "./table.js";
import { selectFilter, filterList } from "./filter.js";
import { selectSort, sortList } from "./sort.js";


window.addEventListener("load", start);

function start() {
  console.log("JavaScript is running");
  initializeActionButtons();

  displayUpdatedList();
}

function initializeActionButtons() {
  document.querySelectorAll("[data-action='filter']")
  .forEach(button => button.addEventListener("click", selectFilter));

  document.querySelectorAll("[data-action='sort']")
  .forEach(button => button.addEventListener("click", selectSort));
}

async function displayUpdatedList() {
  const animals = await getAllAnimals();

  console.log(animals);
  const sortedList = sortList(animals);
  const filteredList = filterList(sortedList);
  // TODO: Search list

  displayList(filteredList);
}

export {displayUpdatedList};