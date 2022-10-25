export class Keyboard {
  #swichEl;
  #fontSelectEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#swichEl = document.getElementById("switch");
    this.#fontSelectEl = document.getElementById("font");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", (event) => {
      document.documentElement.setAttribute(
        "theme",
        event.target.checked ? "dark-mode" : ""
      );
      console.log(event.target.checked);
    });
    this.#fontSelectEl.addEventListener("change", (event) =>{
        document.body.style.fontFamily = event.target.value;
        console.log(event.target.value);
    })
  }
}
