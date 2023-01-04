/* JS Calc/
/*********/

// Setup DOM objects
const form = document.getElementById("calcForm");
const output = document.getElementById("output");
const operandBtns = document.querySelectorAll("button[data-type=operand]");
const operatorBtns = document.querySelectorAll("button[data-type=operator]");
let isOperator = false;
let equation = [];

// Disable default submit action
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Clear active button state
const removeActive = () => {
  operatorBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

// Setup EventListener to catch "clicks" and process operands
operandBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActive();
    if (output.value == "0") {
      output.value = e.target.value;
    } else if (output.value.includes(".") && !isOperator) {
      output.value = output.value + "" + e.target.value.replace(".", "");
      console.log(output.value);
    } else if (output.value.includes(".") && isOperator) {
      isOperator = false;
      output.value = e.target.value;
    } else if (isOperator) {
      console.log("HIT isOperator");
      isOperator = false;
      output.value = e.target.value;
    } else {
      output.value = output.value + "" + e.target.value;
    }
    console.log(isOperator, btn);
  });
});

// Setup EventListener for operators
operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActive();
    e.currentTarget.classList.add("active");
    switch (e.target.value) {
      // Special cases that only require immediate processing
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
      // Normal case for processing equation accumulator
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
