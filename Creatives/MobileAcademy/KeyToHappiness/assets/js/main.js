
document.addEventListener('DOMContentLoaded', function() {

    var min = 123
    var max = 456;
    var randomNumber = Math.floor(Math.random() * (max - min)) + min;
    document.getElementById("count").innerHTML = randomNumber;

    var counter = setInterval(function() {
        randomNumber = randomNumber + 1;
        document.getElementById("count").innerHTML = randomNumber;
    }, 2000);

}, false);
