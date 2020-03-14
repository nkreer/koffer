// Get the app view to work with later
var appView = document.getElementById("app");
var loseView = document.getElementById("lose");
var roundView = document.getElementById("round");
var stepView = document.getElementById("step");
var finalScoreView = document.getElementById("score");

var selector = {}

function initialize(){
    selector = {
        buttons: [],
        itemList: [],
        selected: [],
        round: 0,
        currentStep: 0,
        difficulty: 4
    }

    roundView.innerHTML = 1;
    stepView.innerHTML = 1;
    loseView.className = "hidden";

    // Prepare the game with every necessary setting
    // TODO: User settings
    prepareGame(
        definitions.difficulty.medium, 
        [items]
    );
}

function getRound(){
    return selector.round;
}

function setRound(round){
    roundView.innerHTML = round + 1;
    finalScoreView.innerHTML = round + 1;
    selector.round = round;
}

function getStep(){
    return selector.currentStep;
}

function setStep(step){
    stepView.innerHTML = step + 1;
    selector.currentStep = step;
}

function getRandomItem(){
    return selector.itemList[Math.floor((Math.random() * (selector.itemList.length - 1)))];
}

function randomButtonEntries(){
    // Get new items
    var newItems = [];
    // Insert correct item at random position if needed
    var randomPosition = Math.floor(Math.random() * selector.difficulty);

    for(i = 0; i < selector.difficulty; i++){
        // Validate that we really need the correct answer
        if(getStep() !== getRound() && i === randomPosition){
            newItems.push(selector.selected[getStep()]);
        } else {
            newItems.push(getRandomItem());
        }
    }

    for(btn in selector.buttons){
        var button = selector.buttons[btn];
        button.innerHTML = newItems[btn];

        // Show when this is a new user selection
        if(getStep() === getRound()){
            button.style = "transition: 0.5s; color: white; background-color: #111;";
        } else {
            button.style = "transition: 0.5s;";
        }
    }
}

function prepareGame(difficulty, itemList){
    // Reset app
    appView.innerHTML = "";

    selector.difficulty = difficulty;

    // Add every supplied item list to the pool for the game
    for(list in itemList){
        // Add all elements to the given element
        selector.itemList = selector.itemList.concat(itemList[list]);
    }

    // Difficulty determines how many options will be shown at a time
    for(i = 0; i < difficulty; i++){
        // Generate a button
        var button = document.createElement("button");
        // What happens when the buttons are pressed
        button.addEventListener("click", function(){
            round(event.target);
        });

        // Add the button to the DOM
        appView.appendChild(button);

        // Add the generated button to the selector
        selector.buttons.push(button);
    }

    // Random items for each button
    randomButtonEntries();
}

function round(event){
    var text = event.innerHTML;
    // Check if we are at the end of a round and this is a new user selection
    if(selector.round === selector.currentStep){
        // Add to selected
        selector.selected.push(text);
        // Reset rounds
        setRound(getRound() + 1);
        setStep(0);
        // Reset the buttons and give them new items
        randomButtonEntries();
    } else {
        // Validate that entry is correct
        if(text === selector.selected[selector.currentStep]){
            // Correct entry
            setStep(getStep() + 1);
            // Reset the buttons and give them new items
            randomButtonEntries();
        } else {
            // Show the lose view
            loseView.className = "";
        }
    }
}

// Reset to default
initialize();