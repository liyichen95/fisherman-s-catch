function makeFinish(frame) {
    asset("cheering.mp3").play();
    var finish = new Container(frame.width, frame.height).addTo();

    // frame.asset("background_end.png").addTo(finish).sca(1).centerReg();
    var sprite = new Sprite({
            image: asset("final-background.png"),
            cols: 3
                // rows: 1,

        }).centerReg().addTo(finish).run({
            loop: true,
            time: 1300
        })
        // container.getChildAt(0).

    new Label({
            text: "Congratulations! You have completed the game!",
            size: 60,
            font: "Klavika",
            color: "#fff",
            backgroundColor: "#EF791A",
            paddingHorizontal: 70,
            paddingVertical: 30,
            corner: 10
        })
        .centerReg()
        .pos(null, 70)
        .ske(10)
        .alp(0.4)
        .animate({
            props: {
                alpha: 0.9
            },
            wait: 200
        })
        .addTo(finish);

    // new Label({
    //     text: "",
    //     lineHeight: 50,
    //     align: "center",
    //     size: 32,
    //     color: white,
    //     backgroundColor: dark,
    //     paddingHorizontal: 80,
    //     paddingVertical: 60,
    //     corner: 20,
    //     fontOptions: "bold"
    // }).centerReg(finish).alp(.7).pos(null, 250, CENTER);

}