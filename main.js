document.addEventListener("DOMContentLoaded", () => { // declaramos el evento DOMContentLoaded para asegurarnos de que el DOM esté completamente cargado antes de ejecutar el código
  const display = document.querySelector("#display");// seleccionamos el input de visualización es decir la pantalla de la calculadora
  const buttons = document.querySelectorAll(".btn"); // seleccionamos todos los botones de la calculadora
  const clearButton = document.querySelector("#clear"); // seleccionamos el botón de limpiar
  const equalsButton = document.querySelector("#equals"); // seleccionamos el botón de igual

  let inputUser = "";// declaramos la variable inputUser para almacenar la entrada del usuario, y lo inicializamos con un string vacío porque al inicio no hay nada escrito en la pantalla de la calculadora

  const updateDisplay = () => { // declaramos la función updateDisplay para actualizar el contenido del input de visualización
    display.value = inputUser;// asignamos el valor de inputUser al input de visualización
  };

  const clearInput = () => { // declaramos la función clearInput para limpiar la pantalla de la calculadora
    inputUser = "";// reiniciamos inputUser a un string vacío
    updateDisplay();// actualizamos la pantalla de la calculadora
  };

  const agregarCaracter = (caracter) => {
    if (inputUser === "Error") inputUser = "";
    inputUser += caracter;
    updateDisplay();
  };

  const evaluarExpresion = () => {
    try {
      const resultado = calcular(inputUser);
      inputUser = resultado.toString();
    } catch {
      inputUser = "Error";
    }
    updateDisplay();
  };

  // 🧠 Función para evaluar la expresión sin eval()
  const calcular = (expresion) => {
    const tokens = expresion.match(/(\d+(\.\d+)?)|[+\-*/]/g);
    if (!tokens) throw new Error("Expresión inválida");

    // Paso 1: Multiplicación y división
    let paso1 = [];
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
      if (token === "*" || token === "/") {
        const anterior = parseFloat(paso1.pop());
        const siguiente = parseFloat(tokens[i + 1]);
        const resultado = token === "*" ? anterior * siguiente : anterior / siguiente;
        paso1.push(resultado.toString());
        i += 2;
      } else {
        paso1.push(token);
        i++;
      }
    }

    // Paso 2: Suma y resta
    let resultadoFinal = parseFloat(paso1[0]);
    for (let j = 1; j < paso1.length; j += 2) {
      const operador = paso1[j];
      const numero = parseFloat(paso1[j + 1]);
      if (operador === "+") resultadoFinal += numero;
      if (operador === "-") resultadoFinal -= numero;
    }

    return resultadoFinal;
  };

  buttons.forEach((button) => {
    const valor = button.textContent;
    if (button.id !== "clear" && button.id !== "equals") {
      button.addEventListener("click", () => agregarCaracter(valor));
    }
  });

  clearButton.addEventListener("click", clearInput);
  equalsButton.addEventListener("click", evaluarExpresion);
});