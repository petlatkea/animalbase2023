import Dialog from "./dialog.js";
import Animal from "../model/animal.js";
import * as controller from "../main.js";

export default class AnimalCreateDialog extends Dialog {
  
  renderHTML() {
    const html = /*HTML*/
    `<h1>Create animal</h1>
      <form action="" method="dialog" id="create-form">
        <label for="create-name">Name:</label> <input type="text" id="create-name" name="name" placeholder="The animal's name - e.g. John">
        <label for="create-type">Type:</label> <input type="text" id="create-type" name="type" placeholder="The animal's type - e.g. dog">
        <label for="create-desc">Description:</label> <input type="text" id="create-desc" name="desc">
        <label for="create-age">Age:</label> <input type="number" id="create-age" name="age">
        <label for="create-star">Star:</label> <input type="checkbox" id="create-star" name="star">
        <label for="create-winner">Winner:</label> <input type="checkbox" id="create-winner" name="winner">
        <button data-action="create">Create</button>
      </form>`

    return html;
  }

  create() {
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