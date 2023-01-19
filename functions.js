$(document).ready(function(){

    let canvas = document.getElementById("my-canvas");

    let ctx = canvas.getContext("2d");
    let message = ["a"];

  const characters = {
    "A": [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
    ],
    "B": [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0]
    ]
  } 

    switch (characters) {
    case "H":
        drawLetter(letterH, x, 0);
        break;
    case "O":
        drawLetter(letterO, x, 0);
        break;
    case "L":
        drawLetter(letterL, x, 0);
        break;
    case "A":
        drawLetter(letterA, x, 0);
        break;
    }
    
    x += letterH[0].length + 1; // Move to the right by the width of the letter plus 1px space
    

    function drawLetter(letter, x, y) {
        for (let i = 0; i < letter.length; i++) {
            for (let j = 0; j < letter[i].length; j++) {
                if (letter[i][j] === 1) {
                    ctx.fillRect(x + j, y + i, 1, 1);
                }
            }
        }
    }


    function drawWord(message){
        for (let i = 0; i < message.length; i++) {
            let matrix = charToMatrix(message[i]);
            drawLetter(matrix, x, 0);
            x += matrix[0].length + 1;
        }
    }
    
    function charToMatrix(char) {
        return font[char.toUpperCase()];
    }

    $(window).on("resize", function() {
        let canvasWidth = $("#miCanvas").width();
        let canvasHeight = $("#miCanvas").height();
        let scaleX = canvasWidth / (10 * 10); // 10 es el tamaño de cada matriz
        let scaleY = canvasHeight / (10 * 10);
    
        ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
    
        // Draw the matrices
        for (let i = 0; i < message.length; i++) {
            let matrix = charToMatrix(message[i]);
            drawLetter(matrix, x, 0);
            x += matrix[0].length + 1;
        }
    });
    
});