class Calculator {
  constructor(id, cont) {
    i++;
    this.id = id + i;
    this.interface = getInterface();
    this.cont = cont;
    this.screen = null;
    this.secondaryScreen = null;
    this.memory = null;
    this.operation = null;
  }

  render() {
    let el = document.createElement("div");
    el.classList.add("calculator");
    el.id = this.id;
    el.innerHTML = this.interface;
    this.cont.appendChild(el);
    this.screen = el.querySelectorAll(".value")[1];
    this.secondaryScreen = el.querySelector(".secondaryscreen");
    let buttons = el.querySelectorAll(".button");

    buttons.forEach(i => {
      i.addEventListener("click", () => {
        this.action(i.dataset.fnc, screen);

      })
    });
  }

  action(data) {

    switch (data) {

      case "ac":
      this.clear();
      break;

      case "backspase":
        if (this.memory !== "err") {
          this.toRemove();
        }


        break;

      case "%":
        if (this.memory !== "err") {
          this.percent(data);
        }
        break;

      case "×":
      case "÷":
      case "-":
      case "+":
        if (this.memory !== "err") {
          this.actionMatch(data);
        }
        break;


      case ".":
        if (this.memory !== "err") {
          this.spot(data);
        }
        break;

      case "=":
        if (this.memory !== "err") {
          this.equal(data);
        }
        break;

      default:
        if (this.memory !== "err") {
          this.writeNumber(data);
        }
        break;

    }

  }
  actionMatch(data) {

    if (this.operation) {

      this.memory = this.calculate(this.memory, +this.screen.innerText, this.operation);
      this.operation = data;
      this.secondaryScreen.innerText = this.memory + this.operation
      this.screen.innerText = 0;

    } else {

      this.memory = +this.screen.innerText;
      this.operation = data;
      this.screen.innerText = 0;
      this.secondaryScreen.innerText = this.memory + this.operation;

    }

  }

  writeNumber(data) {
    if (this.screen.innerText.length < 5) {

      if (this.screen.innerText === "0") {
        this.screen.innerText = data;
      } else {
        this.screen.innerText = this.screen.innerText + data;
      }
    }

  }

  spot(data) {
    if (this.screen.innerText.indexOf(".") === -1) {
      this.screen.innerText += ".";
    }

  }

  percent() {
    if(this.operation){
      let perc = (this.memory/100)*(+this.screen.innerText);
      this.screen.innerText = perc; 
    }
    else{
      this.screen.innerText = +this.screen.innerText/100;
    }

  }

  toRemove() {
    if (this.screen.innerText.length === 1) {
      this.screen.innerText = 0;

    }
    else {
      this.screen.innerText = this.screen.innerText.slice(0, -1);
    }

  }

  clear() {

    this.screen.innerText = 0;
    this.memory = 0;
    this.operation = 0;
    this.secondaryScreen.innerText = "";

  }

  equal(data) {

    if (this.operation && this.operation !== "=") {
      this.screen.innerText = this.calculate(this.memory, +this.screen.innerText, this.operation);
      this.operation = null;
      this.memory = null;

    }

  };


  calculate(x, y, op) {
    x=x*1e6;
    y=y*1e6;
    switch (op) {
      case "+":

        return (x + y)/1e6;
      case "-":

        return (x - y)/1e6;
      case "÷":
        if (y === 0) {
          return "err"
        } else { return x / y }
      case "×":

        return ((x * y)/1e6)/1e6;

      default:
        break;
    }
  }
}
let i = 0;