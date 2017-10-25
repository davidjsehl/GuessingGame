function generateWinningNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
    var m = array.length;
    var t;
    var i;

    while(m) {
        //need to grab random element from array
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;


    }
    return array;
}

function Game() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber()
}

Game.prototype.difference = function () {
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function () {
    return this.playersGuess < this.winningNumber;
}


Game.prototype.playersGuessSubmission = function (guess) {
    if (typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw "That is an invalid guess.";
    } else {
        this.playersGuess = guess;
        return this.checkGuess();
    } 
}





Game.prototype.checkGuess = function () {
    if (this.playersGuess === this.winningNumber) {
        $('body').css({'background-image': 'url(winner2.gif)'})
        $('#hint', '#submit').prop("disabled", true);
        $('#subtitle').text("Press the Reset button to play again!");
        return 'You Win!';
    } 
    else {
        if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
            $('#title').text('Guess Again!');
            return 'You have already guessed that number.'
        } 
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if (this.pastGuesses.length === 5) {
                $('body').css({'background-image': 'url(youlose.jpg'});
                $('#title').css({'color': 'white'}); 
                $('#subtitle').css({'color': 'white'});
                $('#hint, #submit').prop("disabled", true);
                $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
            } else {
                var diff = this.difference();
                if (this.isLower()) {
                    $('#subtitle').text('Guess Higher!')
                } else {
                    $('#subtitle').text('Guess Lower!');
                }
                if (diff < 10) {
                    return 'You\'re burning up!';
                } else if (diff < 25) {
                    return 'You\'re lukewarm.';
                } else if (diff < 50) {
                    return 'You\'re a bit chilly.';
                } else {
                    return 'You\'re ice cold!';
                }
            }
        }

    }
}

function newGame() {
    return new Game();
}

Game.prototype.provideHint = function () {
    var hintArray = [];
    hintArray.push(this.winningNumber);
    while (hintArray.length < 3) {
        hintArray.push(generateWinningNumber());
    }
    return shuffle(hintArray);
}

$(document).ready(function () {
    $('#submit').on('click', function () {
        console.log('The button was clicked')
    })
})

function makeAGuess(game) {
    var guess = $('#players-input').val();
    $('#players-input').val('');
    var output = game.playersGuessSubmission(parseInt(guess, 10));
    $('#title').text(output);

}

// function makeAGuess(game) {
//     var guess = +$('#players-input').val();
//     var output = game.playersGuessSubmission(guess);
//     $('#title').text(output);

// }

$(document).ready(function() {
    var game = new Game();

    $('#submit').click(function() {
        makeAGuess(game);
    })

    $('#players-input').keypress(function(event) {
        if (event.which == 13) {
            makeAGuess(game);
        }
    })

    $('#hint').click(function () {
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
    })

    $('#reset').click(function () {
        game = newGame();
        $('body').css({'background-image': 'url(source2.gif)'})
        $('#title').css({'color': 'black'});
        $('#subtitle').css({'color': 'black'});
        $('#title').text('Play The Guessing Game');
        $('#subtitle').text('Guess a number between 1-100');
        $('.guess').text('--')
        $('#hint, #submit').prop('disabled'. false);

    })
})