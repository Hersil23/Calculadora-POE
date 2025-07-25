document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calcForm");
  const num1 = document.getElementById("num1");
  const num2 = document.getElementById("num2");
  const operation = document.getElementById("operation");
  const resultado = document.getElementById("resultado");
  const errorMsg = document.getElementById("errorMsg");
  const limpiarBtn = document.getElementById("limpiarBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const val1 = parseFloat(num1.value);
    const val2 = parseFloat(num2.value);

    if (isNaN(val1) || isNaN(val2)) {
      errorMsg.classList.remove("hidden");
      resultado.value = "";
      return;
    }

    errorMsg.classList.add("hidden");

    let res;
    switch (operation.value) {
      case "sumar":
        res = val1 + val2;
        break;
      case "restar":
        res = val1 - val2;
        break;
      case "multiplicar":
        res = val1 * val2;
        break;
      case "dividir":
        res = val2 !== 0 ? val1 / val2 : "Error: División por cero";
        break;
    }

    resultado.value = res;
  });

  limpiarBtn.addEventListener("click", () => {
    num1.value = "";
    num2.value = "";
    resultado.value = "";
    errorMsg.classList.add("hidden");
  });
});