var countdownDisplay = document.getElementById("optionsOpener");
var countdownDefaultText = "koffer";
var countdownStatus = -1;
var countdownId = 0;

function stopCountdown(){
    countdownStatus = -1;
    clearInterval(countdownId);
    countdownDisplay.innerHTML = countdownDefaultText;
}

function startCountdown(seconds, callback){
    stopCountdown(); // no overlapping countdowns
    countdownStatus = seconds;
    countdownDisplay.innerHTML = seconds + "s";
    countdownId = setInterval(function(){
        if(countdownStatus === 0){
            callback();
        }

        if(countdownStatus <= 0){
            stopCountdown();
        }

        if(countdownStatus !== -1){
            countdownStatus -= 1;
            countdownDisplay.innerHTML = countdownStatus + "s";
        }

        console.log(countdownStatus);
    }, 1000);
}

