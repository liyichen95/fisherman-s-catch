var scaling = "fit";
var width = 1920;
var height = 1080;
var color = "#9AECF4";
var outerColor = dark;
var assets = [
    "background_lvl-1.png",
    "background_lvl-2.png",
    "background_lvl-3.png",
    "boat.png",
    "fish-0.png",
    "fish-1.png",
    "fish-2.png",
    "fish-3.png",
    "fish-4.png",
    "fish-5.png",
    "fish-6.png",
    "fish-7.png",
    "fish-8.png",
    "hook.png",
    "background_end.png",
    "background1.png",
    "splash.wav",
    "backgroundMusic1.mp3",
    "backgroundMusic2.mp3",
    "yay.wav",
    "click.wav",
    "sea.mp3",
    "cheering.mp3",
    "pomegranate.png",
    "apple.png",
    "banana.png",
    "flow1.png",
    "flow2.png",
    "flow3.png",
    "intro.png",
    "final-background.png",

    {
        font: "Klavika",
        src: "KlavikaBold.otf"
    }
];

var path = "assets/";

function replaceCharAtIndex(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}
// function setCharAt(str,index,chr) {
//     return str.substr(0,index) + chr + str.substr(index+1);
// }

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     //The maximum is inclusive and the minimum is inclusive 
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

const frame = new zim.Frame(scaling, width, height, color, outerColor, assets, path);

frame.on("ready", function() {

    console.log("frame ready");

    var stage = frame.stage;
    var stageW = frame.width;
    var stageH = frame.height;

    function makeIntro() {
        var intro = new Container(stageW, stageH).addTo();

        // var backgroundColor = new Rectangle({
        //         width: stageW,
        //         height: stageH + 500,
        //         color: "#82d3f7"
        //     })
        //     .addTo(intro);
        frame.asset("intro.png").sca(1.05).addTo(intro);

        // Title label 
        var title = new Label({
                text: "Fisherman's Catch",
                size: 60,
                font: "Klavika",
                color: "#fff",
                backgroundColor: "#fb904b",
                paddingHorizontal: 70,
                paddingVertical: 30,
                corner: 10
            })
            .pos(0, 50, CENTER)
            // .ske(10)
            .alp(0)
            .animate({
                props: {
                    alpha: 1
                },
                wait: 200
            })
            .addTo(intro);

        var mrfox = asset("boat.png").centerReg(stage).pos({ y: 530 });

        mrfox.wiggle("x", mrfox.x, 10, 30, 300, 1500);

        var instructions = new Label({
            text: "Help Mr.Fox to catch the letters on the fish to complete the word puzzel. \n Complete all 3 levels so Mr. Fox can sell his catched fish at his market. \n Be careful that you pick the right fish with the letter you need",
            lineHeight: 70,
            align: "center",
            size: 32,
            color: white,
            backgroundColor: "#778efc",
            paddingHorizontal: 40,
            paddingVertical: 20,
            corner: 20,
            fontOptions: "bold"
        }).centerReg(intro).pos(null, 250, CENTER);

        var label = new Label({
            text: "START",
            size: 48,
            color: white,
            fontOptions: "bold"
        });
        var button = new Button({
                label: label,
                width: 400,
                height: 100,
                backgroundColor: "#ec7637",
                borderWidth: 0,
                rollBackgroundColor: "#778efc",
                corner: 20
            })
            .centerReg(intro)
            .pos(null, 850, CENTER)
            .tap(function() {
                asset("click.wav").play();
                intro
                    .cache()
                    .animate({
                        props: {
                            y: -stageH
                        },
                        time: 800,
                        call: makeLevel(0, frame, stage)
                    });
                asset("backgroundMusic1.mp3").play();
                asset("sea.mp3").play();
                stage.update()
            });
    }

    //temporary to start game right away
    // makeFinish(frame);
    // start game from the beginning
    makeIntro(frame);
    // makeLevel(0, frame, stage);


    stage.update();
}); // end of ready