import Animal from "./model/animal.js";

const endPoint = "http://localhost:4000/animals";
//const endPoint = "https://petl-animalbase02.azurewebsites.net/animals";



let allAnimals = [];
let lastFetch = 0;

async function getAllAnimals() {
  const now = Date.now();
  const timePassedSinceLastFetch = now - lastFetch;
  // Only fetch if more than 10 seconds has passed since last fetch
  if( timePassedSinceLastFetch > 10_000) {  // <- hardcoded time - should maybe be something different
    await refetchAllAnimals();
  }

  return allAnimals;
}

async function refetchAllAnimals() {
  const response = await fetch(`${endPoint}/`);
  const originalJson = await response.json();
  allAnimals = originalJson.map(jsonObj => new Animal(jsonObj));

  lastFetch = Date.now();
}

async function getAnimal(id) {
  const response = await fetch(`${endPoint}/${id}`, {
		method: "GET"
	});

  const animal = new Animal( await response.json());

  return animal;
}

async function createAnimal(animal) {
  const json = JSON.stringify(animal);
	const response = await fetch(`${endPoint}/`, {
		method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
		body: json,
	});

  await refetchAllAnimals();
  // NOTE: Should we return the newly created id?
  return response.ok;
}

async function updateAnimal(animal) {
  const json = JSON.stringify(animal);
  const response = await fetch(`${endPoint}/${animal.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: json
  });

  await refetchAllAnimals();

  return response.ok;
}

async function patchAnimal(animal, property, value) {
  const dataObject = {};
  dataObject[property] = value;

  const json = JSON.stringify(dataObject);
  const response = await fetch(`${endPoint}/${animal.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: json
  });
  
  await refetchAllAnimals();

  return response.ok;
}

async function deleteAnimal(animal) {
  const response = await fetch(`${endPoint}/${animal.id}`, {
    method: "DELETE"
  });

  await refetchAllAnimals();

  return response.ok;
}

export {getAllAnimals, getAnimal, createAnimal, updateAnimal, patchAnimal, deleteAnimal};