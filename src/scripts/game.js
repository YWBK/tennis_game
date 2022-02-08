import Court from "./court.js";
import Ball from "./ball.js";
import HumanPlayer from "./human_player.js";
import ComputerPlayer from "./computer_player.js";
import Net from "./net.js";
import GameView from "./game_view.js";
import Scorekeeper from "./scorekeeper.js";
import Racket from "./racket.js";

const CONSTANTS = {
    P1ADSTART: [392, 500],
    P1COLOR: "pink",
    P2ADSTART: [392, 40],
    P2COLOR: "gold",
    PLAYERHT: 0.06,
    BALLSTART: [400, 520],
    BALLTOSSHT: 0.0125,
    BALLTOSSVEL: [0, 0, 0]
}

export default class Game {

    constructor(ctx) {
        // debugger
        this.sounds = [];
        const hitAudio = new Audio('./src/assets/beep.ogg');
        const bounceAudio = new Audio('./src/assets/plop.ogg');
        this.sounds.push(hitAudio);
        this.sounds.push(bounceAudio);

        this.ctx = ctx;
        this.objects = [];
        this.scorekeeper = new Scorekeeper(this);
        
        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.bindControls();
        this.gameView = new GameView(this);
        // debugger
        this.resetPoint();
        // debugger
    };
    
    startPoint() {
        // debugger
        this.rallyStarted = true;
        // this.ball.status = "serving";
        // this.animate();
        this.gameView.animate(this);
    }

    resetPoint() {
        // debugger
        // this.soundOn = true;
        // this.scorekeeper.
        this.rallyStarted = false;
        this.court = new Court(this.ctx);
        this.net = new Net(this.ctx);
        this.player1 = new HumanPlayer(
            [392, 500], 
            [0,0], 
            CONSTANTS.P1COLOR, 
            this.ctx.canvas.width * CONSTANTS.PLAYERHT,
            this.net,
            this.sounds[0],
            "P1"
        );
        this.p1racket = new Racket(
            [this.player1.pos[0] + this.player1.width * (4/5),
            this.player1.pos[1] + this.player1.height * (2/5)],
            10, "red"
        );
        this.player2 = new ComputerPlayer(
            [392, 40], 
            [0, 0], 
            CONSTANTS.P2COLOR, 
            this.ctx.canvas.width * CONSTANTS.PLAYERHT,
            this.net,
            this.sounds[0],
            "P2"
        );
        this.ball = new Ball(
            // CONSTANTS.BALLSTART,
            [400, 520],
            [0, 0, 0], 
            this.ctx.canvas.width * 0.00625,
            10,
            this.player1, 
            this.ctx.canvas
        );

        this.objects.push(this.court);
        this.objects.push(this.net);
        this.objects.push(this.player2);
        this.objects.push(this.ball);
        this.objects.push(this.p1racket);
        this.objects.push(this.player1);
        this.objects.push(this.scorekeeper);
        this.gameView.draw(this, this.ctx);

        this.scorekeeper.isBreakPoint();
    } 
    
    bindControls() {
        // debugger
        document.addEventListener("keydown", this.keydownHandler)
        document.addEventListener("keyup", this.keyupHandler)
        document.addEventListener("click", this.clickHandler)
    }

    keys = {
        "w": false,
        "s": false,
        "a": false,
        "d": false,
        "W": false,
        "S": false,
        "A": false,
        "D": false,
    }

    keydownHandler(e) {
        this.keys[e.key] = true;
    }
    keyupHandler(e) {
        this.keys[e.key] = false;
    }

    clickHandler(e) {
        // debugger
        const canvas = this.ctx.canvas.getBoundingClientRect();
        const mouseX = e.clientX - canvas.x;
        const mouseY = e.clientY - canvas.y;
        if (mouseX >= 0 && mouseX <= 800 && mouseY >= 0 && mouseY <= 600) {
            // debugger
            if (!this.rallyStarted) {
                this.startPoint();
                this.player1.toss(this.ball);
            } else if (this.ball.roundCollisionDetector(this.player1) === this.player1) {
                
                this.player1.swing(e, this.ctx.canvas.getBoundingClientRect(), this.ball);
                this.p1racket.swing();
            };
        };
    };

    pointOver() {
        if (this.ball.status === "point" || this.ball.status === "out" || this.ball.status === "fault") {
            this.scorekeeper.updatePointScore(this.ball);
            this.scorekeeper.updateGameScore();
            // debugger
            this.ball.status = "resetting";
            // debugger
            setTimeout(this.resetPoint.bind(this), 2000);
            // debugger
        };
    };
};