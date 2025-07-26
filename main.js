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

  const agregarCaracter = (caracter) => {// declaramos la función agregarCaracter para agregar un caracter a la entrada del usuario
    if (inputUser === "Error") inputUser = "";// ejecutamos un condicional para verificar si inputUser es igual a "Error", si es así, reiniciamos inputUser a un string vacío
    inputUser += caracter;// concatenamos el caracter recibido a inputUser
    updateDisplay();// actualizamos la pantalla de la calculadora
  };

  const evaluarExpresion = () => {// declaramos esta funcion para evaluar lo que ingrese el usuario
    try { // creamos un bloque try para ejecutar el codigo y determinar si hay errores
      const resultado = calcular(inputUser); // llamamos a la funcion calcular el con el parametro inputUser para evaluar lo que escribe o ingresa el usuario
      inputUser = resultado.toString();// con el metodo toString() convertimos el resultado a un string y lo asignamos a inputUser
    } catch {// creamos un bloque catch para capturar cualquier error que ocurra en el try
      inputUser = "Error";// si ocurre un error, asignamos "Error" a inputUser
    }
    updateDisplay();// y se actualiza la pantalla de la calculadora con el resultado o el error
  };

 
  const calcular = (expresion) => {// declaramos la funcion calcular que recibe una expresión matemática como parámetro
    const tokens = expresion.match(/(\d+(\.\d+)?)|[+\-*/]/g);// (no hemos visto todavia expresiones regulares, pero la revise ya que si las conocia del curso 20, en esta ocacion usamos una expresión regular para dividir la expresión en números y operadores. La expresión busca números enteros o decimales y los operadores +, -, *, /), cada parte de la expresion tiene una funcion especifica, /../ delimita la funcion, \d+ busca numeros de 1 o mas digitos, (\.\d+)? busca numeros decimales, | es un operador que significa "o", y [+\-*/] busca los operadores matemáticos, g al final indica que se debe buscar globalmente en toda la cadena que escribe el usuario.
    if (!tokens) throw new Error("Expresión inválida");// si no hay tokens, lanzamos un error indicando que la expresión es inválida


    let paso1 = []; // declaramos un array paso1 para almacenar los resultados de las operaciones de multiplicación y división
    let i = 0; // inicializamos un contador i en 0 para recorrer los tokens
    while (i < tokens.length) {// con un bucle while recorremos los tokens mientras i sea menor que la longitud de tokens
      const token = tokens[i];// obtenemos el token actual
      if (token === "*" || token === "/") {// se evalua si es el operador de multiplicación o división
        const anterior = parseFloat(paso1.pop()); // declaramos una variable anterior que almacena el último número del array paso1 convertido a un número flotante con parseFloat, y lo eliminamos del array paso1 con el método pop(), con la finalidad de que no se repita el mismo número en la siguiente operación
        const siguiente = parseFloat(tokens[i + 1]); // declaramos una variable siguiente que almacena el siguiente token convertido a un número flotante
        const resultado = token === "*" ? anterior * siguiente : anterior / siguiente; // declaramos una variable resultado que almacena el resultado de la operación, si el token es "*" multiplicamos anterior por siguiente, si es "/" dividimos anterior entre siguiente
        i += 2;// incrementamos i en 2 para saltar al siguiente token después del operador con el fin de que no se repita el mismo número en la siguiente operación
      } else {//
        paso1.push(token);// si el token no es un operador de multiplicación o división, lo agregamos al array paso1
        i++;// incrementamos i en 1 para pasar al siguiente token
      }
    }


    let resultadoFinal = parseFloat(paso1[0]);// declaramos una variable resultadoFinal que almacena el primer número del array paso1 convertido a un número flotante con parseFloat, este será el resultado inicial de la operación
    for (let j = 1; j < paso1.length; j += 2) {// iniciamos un bucle for para recorrer el array paso1 a partir del segundo elemento, incrementando j en 2 para saltar al siguiente operador
      const operador = paso1[j];// declaramos una variable operador que almacena el operador actual
      const numero = parseFloat(paso1[j + 1]);// declaramos una variable numero que almacena el siguiente número convertido a un número flotante con parseFloat y el array [j +1] se usa para acceder al siguiente número después del operador
      if (operador === "+") resultadoFinal += numero;// con el condicional if verificamos si el operador es "+", si es así, sumamos el número al resultadoFinal
      if (operador === "-") resultadoFinal -= numero;// con el condicional if verificamos si el operador es "-", si es así, restamos el número al resultadoFinal
    }

    return resultadoFinal;// este retur devuelve el resultadoFinal, que es el resultado  de la operacion matematica que ingreso el usuario
  };

buttons.forEach((button) => {// con este bucle forEach recorremos todos los botones de la calculadora
  const valor = button.textContent.trim();//  con el método trim eliminamos espacios invisibles del texto del botón actual
  if (button.id !== "clear" && button.id !== "equals") {// con esta condicional verificamos si el botón no es el botón de limpiar o el botón de igual
    button.addEventListener("click", () => agregarCaracter(valor));// agregamos un evento click al botón actual que llama a la función agregarCaracter
  }
});

  clearButton.addEventListener("click", clearInput);// agregamos un evento click al botón de limpiar que llama a la función clearInput para limpiar la pantalla de la calculadora cuando el usuario haga click en el botón de limpiar
  equalsButton.addEventListener("click", evaluarExpresion);// agregamos un evento click al botón de igual que llama a la función evaluarExpresion para evaluar la expresión matemática ingresada por el usuario cuando haga click en el botón de igual
});