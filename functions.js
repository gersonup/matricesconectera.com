var patterns = new Object();
var size = 5;
var word = "ABCYR";

// Llamar el objeto del alfabeto que esta en otro archivo.
let url = "utils.js";

$.getScript(url, function(){
    patterns = characters;
    $(document).ready(function(){

        /* Inicializa la matriz */
        function fillMatrix(size) {
            let matrixChars = new Array();
            for (let i = 0; i < size; i++) {
                matrixChars[i] = new Array();
                for (let j = 0; j < size; j++) {
                    matrixChars[i][j] = 0;
                }
            }
            return matrixChars;
        }

        /* Obtiene la palabra y la convierte en  */
        function writeWord(word) {
            
            let wordArray = word.split("");
            let wordMatrix = new Array();

            for (let i = 0; i < wordArray.length; i++) {
                let patternsChar = patterns[wordArray[i]];
                let charMatrix = fillMatrix(size);

                for (const key in patternsChar) {
                    const axis = key.includes("x")?"x":"y";
                    const position = key.includes("100") ? 100 : (key.includes("50")? 50: 0);
                    charMatrix = resolvePattern(patternsChar[key],size,axis,position, charMatrix);
                }

                wordMatrix[i] = charMatrix;
            }

            return wordMatrix;

        }
        
    }
  
    function printWord(word) {
        $("main").empty();
        let html = "";
        for (let i = 0; i < word.length; i ++) {
            html += '<div class="caracter">';
            console.log(word[i]);
            for (let j = 0; j < word[i].length; j ++ ) {
                html += '<div class="casilla"></div>';
                for ( let k = 0; k < word[i][j]; k++) {
                    if (word[i][j] == 0) {
                        html += '<div class="casilla"></div>';
                    } else {
                        html += '<div class="casilla">'+word[i][j]+'</div>';
                    }
                }

                return matrix;
            }
            html += '</div>';
        }

        $(".main").append(html);
    }
    
});

  