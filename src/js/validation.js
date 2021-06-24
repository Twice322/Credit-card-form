export default function validate() {
  const cardNumberInput = document.querySelector("#card_number");
  const cardOwnerInput = document.querySelector("#card_owner");
  const cardMonthInput = document.querySelector("#card_month");
  const cardYearInput = document.querySelector("#card_year");
  const cardCvvInput = document.querySelector(".card_cvv");
  const inputs = document.querySelectorAll("input");
  const submitBtn = document.querySelector(".submit_btn");
  const form = document.querySelector("form");
  const CURRENT_DATE = new Date(Date.now());

  let errors = 0;

  deleteErrors();
  inputs.forEach((input) => {
    if (!input.value) {
      input.parentNode.insertAdjacentHTML(
        "beforeend",
        `
                  <h1 class='text-error'>${input.name} is required</h1>
              `
      );
      input.classList.add("error");
      errors++;
    } else if (input.id === "card_year") {
      checkValidDate(input);
    } else if (input.classList.contains("card_number")) {
      matchCard(cardNumberInput.value.split(" ").join(""), cardNumberInput);
    } else {
      input.classList.remove("error")

    }
  });

  function deleteErrors() {
    const errors = document.querySelectorAll(".text-error");
    errors.forEach((error) => {
      error.remove();
    });
  }

  function checkValidDate(input) {
    if (input.value && input.value < CURRENT_DATE.getFullYear() % 100) {
      input.classList.add("error");
      input.parentNode.insertAdjacentHTML(
        "beforeend",
        `
            <h1 class='text-error'>Your card is not valid</h1>`
      );
      errors++;
    } else {
      input.classList.remove("error");

    }
  }

  function matchCard(cardNumber, input) {
    if (cardNumber.match(/^4[0-9]{12}(?:[0-9]{3})?$/)) {
      input.classList.remove("error");
    } else if (cardNumber.match(/^5[1-5][0-9]{14}$/)) {
      input.classList.remove("error");
    } else if (cardNumber.match(/^3[47][0-9]{13}$/)) {
      input.classList.remove("error");
    } else if (cardNumber.match(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/)) {
      input.classList.remove("error");
    } else {
      input.classList.add("error");
      input.parentNode.insertAdjacentHTML(
        "beforeend",
        `
            <h1 class='text-error'>Your card number is not valid</h1>`
      );
      errors++;
    }
  }

  return errors;
}
