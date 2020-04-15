const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

// hard-coded for 9 fish images 
const NUM_FISH_IMAGES = 9;

const LEVELS = [{
        completed: false,
        word: 'apple',
        startWord: '_pple',
        speed: 1,
        background: "background_lvl-1.png",
        fruit: "apple.png",
        flows: "flow1.png"
    },
    {
        completed: false,
        word: 'banana',
        startWord: '__na_a',
        speed: 2,
        background: "background_lvl-2.png",
        fruit: "banana.png",
        flows: "flow2.png"
    },
    {
        completed: false,
        word: 'pomegranate',
        startWord: 'p_me_ran_te',
        speed: 3,
        background: "background_lvl-3.png",
        fruit: "pomegranate.png",
        flows: "flow3.png"
    }
]

var START_LEVEL = 0;

const FISH_TRAIL1_POINTS = [
    [406.1, 65.5, 0, 0, -30, 0, 30, 0],
    [287.6, 39.9, 0, 0, 27.1, -67.6, -27.1, 67.6],
    [170.1, 48.6, 0, 0, 14.4, 57.1, -14.4, -57.1],
    [-1.3, 46.3, 0, 0, 91.6, -85.6, -91.6, 85.6],
    [-265.8, 76.1, 0, 0, -30, 0, 30, 0]
];
const FISH_TRAIL2_POINTS = [
    [-25.4, -6.3, 0, 0, -30, 0, 30, 0],
    [75, 60, 0, 0, -30, 0, 30, 0],
    [150, 0, 0, 0, -30, 0, 30, 0],
    [225, 60, 0, 0, -30, 0, 30, 0],
    [300, 0, 0, 0, -30, 0, 30, 0]
];


function makeLevel(levelNumber, frame, stage) {
    // const level is grabbing LEVLES from const LEVELS (above) and inserting a parameter 
    // level to make 

    const level = LEVELS[levelNumber];
    let startAnswer;
    zog(startAnswer)

    // loop through the number of letters there are
    for (var i = 0; i < level.word.length; i++) {
        startAnswer = ""
    }

    // load background image asset and set z-index to -1
    let background = frame.asset(level.background).center().ord(-1);

    let fruitImage = frame.asset(level.fruit).center().ord(2).sca(0.3).pos({
        x: 70,
        y: 100
    });

    var flowImages = frame.asset(level.flows).center().ord(-1).pos(null, 350);

    var scroller = new Scroller(flowImages);


    var startLabel = new Label({
            text: level.startWord,
            size: 100,
            padding: 30,
            backgroundColor: white,
            corner: 15
        })
        .addTo()
        .pos({
            x: 200,
            y: 100
        })
        .alp(0.7)
        .sca(0.7)


    const fishTrail1 = createFishTrail(FISH_TRAIL1_POINTS, 4);
    const fishTrail2 = createFishTrail(FISH_TRAIL2_POINTS, 6.5);

    // using the fish trails, create a list of fishes
    // Retrieves word and speed from level (from const LEVEL)
    const fishList = createFishes(level.word, fishTrail1, fishTrail2, level.speed, level.fruit);

    // create a fish container to keep the fishes
    const fishContainer = new Container().addTo().sca(0.7);

    //iterate through the fish list and add each one to the container
    for (var i = 0; i < fishList.length; i++) {
        fishList[i].addTo(fishContainer);
    }

    let boat = frame
        .asset("boat.png")
        .centerReg(stage)
        .pos({ y: 40 })
        .wiggle("rotation", 0, 2, 2, 2500, 2500);

    // move the boat horizontally
    new MotionController(boat, "keydown", 7, "horizontal");

    let fishingLine = new Shape().addTo();

    // Add the hook
    let hook = frame.asset("hook.png").centerReg().pos(1030, 250);

    new MotionController(hook, "keydown", 10, "horizontal", null, null, null, 0.1);
    new MotionController(hook, "keydown", 10, "vertical", null, null, null, 0.1);


    // Ticker 
    Ticker.add(function() {
        fishingLine.c().s(dark).ss(2).mt(boat.x + 105, boat.y - 50).lt(hook.x + 13, hook.y - 10);
        for (var i = 0; i < fishList.length; i++) {
            if (!level.completed && fishList[i].hitTestReg(hook)) {
                asset("splash.wav").play();
                // remove fish from container
                fishList[i].removeFrom();

                //add caught letter into answer text
                startLabel.text = replaceCharAtIndex(startLabel.text, i, level.word[i]);

                // to check if startLabel is equal to the word in the level
                if (startLabel.text === level.word) {

                    if (levelNumber === LEVELS.length - 1) {
                        makeFinish(frame)
                    } else {
                        level.completed = true;

                        boat.removeFrom();
                        fishingLine.removeFrom();
                        hook.removeFrom();
                        // startLabel.removeFrom();
                        // background.removeFrom()
                        startLabel.centerReg().pos(null, 700).sca(1.2);
                        fruitImage.centerReg().pos(null, 470).sca(0.5);

                        // remove the fish image that has been caught
                        for (var j = 0; j < fishList.length; j++) {
                            asset("yay.wav").play();
                            fishList[j].removeFrom();
                        }

                        var messageLabel = new Label({
                                text: "Congratulations! You solved the word.",
                                size: 48,
                                color: white,
                                fontOptions: "bold"
                            })
                            .centerReg()
                            .pos(null, 330, CENTER);

                        var nextLabel = new Label({
                            text: "Next level",
                            size: 48,
                            color: white,
                            fontOptions: "bold"
                        });
                        var button = new Button({
                                label: nextLabel,
                                width: 400,
                                height: 100,
                                backgroundColor: "orange",
                                borderWidth: 0,
                                rollBackgroundColor: green,
                                corner: 20
                            })
                            .centerReg(level)
                            .pos(null, 900, CENTER)
                            .tap(function() {
                                asset("click.wav").play();
                                button
                                    .animate({
                                        props: { y: -frame.height },
                                        time: 800,
                                        call: makeLevel(++levelNumber, frame)

                                    });

                                stage.update()
                            });
                    }
                }
            }
        }

    })


}