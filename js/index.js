// expresión regular para letras minúsculas y sin tildes
const validLetters = /^[a-z\s]+$/;

// se obtienen las vistas en html por medio del id
let inputText = document.getElementById("input_text");
let alertLabel = document.getElementById("alert_label");
let btnCopy = document.getElementById("btn_copy");
let btnEncrypt = document.getElementById("btn_encrypt");
let btnDecrypt = document.getElementById("btn_decrypt");
let stateTextInput = document.getElementById("container_no_text");
let stateOutputText = document.getElementById("container_output_text");
let outputMessage = document.getElementById("output_text"); 


// se configura función para la validación del texto entrante
const validInputText = () => {
   let currentMsg = inputText.value; // se obtiene el contenido del textarea

   // se valida la validez de los datos entrantes
   if (currentMsg == ""){ // en caso de que no haya mensaje para encriptar
     stateTextInput.classList.remove("hidden_element");  
     stateOutputText.classList.add("hidden_element")
     inputText.classList.remove("input_text_invalid");
     alertLabel.classList.remove("alert_activated");
     return false;
   }

   // en caso de que se tenga un mensaje diferente a vacío
   stateTextInput.classList.add("hidden_element");
   stateOutputText.classList.remove("hidden_element")

   // se verifica datos validos excritos
   if (validLetters.test(currentMsg)){
      alertLabel.classList.remove("alert_activated")
      alertLabel.classList.add("alert_desactivated");
      inputText.classList.remove("input_text_invalid");
      return true;
   }else{
      alertLabel.classList.remove("alert_desactivated")
      alertLabel.classList.add("alert_activated");
      inputText.classList.add("input_text_invalid");
      return false;
   }

};

// función para encriptar texto
const encryptText = () => {
   // se verifica el texto de entrada
   if (validInputText()){
      let inputMessage = inputText.value;

      // se realiza la encriptación del mensaje
      let keywords = ["e", "i", "a", "o", "u"]; // arreglo con las palabras a buscar
      let keywordsEncrypt = ["enter", "imes", "ai", "ober", "ufat"]; // arreglo con las palabras a encriptar
      let output = "";

      for (let i = 0; i<inputMessage.length; i++){
        let indexKeyword = keywords.indexOf(inputMessage.charAt(i)); // se obtiene el indice de la clave 
        if (indexKeyword >= 0){ // se verifica que exista la letra valida para la encriptación
           output += keywordsEncrypt[indexKeyword];
        }else{
           output += inputMessage.charAt(i);
        }
      }

      outputMessage.value = output;

   }else{
      outputMessage.value = "No hay texto valido para encriptar";
   }
}

// función para desencriptar texto
const decryptText = () => {
   // se verifica el texto de entrada
   if(validInputText()){
      let inputMessage = inputText.value;
      let keywords = ["enter", "imes", "ai", "ober", "ufat"];
      let keywordsDecrypt = ["e", "i", "a", "o", "u"];
      let output = inputMessage;

      // se desencripta el mensaje
      for (let i = 0; i< keywords.length; i++){
        output =  output.split(keywords[i]).join(keywordsDecrypt[i]);
      }

      outputMessage.value = output;

   }else{
       outputMessage.value = "No hay texto válido para desencriptar";
   }
};

// función para copiar el texto desencriptado o encriptado
const copyText  = () => {
   console.log("hola copiando")
   outputMessage.select();
   document.execCommand("copy");
   alert("texto copiado en el portapapeles");
};


// eventos a las etiquetas de html
inputText.addEventListener("keyup", validInputText);
btnEncrypt.addEventListener("click", encryptText);
btnDecrypt.addEventListener("click", decryptText);
btnCopy.addEventListener("click", copyText);