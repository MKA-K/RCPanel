$("header").addClass("ready");
$("footer").addClass("ready");
var elements;

document.addEventListener("DOMContentLoaded", function() {
    var audio = new Audio('/sound/expand.wav');
    audio.play();
    setTimeout(function() {
        document.getElementById("loading").style.display = "none";
    }, 2000);  
});

function activateButton(buttonId) {
    var audio = new Audio('/sound/granted.wav');
    audio.play();
    if (buttonId === 'd1' || buttonId === 'stop1' || buttonId === 'r1') {
        document.getElementById('d1').className = 'octo octo_PASSIVE';
        document.getElementById('stop1').className = 'octo octo_PASSIVE';
        document.getElementById('r1').className = 'octo octo_PASSIVE';
    } else {
        document.getElementById('d2').className = 'octo octo_PASSIVE';
        document.getElementById('stop2').className = 'octo octo_PASSIVE';
        document.getElementById('r2').className = 'octo octo_PASSIVE';
    }
    document.getElementById(buttonId).className = 'octo ' + buttonId;
    console.log(buttonId);
}