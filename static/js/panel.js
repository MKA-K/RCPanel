$("header").addClass("ready");
$("footer").addClass("ready");

var viewFullScreen = document.getElementById("view-fullscreen");
if (viewFullScreen) {
  viewFullScreen.addEventListener("click", function() {
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  })
}

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

    // Send the button ID to the server using fetch
    var jsonData = {
        button_id: buttonId
    };

    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data); // Handle success response
    })
    .catch((error) => {
        console.error('Error:', error); // Handle error
    });

    console.log(buttonId); // Log the button ID
}

