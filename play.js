$(document).ready(function() {
    var id = "#dialog";

    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set heigth and width to mask to fill up the whole screen
    $("#mask").css({ width: maskWidth, height: maskHeight });

    //transition effect
    $("#mask").fadeIn(500);
    $("#mask").fadeTo("slow", 0.9);

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();

    //Set the popup window to center
    $(id).css("top", winH / 2 - $(id).height() / 2);
    $(id).css("left", winW / 2 - $(id).width() / 2);

    //transition effect
    $(id).fadeIn(2000);

    //if close button is clicked
    $(".window .close").click(function(e) {
        //Cancel the link behavior
        e.preventDefault();

        $("#mask").hide();
        $(".window").hide();
    });

    //if mask is clicked
    $("#mask").click(function() {
        $(this).hide();
        $(".window").hide();
    });
});

// var _ = require('underscore');
var qna = [{
        question: "The percentage of irrigated land in India is about",
        opA: "45",
        opB: "65",
        opC: "35",
        opD: "25",
        correct: "C",
    },
    {
        question: "The Yarlung Zangbo river, in India, is known as",
        opA: "Ganga",
        opB: "Indus",
        opC: "Brahmputra",
        opD: "Mahanadi",
        correct: "C",
    },
    {
        question: "The state having a largest area of forest cover in India is  ",
        opA: "Arunachal Pradesh",
        opB: "Assam",
        opC: "Madhya Pradesh",
        opD: "Haryana",
        correct: "C",
    },
    {
        question: "The only state in India that produces saffron is",
        opA: "Assam",
        opB: "Jammu & Kashmir",
        opC: "Punjab",
        opD: "Uttrakhand",
        correct: "B",
    },
    {
        question: "Which of the following crops needs maximum water per hectare?",
        opA: "Barley",
        opB: "Maize",
        opC: "Wheat",
        opD: "Sugarcane",
        correct: "D",
    },
    {
        question: "The ratio of width of our National flag to its length is",
        opA: "2:3",
        opB: "3:2",
        opC: "2:4",
        opD: "3:4",
        correct: "A",
    },
    {
        question: "Who among the following known as Pocket Hercules? ",
        opA: "Mike Tyson",
        opB: "Manhoar Aich",
        opC: "Manotosh Roy",
        opD: "Muhammad Ali",
        correct: "B",
    },
    {
        question: "The first Women External Affair Minister of India was:",
        opA: "Sushma Swaraj",
        opB: "Jayalalitha",
        opC: "Prathibha Patil",
        opD: "Indira Gandhi",
        correct: "D",
    },
    {
        question: "In what year was Rajiv Gandhi assassinated?",
        opA: "1990",
        opB: "1991",
        opC: "1992",
        opD: "1993",
        correct: "B",
    },
    {
        question: " In what year did Sonia Gandhi received Citizenship of India?",
        opA: "1984",
        opB: "1982",
        opC: "1985",
        opD: "1981",
        correct: "A",
    },
];
var userScore = 0;
var userName;

function checkName() {
    if (document.getElementById("uName").value == "") {
        alert("Please input your name");
        location.href = "./play.html";
    }
}

function getName() {
    checkName();
    document.getElementById("player").innerText =
        document.getElementById("uName").value;
    userName = document.getElementById("player").innerText;
    startGame(0);
    console.log(userName);
}

function goHome() {
    location.href = "index.html";
}

var i = 0;
var random = getRanArr(qna.length);

function getRanArr(lngth) {
    let arr = [];
    do {
        let ran = Math.floor(Math.random() * lngth);
        arr = arr.indexOf(ran) > -1 ? arr : arr.concat(ran);
    } while (arr.length < lngth)

    return arr;
}


function startGame(i) {
    if (i == qna.length) {
        let game = `<div class="result-sec">
        <p> <span id="player">${userName}</span> </p>
        <p>Score : <span id="score">${userScore}</span></p>
    </div>`;
        document.getElementById("play-sec").innerHTML = game;
        if (localStorage.getItem('itemsJson') == null) {

            itemJsonArray = [];
            itemJsonArray.push([userName, userScore]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        } else {
            itemJsonArrayStr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            itemJsonArray.push([userName, userScore]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        }


    }
    let game = `<p id="ques">${qna[random[i]].question}</p>
    <div class="answer ">
        <button id="A" onclick="check(this.id) ">${qna[random[i]].opA}</button>
        <button id="B" onclick="check(this.id) ">${qna[random[i]].opB}</button>
        <button id="C" onclick="check(this.id) ">${qna[random[i]].opC}</button>
        <button id="D" onclick="check(this.id) ">${qna[random[i]].opD}</button>
    </div>`;
    let score = `<p>Score : <span id="score">${userScore}</span></p>
    <p>Welcome, <span id="player">${userName}</span> </p>`;
    document.getElementById("res-sec").innerHTML = score;

    var sGame = document.getElementById("sGame");
    sGame.innerHTML = game;
}

function check(clicked) {
    var choice = JSON.stringify(clicked);
    var correct = JSON.stringify(qna[random[i]].correct);
    console.log(correct);
    console.log(choice);

    var compare = correct.localeCompare(choice);
    console.log(compare);

    if (compare == 0) {
        userScore += 5;
    } else {
        userScore -= 2;
    }
    i++;
    startGame(i);
}