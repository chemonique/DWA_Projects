import { css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class ButtonsComponent extends LitElement {
  static styles = css`
    .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
    }

    button {
      font-size: 50px;
      margin: 0 5px;
      padding: 0px 20px;
      border-radius: 20px;
      background-color: #5DCBBA; /* Blue 
      color: white;
      border: none;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #4FAEA0; /* Darker Blue 
    }

    button:active {
      background-color: #409084; /* Even Darker Blue 
    }
  `;

  constructor() {
    super();
    this.addEventListener("click", this.handleClick);
  }

  handleClick(event) {
    const target = event.target;
    if (target.tagName === "BUTTON") {
      const action = target.textContent;
      if (action === "-") {
        this.dispatchEvent(new CustomEvent("decrement"));
      } else if (action === "+") {
        this.dispatchEvent(new CustomEvent("increment"));
      }
    }
  }
 
  
}

customElements.define('buttons-component', ButtonsComponent);