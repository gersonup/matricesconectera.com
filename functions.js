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
        
        fillMatrix(size);
        console.log(writeWord(word));

        function resolvePattern(pattern, n, axis, position, matrix) {
            if(pattern == '') {
                return matrix;
            }

            let patternArray = new Array();
            let n50 = Math.ceil(n/2);

            /* Initial Array */
            for (let i = 0 ; i < n; i ++) {
                patternArray[i] = 0;
            }
            
            switch (pattern) {
            case '+all':
                for (let i = 0 ; i < n; i ++) {
                    patternArray[i] = 1;
                }
                break;
            case '-all':
                break;
            case '+all-1':
                for (let i = 0 ; i < n-1; i ++) {
                    patternArray[i] = 1;
                }
                break;
            case '-1+all-1+all-1':
                for (let i = 1; i < n50-1; i++) {
                    patternArray[i] = 1;         
                }
                for (let i = n50; i < n-1; i++) {
                    patternArray[i] = 1;         
                }
                break;
            case '-1+all-1':
                for (let i = 1 ; i < n-1; i ++) {
                    patternArray[i] = 1;
                }
                break;
            case '-1+1-all+1-1':
                patternArray[n-2] = 1;
                patternArray[1] = 1;
                break;
            case '+1-all+1':
                patternArray[n-1] = 1;
                patternArray[0] = 1;
                break;
            case '+50%':
                for (let i = 0 ; i < n50-1; i ++) {
                    patternArray[i] = 1;
                }
                break;
            case '-all+50%':
                for (let i = n50-1 ; i < n; i ++) {
                    patternArray[i] = 1;
                }
                break;
            case '-1+all-50%':
                for (let i = 1 ; i < n50-1; i ++) {
                    patternArray[i] = 1;
                }
                break;
            }

            if (pattern.includes("x")){
                let counter = 0;



                let xyPatterns = pattern.split(",");

                for (let k = 0 ; k < xyPatterns.length; k++) {
                    switch(xyPatterns[k]) {
                        case '(+x+y)':
                            counter = n50-1;
                            for (let i = n50-1; i < n ; i ++ ) {
                                matrix[counter][i] = 1;
                                counter --;
                            }  
                            break;
                        case '(+x-y)':
                            for (let i = n50-1; i < n ; i ++ ) {
                                matrix[i][i] = 1;
                            }  
                            break;
                        case '(-x+y)':
                            for (let i = 0; i < n50 ; i ++ ) {
                                matrix[i][i] = 1;
                            }
                            break;
                        case '(-x-y)':
                            counter = n50-1;
                            for (let i = n50-1; i < n ; i ++ ) {
                                matrix[i][counter] = 1;
                                counter --;
                            } 
                            break;
                    }
                }

                return matrix;
            }
            

            return fillCharMatrix(patternArray,axis, position, matrix)
        }

        function fillCharMatrix(patternResolved, axis, position, matrix) {
            let n50 = Math.ceil((matrix.length/2))-1;
            let n = matrix.length-1;

            if (axis == "y") {
                for(let i = 0; i < patternResolved.length; i ++) {

                    if (patternResolved[i] == 0 ) {
                        continue;
                    }

                    for(let j = 0; j < matrix.length; j ++) {
                       
                        if (position == 0) {
                            matrix[j][0] = patternResolved[i];
                        } else if (position == 50) {
                            matrix[j][n50] = patternResolved[i];
                        } else if (position == 100) {
                            matrix[j][n] = patternResolved[i];
                        }
                        
                    }
                }
            } else if (axis == "x") {
                for(let i = 0; i < patternResolved.length; i ++) {

                    if (patternResolved[i] == 0 ) {
                        continue;
                    }
                    
                    for(let j = 0; j < matrix.length; j ++) {
                       
                        if (position == 0) {
                            matrix[0][j] = patternResolved[i];
                        } else if (position == 50) {
                            matrix[n50][j] = patternResolved[i];
                        } else if (position == 100) {
                            matrix[n][j] = patternResolved[i];
                        }
                        
                    }
                }
            }

            return matrix;
        }

    });
});
    
