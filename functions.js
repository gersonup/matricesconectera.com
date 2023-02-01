var patterns = new Object();
var size = 7;
var word = "ABCYR";
var space = " ";
var filled = "*";


// Llamar el objeto del alfabeto que esta en otro archivo.
let url = "utils.js";

$.getScript(url, function(){
    patterns = characters;
    $(document).ready(function(){

        /* Draw phrase */

        $("#draw").click(function() { 
            console.log("click draw:")
            word = $("#word").val().toUpperCase();
            size = $("#size").val();

            let matrix = writeWord(word);
            let html = drawHtmlMatrix(matrix);
            $(".main").html(html);
        });
        
    });
});

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

function resolvePattern(pattern, n, axis, position, matrix) {
    if(pattern == '') {
        return matrix;
    }

    let patternArray = new Array();
    
    let n50 = n%2 == 0 ? Math.floor(n/2)+1 : Math.ceil(n/2);

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
    case '-1+all':
        for (let i = 1 ; i < n; i ++) {
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
                    counter = n50;
                    for (let i = n50-1; i < n ; i ++ ) {
                        counter--;
                        counter = counter == -1 ? 0 : counter;
                        matrix[counter][i] = 1;
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
                    counter = n50;
                    for (let i = n50-1; i < n ; i ++ ) {
                        counter--;
                        counter = counter == -1 ? 0 : counter;
                        matrix[i][counter] = 1;
                    } 
                    break;
            }
        }

        return matrix;
    }
    

    return fillCharMatrix(patternArray,axis, position, matrix)
}

function fillCharMatrix(patternResolved, axis, position, matrix) {
    let n = matrix.length;
    let n50 = n%2 == 0 ? Math.floor(n/2) : Math.ceil(n/2)-1;

    if (axis == "y") {
       
        for(let j = 0; j < matrix.length; j ++) {

            if (patternResolved[j] == 0 ) {
                continue;
            }
            
            if (position == 0) {
                matrix[j][0] = patternResolved[j];
            } else if (position == 50) {
                matrix[j][n50] = patternResolved[j];
            } else if (position == 100) {
                matrix[j][n-1] = patternResolved[j];
            }
            
        }
        
    } else if (axis == "x") {
        
        for(let j = 0; j < matrix.length; j ++) {

            if (patternResolved[j] == 0 ) {
                continue;
            }

            if (position == 0) {
                matrix[0][j] = patternResolved[j];
            } else if (position == 50) {
                matrix[n50][j] = patternResolved[j];
            } else if (position == 100) {
                matrix[n-1][j] = patternResolved[j];
            }
            
        }
        
    }

    return matrix;
}

function drawHtmlMatrix(matrix) {
    let html = "";

    for (let p = 0; p < matrix.length; p ++) {
        html += '<pre>'
        for(let i = 0; i < matrix[p].length; i++) {
            for(let j = 0; j < matrix[p][i].length; j++ ) {
                html += matrix[p][i][j]== 0 ? space : filled;
            }
            html += "\n";
        }
        html += '</pre>';
    }

    return html;
}
    
