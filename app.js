document.addEventListener('DOMContentLoaded', () => {
    const wordDisplay = document.getElementById('word-display');
    const keyboard = document.getElementById('keyboard');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');
    const bodyParts = document.querySelectorAll('.body-part');

    const words = ['programacao', 'desenvolvimento', 'internet', 'tecnologia', 'javascript', 'html', 'css', 'backend', 'frontend', 'software'];
    let chosenWord = '';
    let guessedWord = [];
    let incorrectGuesses = 0;
    const maxIncorrectGuesses = bodyParts.length;

    function initializeGame() {
        chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
        guessedWord = Array(chosenWord.length).fill('_');
        incorrectGuesses = 0;

        wordDisplay.textContent = guessedWord.join(' ');
        message.textContent = '';
        restartButton.style.display = 'none';

        bodyParts.forEach(part => part.style.display = 'none');
        createKeyboard();
    }

    function createKeyboard() {
        keyboard.innerHTML = '';
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => handleGuess(letter));
            keyboard.appendChild(button);
        });
    }

    function handleGuess(letter) {
        const buttons = keyboard.querySelectorAll('button');
        const clickedButton = Array.from(buttons).find(btn => btn.textContent === letter);
        clickedButton.disabled = true;

        if (chosenWord.includes(letter)) {
            for (let i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === letter) {
                    guessedWord[i] = letter;
                }
            }
            wordDisplay.textContent = guessedWord.join(' ');

            if (!guessedWord.includes('_')) {
                message.textContent = 'Parabéns, você venceu!';
                message.classList.remove('lose');
                message.classList.add('win');
                endGame();
            }
        } else {
            incorrectGuesses++;
            if (incorrectGuesses <= maxIncorrectGuesses) {
                bodyParts[incorrectGuesses - 1].style.display = 'block';
            }

            if (incorrectGuesses >= maxIncorrectGuesses) {
                message.textContent = `Você perdeu! A palavra era: ${chosenWord}`;
                message.classList.remove('win');
                message.classList.add('lose');
                endGame();
            }
        }
    }

    function endGame() {
        keyboard.querySelectorAll('button').forEach(button => button.disabled = true);
        restartButton.style.display = 'block';
    }

    restartButton.addEventListener('click', initializeGame);

    initializeGame();
});