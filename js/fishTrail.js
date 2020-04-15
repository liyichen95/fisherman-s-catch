
//return a Squiggle based on the the trailPoints and scale provided
function createFishTrail(trailPoints, scale, frame ) {
    return new Squiggle({
        points: trailPoints,
        // color: clear,
        interactive: true,
        showControls: false,
        thickness: 1,
        onTop: false,
        lockControlType: true,
        move: false,
        editPoints: false,
    })
    .alp(0)
    .sca(scale)
    .center();

};

//returns an array of fishes created based on the provided trails
function createFishes(word, fishTrailOne, fishTrailTwo, speed) {
                
    var fishes = [];
    // imgNumber starts at 0 for the first image
    var imgNumber = -1;
    // initial set to false
    // startCloning when i == the matched letter of the word
    var startCloning = false;
    // for loop iterating through the word in const levels 
    for(var i = 0; i < word.length ; i++) {
        // creating a rectangle shape for the fish objects to be added to
        var fishRect = new Rectangle({color: "rgba(255,255,255,0.01)"}).centerReg()
        // if statement to go through NUM_FISH_IMAGES starting at 0
        if(i == NUM_FISH_IMAGES) {
            imgNumber = 0;
            startCloning = true;
        } else {
            // fish image gets incremented here 
            imgNumber++;
        }
        zog(`fish-${imgNumber}.png`);

        if(startCloning) {
            var fish1 = frame.asset(`fish-${imgNumber}.png`)
            .clone()
        } else {
            var fish1 = frame.asset(`fish-${imgNumber}.png`).wiggle("rotation", 0, 2, 2, 300, 300)
        }


        var label = new Label({
            text: word[i],
            size: 50,
            order: 2,
            color: black,
            font: "Solway",
        })
        
        fish1.centerReg(fishRect)
        label.centerReg(fishRect)
        
        fishRect.animate({
            props: {
                // modules is 2 === 0, meaning it is even 
                // ? terenary = if it's even go to fishTrailOne, if it's odd go to fishTrailTwo
                path: i % 2 === 0 ? fishTrailOne : fishTrailTwo,
                orient: false
            },
            ease: "linear",
            wait: 500 * (i*2), // without * the fishes are stacked
            time: 15000, //speed
            loop: true,
        });

        fishes.push(fishRect);
    }

    
    return fishes;
}
