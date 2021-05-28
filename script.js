const screens = document.getElementsByClassName("screen");
const questionText = document.querySelector(".question");
const answersBtn = document.getElementsByClassName("answers");
const answersText = document.getElementsByClassName("answers-text");
const loginBtn = document.querySelector(".login-btn");
const userName = document.querySelector(".user-input");
const loginError = document.querySelector(".error");
const welcomeMessage = document.querySelector(".welcome-user-name");
const categoriesBtn = document.getElementsByClassName("category");
const result = document.querySelector(".result");
const phrase = document.querySelector(".phrase");
const resultImage = document.getElementById("image-result");


let repositionedQuestions;
let category;
let rightAnswerPosition;
let answerIsRight;
let rightAnswersCount;
let questionPositions;


for (let i = 1; i <= 3; i++) {
    screens[i].classList.add("hidden");
}


loginBtn.addEventListener('click', function () {
    validateUserName();
});

for (let i = 0; i < categoriesBtn.length; i++) {
    categoriesBtn[i].addEventListener('click', function () {
        category = categories[i];
        showCategory(category);
    });
}

for (let i = 0; i < answersBtn.length; i++) {
    answersBtn[i].addEventListener('click', function () {
        comprobeAnswer(i);
        setTimeout(function () {
            showQuestion(questionPositions[0], category);
        }, 1750);

    });
}

function validateUserName() {
    validUser = !userName.value || userName.value.length < 3
    if (validUser) {
        loginError.innerText = "Your user must have more than 2 characters"
    }
    else {
        hideScreens(0);
        showScreen(1);
        welcomeMessage.innerText = userName.value;
    }
}

function hideScreens(position) {
    if (position != 3) {
        screens[position].classList.add("hide-screen");
        setTimeout(function () {
            screens[position].classList.add("hidden");
            screens[position].classList.remove("hide-screen");
        }, 750);
    }
    else {
        screens[position].classList.add("hidden");
    }
}

function showScreen(position) {
    setTimeout(function () {
        screens[position].classList.remove("hidden");
        screens[position].classList.add("show-screen");
        setTimeout(function () {
            screens[position].classList.remove("show-screen");
        }, 1000);
    }, 1000);
}

function showCategory(category) {
    rightAnswersCount = 0
    questionPositions = [0, 1, 2, 3];
    hideScreens(1);
    hideScreens(3);
    showScreen(2);
    let posibleQuestions = category.questions;
    let valuesPositions = rearrange(posibleQuestions, questionPositions);
    questionPositions = valuesPositions[1];
    repositionedQuestions = valuesPositions[0];
    showQuestion(questionPositions[0], category);
}

function rearrange(posibleValues, positions) {
    let reorderedValues = [];
    positions.sort(function () { return Math.random() - 0.5 });
    for (const j in posibleValues) {
        reorderedValues[j] = posibleValues[positions[j]];
    }
    let valuesPositions = [reorderedValues, positions]
    return valuesPositions;
}

function showQuestion(questionPosition, category) {
    if (category.questions[questionPosition]) {
        questionText.innerText = category.questions[questionPosition];
        let answersPositions = [0, 1, 2];
        let posibleAnswers = category.answers[questionPosition];
        let repositionedAnswers = rearrange(posibleAnswers, answersPositions)[0];
        showAnswers(repositionedAnswers, questionPosition, category);
        repositionedQuestions.shift();
        questionPositions.shift();
    }
    else {
        hideScreens(2);
        showScreen(3);
        changeResult();
    }
}

function showAnswers(answers, questionPosition, category) {
    for (let k = 0; k < answers.length; k++) {
        if (answers[k] === category.answers[questionPosition][0]) {
            rightAnswerPosition = k;
        }
        answersText[k].innerText = answers[k];
    }
}

function comprobeAnswer(position) {
    answerIsRight = (position === rightAnswerPosition);
    answersBtn[rightAnswerPosition].classList.add("right-answer");
    if (answerIsRight) {
        rightAnswersCount++;
        setTimeout(function () {
            answersBtn[position].classList.remove("right-answer");
            transitionQuestion(questionText);
            for (let i = 0; i < answersText.length; i++) {
                transitionQuestion(answersText[i]);
            }
        }, 750);
    } else {
        answersBtn[position].classList.add("wrong-answer");
        setTimeout(function () {
            answersBtn[rightAnswerPosition].classList.remove("right-answer");
            answersBtn[position].classList.remove("wrong-answer");
            transitionQuestion(questionText);
            for (let i = 0; i < answersText.length; i++) {
                transitionQuestion(answersText[i]);
            }
        }, 750);
    }
}

function transitionQuestion(element) {
    if(questionPositions){
        element.classList.add("hide-question");
        setTimeout(function () {
            element.classList.remove("hide-question")
        }, 1000);
    }
}

function changeResult() {
    if (rightAnswersCount > 2) {
        result.innerText = "Congrats " + userName.value + "! you won";
        resultImage.src = "Images/win.png";
    }
    else {
        result.innerText = "Maybe next time " + userName.value + ", you lost";
        resultImage.src = "Images/lose.png";
    }
    phrase.innerText = resultMessages[rightAnswersCount];
}