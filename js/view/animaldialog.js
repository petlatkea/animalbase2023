import Animal from "../model/animal.js";
import * as controller from "../main.js";

export default class AnimalDialog {
  constructor(id) {
    // create dialog-element
    this.dialog = document.createElement("dialog");
    this.dialog.id = id;
    document.querySelector("main").insertAdjacentElement("afterend", this.dialog);
  }

  show() {
    this.dialog.showModal();
  }

  render() {
    const html = /*HTML*/
    `<h1>Create new animal</h1>
      <form action="" method="dialog" id="create-form">
        <label for="create-name">Name:</label> <input type="text" id="create-name" name="name" placeholder="The animal's name - e.g. John">
        <label for="create-name">Type:</label> <input type="text" id="create-type" name="type" placeholder="The animal's type - e.g. dog">
        <label for="create-name">Description:</label> <input type="text" id="create-desc" name="desc">
        <label for="create-name">Age:</label> <input type="number" id="create-age" name="age">
        <label for="create-name">Star:</label> <input type="checkbox" id="create-star" name="star">
        <label for="create-name">Winner:</label> <input type="checkbox" id="create-winner" name="winner">
        <button>Create</button>
      </form>`

    this.dialog.innerHTML = html;

    this.dialog.querySelector("form").addEventListener("submit", this.submit.bind(this));
  }

  submit() {
    // Build animal-object from form - store in component for later use
    const form = this.dialog.querySelector("form");
    this.animal = new Animal({
      name: form.name.value,
      desc: form.desc.value,
      type: form.type.value,
      age: form.age.valueAsNumber,
      winner: form.winner.checked,
      star: form.star.checked,
    });

    // clear form
    form.reset();

    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.createAnimal(this.animal);
  }
  
}