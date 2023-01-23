let chars;
var url = "utils.js";
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
        var word_array = word.split("");
        var word_size = word_array.length;
    
        createWord(word_array);
    });
    

    function createWord(word_array) {
        for (let i = 0; i < word_array.length; i++) {
            $(".main").append(`<div class="character" id="${i}"></div>`);
            createCharacter(characters[word_array[i]], i);
        }
    }
  
    function createCharacter(character_matrix, word_position) {
        for (let j = 0; j < character_matrix.length; j++) {
            for (let k = 0; k < character_matrix.length; k++) {
                if (character_matrix[j][k] == 1){
                    $(`#${word_position}.character`).append(`<div class="casilla" style="background-color:tomato;" id="${k}"><b>${character_matrix[j][k]}</b></div>`);
                } else {
                    $(`#${word_position}.character`).append(`<div class="casilla" id="${k}"></div>`);
                }
            } 
        }
        $(".character").css({ "width": `${character_matrix.length * 25}`, "height": `${character_matrix.length * 25}`, "grid-template-columns": `repeat(${character_matrix.length}, 1fr)`, "grid-template-rows": `repeat(${character_matrix.length}, 1fr)` });
    }

    function changeWordSize() {
        
    }
});

  