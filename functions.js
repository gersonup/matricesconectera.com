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
        let html = "";
        for (let i = 0; i < word.length; i ++) {
            html += '<div class="caracter">';
            console.log(word[i]);
            for (let j = 0; j < word[j].length; j ++ ) {
                
            }
        }
    }
    
});

  