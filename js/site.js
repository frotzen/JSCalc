/* JS Calc/
/*********/

// Setup DOM objects
const form = document.getElementById("calcForm");
const output = document.getElementById("output");
const operandBtns = document.querySelectorAll("button[data-type=operand]");
const operatorBtns = document.querySelectorAll("button[data-type=operator]");

// Disable default submit action
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Take input and display it
let isOperator = false;
operandBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActive();
    if (output.value == "0") {
      output.value = e.target.value;
    } else if (output.value.includes(".")) {
      output.value = output.value + "" + e.target.value.replace(".", "");
    } else if (isOperator) {
      isOperator = false;
      output.value = e.target.value;
    } else {
      output.value = output.value + "" + e.target.value;
    }
  });
});

// Check operator buttons
let equation = [];
operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActive();
    e.currentTarget.classList.add("active");

    switch (e.target.value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break;
      case "negate":
        output.value = parseFloat(output.value) * -1;
        break;
      case "invert":
        output.value = 1 / parseFloat(output.value);
        break;
      case "=":
        equation.push(output.value);
        output.value = eval(equation.join(""));
        equation = [];
        break;
      default:
        let lastItem = equation[equation.length - 1];
        if (["/", "*", "+", "-"].includes(lastItem) && isOperator) {
          equation.pop();
          equation.push(e.target.value);
        } else {
          equation.push(output.value);
          equation.push(e.target.value);
        }
        isOperator = true;
        break;
    }
  });
});

const removeActive = () => {
  operatorBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

/*  REMOVED SweetAlerts
  function displayMessage() {
  let myMessage = document.getElementById("message").value;
  //alert(myMessage);

  Swal.fire({
    backdrop: false,
    title: "App Name",
    text: myMessage,
  });
}
*/
