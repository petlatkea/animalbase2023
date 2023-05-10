const endPoint = "https://animalbase2023-default-rtdb.europe-west1.firebasedatabase.app/";

async function getAllAnimals() {
  const start = performance.now();
  const response = await fetch(endPoint+"/animals.json");
  const originalJson = await response.json();
  const data = prepareData(originalJson);
  const end = performance.now();

  console.log("get took: " + (end-start) + " milliseconds");

  return data;
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