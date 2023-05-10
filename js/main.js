"use strict";
import { getAllAnimals } from "./rest-api.js";
window.addEventListener("load", start);

async function start() {
  console.log("JavaScript is running");

  const animals = await getAllAnimals();

  console.log(animals);
}

