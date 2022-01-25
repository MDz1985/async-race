import './button.scss';

export class Button {
  // private color: color;
  // private innerText: string;
  // private buttonElement?: HTMLButtonElement;
  //
  // constructor(color: color, innerText: string, onClickFunction: () => void) {
  //   this.color = color;
  //   this.innerText = innerText;
  // }

  createReadyButtonElement(innerText: string, onClickFunction?: () => void): HTMLButtonElement {
    const newButtonElement = document.createElement('button');
    newButtonElement.innerText = innerText;
    newButtonElement.className = `button ${innerText}`;
    if (onClickFunction) {
      newButtonElement.addEventListener('click', onClickFunction);
    }
    return newButtonElement;
  }

  // private setColor() {
  //   this.createElement();
  //   const newButton = this.buttonElement as HTMLElement;
  //   newButton.style.color = this.color;
  //   return newButton;
  // }

  // returnReadyButtonElement() {}
}
