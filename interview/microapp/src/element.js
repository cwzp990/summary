class MyElement extends HTMLElement {
  static get observedAttributes() {
    return ["name", "url"];
  }

  constructor() {
    super();
  }
}

export function defineElement() {
  if (!window.customElements.get("micro-app")) {
    window.customElements.define("micro-app", MyElement);
  }
}
