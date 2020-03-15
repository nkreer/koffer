// Get the app view to work with later
var appView = document.getElementById("app");
var loseView = document.getElementById("lose");
var roundView = document.getElementById("round");
var stepView = document.getElementById("step");
var finalScoreView = document.getElementById("score");

// Config
var configView = document.getElementById("config");

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
    configView.className = "hidden";

    // Prepare the game with every necessary setting

    // Get the selected item pack
    var selected = document.getElementById("itemPackSelect").value;
    if(selected === "food"){
        var items = food;
    } else if(selected === "animals"){
        var items = animals;
    } else {
        // Travel pack is the default
        var items = travel;
    }

    var difficulty = document.getElementById("difficulty").value;

    prepareGame(
        difficulty, 
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

function showConfig(){
    // Only show config in first round
    // Otherwise, the player would lose their state 
    if(getRound() === 0){
        configView.className = "";
    }
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

        // Generate an accessible label for the buttons
        // i.e. remove the emoji
        var accessibleLabel = newItems[btn].split(" ");
        accessibleLabel.pop();
        accessibleLabel = accessibleLabel.join(" ");
        button.setAttribute("aria-label", accessibleLabel);

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

        newAudio.play();
    } else {
        // Validate that entry is correct
        if(text === selector.selected[selector.currentStep]){
            // Correct entry
            setStep(getStep() + 1);
            // Reset the buttons and give them new items
            randomButtonEntries();

            selectAudio.play();
        } else {
            // Show the lose view
            loseView.className = "";

            loseAudio.play();
        }
    }
}

// Reset to default
initialize();