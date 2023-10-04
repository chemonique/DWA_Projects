import { html, css, LitElement } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import './buttons.js';

class CounterComponent extends LitElement {
  static styles = css`
    .counter {
      font-size: 120px;
      text-align: center;
      padding: 30px;
      margin-bottom: 20px;
      background-color:#2F5061;
    }

    .minimum {
      color: #A4031F;
      
    }

    .normal {
      color: #F4EAE6;
      
    }

    .maximum {
      color:  #A4031F;
      
    }

  `;

  static properties = {
    counter: { type: Number },
  };

  constructor() {
    super();
    this.counter = 0; 
  }

  incrementCounter() {
    if (this.counter < 10) {
      this.counter++;
    }
  }

  decrementCounter() {
    if (this.counter > -5) {
      this.counter--;
    }
  }

  render() {
    let counterClass;
    if (this.counter === -5) {
      counterClass = "minimum";
    } else if (this.counter >= 10) {
      counterClass = "maximum";
    } else {
      counterClass = "normal";
    }

    return html`
      <div class="counter ${counterClass}">${this.counter}</div>
      <button  @click=${this.decrementCounter} >-</button>
      <button @click=${this.incrementCounter}>+</button>
    `;
  }
}

customElements.define("counter-component", CounterComponent);
/*<button  @click=${this.decrementCounter} >-</button>
      <button @click=${this.incrementCounter}>+</button>*/