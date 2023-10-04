import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import './components.js';
import './buttons.js';

class TallyApp extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
      background-color: #2F5061
    }

    h1 {
      font-size: 50px;
      margin: 0;
      margin-bottom: 20px;
      color:#F4EAE6;
    }
  `;

  static properties = {
    counter: { type: Number },
  };

  constructor() {
    super();
    this.counter = 0; // Initial counter value
  }

  incrementCounter() {
    if (this.counter < 10) {
      this.counter++;
      this.requestUpdate(); // Request update to reflect the new counter value
    }
  }

  decrementCounter() {
    if (this.counter > -5) {
      this.counter--;
      this.requestUpdate(); 
    }
  }

  render() {
    return html`
      <div class="container">
        <h1>Tally App</h1>
        <counter-component .counter=${this.counter}></counter-component>
        <buttons-component
          @decrement=${this.decrementCounter.bind(this)}
          @increment=${this.incrementCounter.bind(this)}
        ></buttons-component>
      </div>
    `;
  }
}

customElements.define('tally-app', TallyApp);