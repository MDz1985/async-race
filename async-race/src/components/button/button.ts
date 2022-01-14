import { color } from '../../utilites/types';
import { IButton } from '../../utilites/interfaces';

class Button {
  private color: color;
  private innerText: string;
  private buttonElement?: HTMLButtonElement;

  constructor(color: color, innerText: string, onClickFunction: () => void) {
    this.color = color;
    this.innerText = innerText;
  }

  private createElement(): void {
    this.buttonElement = document.createElement('button');
  }

  private setColor() {
    this.createElement();
    const newButton = this.buttonElement as HTMLElement;
    newButton.style.color = this.color;
    return newButton;
  }

  // returnReadyButtonElement() {}
}
