import { showUpdateDialog, toggleProperty } from "./update.js";

function displayList(animals) {
  document.querySelector("#list tbody").innerHTML = "";
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set default values
  clone.querySelectorAll("[data-field]").forEach(field => {
    const fieldName = field.dataset.field;
    const value = animal[fieldName];
    field.textContent = value;
  });

  // star custom icon
  if (animal.star === true) {
    clone.querySelector("[data-field=star]").textContent = "⭐";
  } else {
    clone.querySelector("[data-field=star]").textContent = "☆";
  }
  
  // winner custom icon
  if (animal.winner === true) {
    clone.querySelector("[data-field=winner]").textContent = "🏆";
  } else {
    clone.querySelector("[data-field=winner]").textContent = "";
  }

  clone.querySelector("[data-field=winner]").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleProperty(animal,"winner");
  } );
  clone.querySelector("[data-field=star]").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleProperty(animal,"star");
  } );
  clone.querySelector("tr").addEventListener("click", () => showUpdateDialog(animal));

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

export { displayList };
