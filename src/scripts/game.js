import Court from "./court.js";
import Ball from "./ball.js";
import HumanPlayer from "./human_player.js";
import ComputerPlayer from "./computer_player.js";
import Net from "./net.js";

const CONSTANTS = {
    P1ADSTART: [470, 500],
    P1COLOR: "red",
    P2ADSTART: [350, 80],
    P2COLOR: "orange",
    PLAYERHT: 0.06,
    BALLSTART: [480, 500, 490],
    BALLTOSSVEL: [0, 0, -4]
}

export default class Game {

    constructor(ctx) {
        this.ctx = ctx;
        this.court = new Court(this.ctx);
        this.net = new Net(this.ctx);
        this.player1 = new HumanPlayer(
            CONSTANTS.P1ADSTART, 
            [0,0], 
            CONSTANTS.P1COLOR, 
            ctx.canvas.width * CONSTANTS.PLAYERHT,
            this.net
        );
        this.player2 = new ComputerPlayer(
            CONSTANTS.P2ADSTART, 
            [0, 0], 
            CONSTANTS.P2COLOR, 
            ctx.canvas.width * CONSTANTS.PLAYERHT,
            this.net
        );

        this.ball = new Ball(
            // [480, 500, 400],
            // [0, 0,-2], 
            CONSTANTS.BALLSTART,
            CONSTANTS.BALLTOSSVEL, 
            ctx.canvas.width * 0.00625, 
            this.player2, 
            ctx.canvas
        );
        
        // debugger
        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.bindControls();
    };

    start() {
        this.animate();
    } 

    reset() {
        // setTimeout(this.animate.bind(this),2000);
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
        // debugger
    }

    keyupHandler(e) {
        // debugger
        this.keys[e.key] = false;
    }

    clickHandler(e) { // need to add a cooldown to this so user can't spam click
        if (this.ball.roundCollisionDetector(this.player1) === this.player1) {
            this.player1.swing(e, this.ctx.canvas.getBoundingClientRect(), this.ball);
        }
    }
    
    animate() {
        // debugger
        requestAnimationFrame(this.animate.bind(this)); // this will let the animation pause when outside of tab
        this.ctx.clearRect(0, 0, 800, 600);
        this.ball.move();
        this.net.stopBall(this.ball);

        this.player2.findPath(this.ball);
        this.player2.swing(this.ball);
        this.player1.reposition(this.keys);
        this.draw(this.ctx);
        if (!this.ball.inPlay) {

        }
    }

    draw(ctx) {
        this.court.draw(ctx);
        // tentative netshadow
        ctx.fillStyle = "rgba(23, 23, 23, 0.75)";
        ctx.beginPath();
        ctx.moveTo(200, 290);
        ctx.lineTo(600, 290);
        ctx.lineTo(601, 305);
        ctx.lineTo(199, 305);
        ctx.fill();
        
        // debugger
        this.player2.draw(ctx);
        this.net.draw(ctx);
        this.ball.draw(ctx);
        this.player1.draw(ctx); // this order is important so that layering between back player, ball, and fore player is maintained
    }
  
}