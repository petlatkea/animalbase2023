const endPoint = "https://animalbase2023-default-rtdb.europe-west1.firebasedatabase.app/";

let allAnimals = [];
let lastFetch = 0;

async function getAllAnimals() {
  performance.mark("fetch-started")

  const now = Date.now();
  const timePassedSinceLastFetch = now - lastFetch;
  // Only fetch if more than 10 seconds has passed since last fetch
  if( timePassedSinceLastFetch > 10_000) {  // <- hardcoded time - should maybe be something different
    await refetchAllAnimals();
  }
  performance.mark("fetch-completed")

  // NOTE: privacy.reduceTimerPrecision must be off/false for anything to be measured at all ...
  const result = performance.measure("fetching", "fetch-started", "fetch-completed");

  console.log("optimized get took: " + result.duration + " milliseconds");

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

export {getAllAnimals};