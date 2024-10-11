document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById("loading").style.display = "none";
        var audio = new Audio('/sound/expand.wav');
        audio.play();
    }, 2000); 
    setTimeout(function() {
        document.getElementById("notifyiframe").src = "/notify?title=Hello!&description=Welcome to MKA-KΣ RC Panel"; 
    }, 2500); 
});

