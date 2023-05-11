"use strict";
import { getAllAnimals } from "./rest-api.js";
import { displayList } from "./table.js";
import { selectFilter, filterList } from "./filter.js";
import { selectSort, sortList } from "./sort.js";
import { selectSearch, searchList } from "./search.js";
import { showCreateDialog } from "./create.js";

window.addEventListener("load", start);

function start() {
  console.log("JavaScript is running");
  initializeActionButtons();

  displayUpdatedList();
}

function initializeActionButtons() {
  document.querySelectorAll("[data-action='filter']").forEach(button => button.addEventListener("click", selectFilter));

  document.querySelectorAll("[data-action='sort']").forEach(button => button.addEventListener("click", selectSort));

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
