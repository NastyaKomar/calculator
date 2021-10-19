const showButton = document.querySelector(".showCalc");
const box = document.querySelector(".hyu");
showButton.addEventListener("click", () => {

    let calc = new Calculator("calc", box, removeCalc);
    calc.render();
    console.log(calc);

    // let el = document.createElement("div");
    // el.innerHTML = getInterface("asdfghj");
    // box.append(el);



});

const button = document.querySelector (".close");

function removeCalc(elem) {

    box.removeChild(elem);


    
}
