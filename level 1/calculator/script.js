document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  let currentInput = "0";
  let currentOperator = "";
  let prevInput = "";
  let expression = "";
  const MAX_DISPLAY_LENGTH = 24; // Increased to show full expression

  function updateDisplay() {
    // Show full expression
    let displayValue = expression || currentInput;
    
    if (currentOperator) {
      displayValue = `${prevInput} ${currentOperator} ${currentInput}`;
    }

    // Handle long expressions
    if (displayValue.length > MAX_DISPLAY_LENGTH) {
      displayValue = displayValue.slice(-MAX_DISPLAY_LENGTH);
    }

    display.textContent = displayValue;
  }

  function handleDigitClick(digit) {
    if (currentInput.length >= MAX_DISPLAY_LENGTH) return;
    if (
      currentInput === "0" ||
      currentInput === "Error" ||
      currentInput === "Infinity" ||
      currentInput === "-Infinity"
    ) {
      currentInput = digit;
    } else {
      currentInput += digit;
    }
    updateDisplay();
  }

  function handleOperatorClick(operator) {
    if (currentInput === "Error") return;
    if (prevInput && currentOperator) {
      handleEqualsClick();
    }
    prevInput = currentInput;
    currentInput = "0";
    currentOperator = operator;
    updateDisplay();
  }

  function handleEqualsClick() {
    if (currentInput === "Error" || !currentOperator) return;

    const prev = parseFloat(prevInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
      currentInput = "Error";
      expression = "";
      updateDisplay();
      return;
    }

    try {
      // Store the full expression before calculation
      expression = `${prevInput} ${currentOperator} ${currentInput} = `;
      
      switch (currentOperator) {
        case "+":
          currentInput = prev + current;
          break;
        case "-":
          currentInput = prev - current;
          break;
        case "*":
          currentInput = prev * current;
          break;
        case "/":
          if (current === 0) {
            throw new Error("Division by zero");
          }
          currentInput = prev / current;
          break;
        default:
          currentInput = "Error";
      }

      if (!isFinite(currentInput)) {
        throw new Error("Invalid result");
      }

      // Add result to expression
      expression += currentInput;

    } catch (error) {
      currentInput = "Error";
      expression = "";
    }

    currentOperator = "";
    prevInput = "";
    updateDisplay();
  }

  function clear() {
    currentInput = "0";
    currentOperator = "";
    prevInput = "";
    expression = "";
    updateDisplay();
  }

  // Add event listeners to digit buttons
  for (let i = 0; i <= 9; i++) {
    document.getElementById(i.toString()).addEventListener("click", () => {
      handleDigitClick(i.toString());
    });
  }

  // Add event listeners to operator buttons
  document.getElementById("add").addEventListener("click", () => handleOperatorClick("+"));
  document.getElementById("subtract").addEventListener("click", () => handleOperatorClick("-"));
  document.getElementById("multiply").addEventListener("click", () => handleOperatorClick("*"));
  document.getElementById("divide").addEventListener("click", () => handleOperatorClick("/"));

  // Add event listeners to other buttons
  document.getElementById("decimal").addEventListener("click", () => {
    if (currentInput === "Error") return;
    if (!currentInput.includes(".") && currentInput.length < MAX_DISPLAY_LENGTH) {
      currentInput += ".";
      updateDisplay();
    }
  });

  document.getElementById("equals").addEventListener("click", handleEqualsClick);
  document.getElementById("clear").addEventListener("click", clear);

  document.getElementById("backspace").addEventListener("click", () => {
    if (currentInput === "Error") {
      clear();
      return;
    }
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "" || currentInput === "-") {
      currentInput = "0";
    }
    updateDisplay();
  });

  updateDisplay();
});