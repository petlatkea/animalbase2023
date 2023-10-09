import Dialog from "./dialog.js";
import Animal from "../model/animal.js";
import * as controller from "../main.js";

export default class AnimalUpdateDialog extends Dialog {
  
  renderHTML() {
    const html = /*HTML*/
    `<h1>Create animal</h1>
      <form action="" method="dialog" id="update-form">
        <label for="update-name">Name:</label> <input type="text" id="update-name" name="name" placeholder="The animal's name - e.g. John">
        <label for="update-type">Type:</label> <input type="text" id="update-type" name="type" placeholder="The animal's type - e.g. dog">
        <label for="update-desc">Description:</label> <input type="text" id="update-desc" name="desc">
        <label for="update-age">Age:</label> <input type="number" id="update-age" name="age">
        <label for="update-star">Star:</label> <input type="checkbox" id="update-star" name="star">
        <label for="update-winner">Winner:</label> <input type="checkbox" id="update-winner" name="winner">
        <button data-action="update">Update</button>
      </form>`

    return html;
  }

  setAnimal(animal) {
    this.animal = animal;
    const form = this.dialog.querySelector("form");
    form.name.value = animal.name;
    form.type.value = animal.type;
    form.desc.value = animal.desc;
    form.age.value = animal.age;
    form.star.checked = animal.star;
    form.winner.checked = animal.winner;
  }

  update() {
    // Build animal-object from form - store in component for later use
    const form = this.dialog.querySelector("form");
    
    this.animal.name = form.name.value;
    this.animal.desc = form.desc.value;
    this.animal.type = form.type.value;
    this.animal.age = form.age.valueAsNumber;
    this.animal.winner = form.winner.checked;
    this.animal.star = form.star.checked;

    console.log("Update animal", this.animal)
    
    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.updateAnimal(this.animal);
  }
  
}