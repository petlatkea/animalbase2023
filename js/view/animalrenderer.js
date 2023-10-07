import ItemRenderer from "./itemrenderer.js";

export default class AnimalRenderer extends ItemRenderer {
  render(animal) {

    const html = /*HTML*/`
      <tr>
        <td data-action="toggle" data-field="winner">${animal.winner?"🏆":""}</td>
        <td data-action="toggle" data-field="star">${animal.star?"⭐":"☆"}</td>
        <td data-field="name">${animal.name}</td>
        <td data-field="type">${animal.type}</td>
        <td data-field="desc">${animal.desc}</td>
        <td data-field="age">${animal.age}</td>
        <td data-action="delete">🗑️</td>
      </tr>`;

      return html;
  }
}