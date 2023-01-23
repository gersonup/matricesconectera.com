let chars;
var url = "utils.js";
let word = [];
$.getScript(url, function(){
    $(document).ready(function(){
        chars = characters;
    });
});

$(document).ready(function(){
    
    $("#word").change(function(e) {
        e.preventDefault();
        $(".main").empty();

        let word = $("#word").val();
        word = word.toUpperCase();
        let word_array = word.split("");
        let wordMatrix = createWord(word_array);
        printWord(wordMatrix);
    });
    

    function createWord(word_array) {
        for (let i = 0; i < word_array.length; i++) {
            let char = word_array[i];
            word.push(characters[""+char+""]);  
        }
        return word
    }

    function changeWordSize() {
        
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
                html += '</div>';   
            }
            html += '</div>';
        }

        $(".main").append(html);
    }
    
});

  