export default class ItemRenderer {

  constructor(item) {
    this.item = item;
  }

  render() {
    return `<p>${this.item}</p>`;
  } 

  // Call this method with the element created by the render()
  // and it will replace the element with new HTML
  // and call the optional postRender if it exists
  rerender(element) {

    // Find child-index of element in parent ...
    // This feels extremely hacky, but I can't find a way to get at
    // the actual element after an .outerHTML
    const children = element.parentElement.children;
    let index = 0;
    while(index<children.length && children.item(index) != element) {
      index++;
    }

    // replace the HTML
    element.outerHTML = this.render();

    // get at the element 
    const newElement = children.item(index);
    if(this.postRender) {
      this.postRender(newElement);
    }
  }
}