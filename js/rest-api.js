const endPoint = "https://animalbase2023-default-rtdb.europe-west1.firebasedatabase.app/";

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
  const response = await fetch(endPoint+"/animals.json");
  const originalJson = await response.json();
  allAnimals = prepareData(originalJson);
  lastFetch = Date.now();
}

function prepareData(listOfObjects) {
  const arrayFromObjects = [];
  
  for (const object in listOfObjects) {
    const post = listOfObjects[object];
    post.id = object;
    arrayFromObjects.push(post);
  }
  return arrayFromObjects;
}


async function createAnimal(animal) {
  const json = JSON.stringify(animal);
	const response = await fetch(endPoint+"animals.json", {
		method: "POST",
		body: json,
	});

  refetchAllAnimals();
  // NOTE: Should we return the newly created id?
  return response.ok;
}

async function updateAnimal(animal) {
  const json = JSON.stringify(animal);
  const response = await fetch(`${endPoint}animals/${animal.id}.json`, {
    method: "PUT",
    body: json
  });

  refetchAllAnimals();

  return response.ok;
}

export {getAllAnimals, createAnimal, updateAnimal};