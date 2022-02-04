const Ball = require("./ball.js");
const HumanPlayer = require("./human_player.js");
const ComputerPlayer = require("./computer_player.js");

class Game {

    constructor(ctx) {
        // debugger
        this.ctx = ctx;
        this.ball = new Ball([500, 130, 110], [-1, 3, 3], 5); // NEED A WAY TO LET VEL[2] CHANGE DURING TRAVEL
        this.player1 = new HumanPlayer([500, 500], [0,0], "red");
        // debugger
        this.player2 = new ComputerPlayer([100, 80], [0, 0], "blue", this.ball);
    };

    start() {
        this.animate();
    } 
    
    
    animate() {
        // debugger
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, 800, 600);
        this.draw(this.ctx);
        this.ball.collisionDetection(this.player1);
        this.ball.collisionDetection(this.player2);
        // this.ball.collisionDetection(this.net)
        // debugger
        this.ball.move();
        this.player2.findPath(this.ball, this.ctx);
    }

    draw(ctx) {
        // tentative court
        ctx.fillStyle = "green"
        ctx.fillRect(0, 0, 800, 600);
        // debugger
        this.player2.draw(ctx);
        this.ball.draw(ctx);
        this.player1.draw(ctx); // this order is important so that layering between back player, ball, and fore player is maintained
    }
}

module.exports = Game;