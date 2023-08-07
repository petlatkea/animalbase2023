import { displayUpdatedList } from "./main.js";
import { updateAnimal } from "./rest-api.js";

function showUpdateDialog(animal) {
  const dialog = document.querySelector("dialog#update-dialog");
  const form = document.querySelector("#update-form");

  form.name.value = animal.name;
  form.type.value = animal.type;
  form.desc.value = animal.desc;
  form.age.value = animal.age;
  form.star.checked = animal.star;
  form.winner.checked = animal.winner;

  // can't use addeventlistener here, because we want to replace existing event listeners
  form.onsubmit = (event) => submitUpdateForm(event, animal);
  dialog.showModal();
}

async function submitUpdateForm(event,animal) {
  const form = event.target;

  animal.name = form.name.value != "" ? form.name.value : animal.name;
  animal.type = form.type.value != "" ? form.type.value : animal.type;
  animal.desc = form.desc.value != "" ? form.desc.value : animal.desc;
  // use Number.isNaN because an empty field should be NaN, not 0
  animal.age = !Number.isNaN(form.age.valueAsNumber) ? form.age.valueAsNumber : animal.age;

  animal.star = form.star.checked;
  animal.winner = form.winner.checked;

  console.log("Updated animal");
  console.log(animal);

  await updateAnimal(animal);

  displayUpdatedList();
}

export {showUpdateDialog};