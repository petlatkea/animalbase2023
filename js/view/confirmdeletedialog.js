import Dialog from "./dialog.js";
import Animal from "../model/animal.js";
import * as controller from "../main.js";

export default class AnimalUpdateDialog extends Dialog {
  
  renderHTML() {
    const html = /*HTML*/
    `<h1>Delete animal?</h1>
      <p>Are you sure you want to delete the animal "${this.animal.name}"?</p>
      <form action="" method="dialog" id="delete-form">
        <button type="button" data-action="cancel">Cancel</button>
        <button type="submit" data-action="delete">Delete</button>
      </form>`

    return html;
  }

  setAnimal(animal) {
    this.animal = animal;
  }

  delete() {
    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.deleteAnimal(this.animal);
  }
  
}