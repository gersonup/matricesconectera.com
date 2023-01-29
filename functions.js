var patterns = new Object();
var matrixChars;
var size = 5;
var word = "ABCYR";



// Llamar el objeto del alfabeto que esta en otro archivo.
let url = "utils.js";

$.getScript(url, function(){
    patterns = characters;

    $(document).ready(function(){
        function fillMatrix(size) {
            matrixChars = new Array();
            for (i=0; i<size; i++) {
                matrixChars[i] = new Array();
                for (j=0; j<size; j++) {
                    matrixChars[i][j] = 0;
                }
            }
        }
        function writeWord(word) {
            let charMatrix = new Array();
            let wordArray = new Array();
            wordArray = word.split("");
            for (i=0;i < wordArray.length; i++) {
                charMatrix[i] = getCharPatterns(wordArray[i]);
            }
        }
        
        fillMatrix(size);
        console.log(matrixChars);
        
        function getCharPatterns(char) {
           let pattern = patterns[char];
           console.log(char,pattern);
        
        
        }
        
        function diagonal(){}
        
        writeWord(word);
    });
});
    
