/* JS Calc/
/*********/

// Setup DOM objects
const form = document.getElementById("calcForm");
const output = document.getElementById("output");
const operandBtns = document.querySelectorAll("button[data-type=operand]");

// Disable default submit action
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Take input and display it
let isOperator = false;
operandBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
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
