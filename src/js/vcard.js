export default function virtualCard() {
  const cardNumberInput = document.querySelector("#card_number");
  const cardOwnerInput = document.querySelector("#card_owner");
  const cardMonthInput = document.querySelector("#card_month");
  const cardYearInput = document.querySelector("#card_year");
  const cardCvvInput = document.querySelector(".card_cvv");

  const virtualCardTextArea = document.querySelector("#vcard");
  const virtualCardHolderInput = document.querySelector("#card_owner");
  const virtualCardDateMonth = document.querySelector(".vcard_date_month");
  const virtualCardDateYear = document.querySelector(".vcard_date_year");
  const virtualCardHolder = document.querySelector(".vcard_holder");
  const virtualCardCvv = document.querySelector("#vcard_cvv");



  cardNumberInput.focus();

  cardNumberInput.addEventListener("input", (event) => {
    let target = event.target,
      position = target.selectionEnd,
      length = target.value.length;
    if (event.inputType === "deleteContentBackward") {
      const newInputValue =
        cardNumberInput.value.slice(0, target.selectionEnd) +
        "" +
        cardNumberInput.value.slice(target.selectionEnd);
      const newVirtualCardValue =
        virtualCardTextArea.textContent.slice(0, target.selectionEnd) +
        "" +
        virtualCardTextArea.textContent.slice(target.selectionEnd + 1);
      virtualCardTextArea.textContent = newVirtualCardValue;
      cardNumberInput.value = newInputValue;
      return;
    }

    cardNumberInput.value = cardNumberInput.value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();

    target.selectionEnd = position +=
      target.value.charAt(position - 1) === " " &&
      target.value.charAt(length - 1) === " " &&
      length !== target.value.length
        ? 1
        : 0;
    if (cardNumberInput.value) {
      virtualCardTextArea.textContent = cardNumberInput.value
    };
  });

  virtualCardHolderInput.addEventListener("input", () => {
    virtualCardHolderInput.value = virtualCardHolderInput.value
      .replace(/[^a-z\s]+/gi, "")
      .toUpperCase();
    if (virtualCardHolderInput.value) {
      virtualCardHolder.textContent = cardOwnerInput.value;
    } else {
      virtualCardHolder.textContent = "CARD HOLDER";
    }
  });

  cardMonthInput.addEventListener("input", (event) => {
    const item = cardMonthInput;
    const value = Number(item.value);

    validateInput(/\D/g, cardMonthInput);

    switch (true) {
      case value > 12:
        item.value = 12;
        break;
      case value > 1 && value < 10:
        item.value = `0${value}`;
        break;
    }
    if (cardMonthInput.value) {
      virtualCardDateMonth.textContent = cardMonthInput.value;
    } else {
      virtualCardDateMonth.textContent = "MM";
    }
  });

  cardYearInput.addEventListener("input", (event) => {
    validateInput(/\D/g, cardMonthInput);
    if (cardYearInput.value) {
      virtualCardDateYear.textContent = cardYearInput.value;
    } else {
      virtualCardDateYear.textContent = "YY";
    }


  });

  cardCvvInput.addEventListener("input", (event) => {
    validateInput(/\D/, cardCvvInput);
    if (cardCvvInput.value) {
      virtualCardCvv.textContent = cardCvvInput.value;
    }
  });

  virtualCardDateYear.addEventListener("input", () => {
    validateInput(/\D/, virtualCardDateYear);
  });

  function validateInput(validator, input) {
    input.value = input.value.replace(validator, "").trim().toUpperCase();
    return input.value;
  }
}
