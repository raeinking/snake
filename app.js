var Game = Game || {};
var Keyboard = Keyboard || {};
var component = component || {};

Keyboard.Keymap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

Keyboard.ControllerEvents = function() {
    var self = this;
    this.presskey = null;
    this.Keymap = Keyboard.Keymap;

    document.onkeydown = function(event) {
        self.presskey = event.which;
    };

    this.getKey = function() {
        return this.keymap[this.presskey];        
    };
};

component.stage = function(canvas, conf) {
    this.keyEvent = new Keyboard.ControllerEvents();
    this.width = canvas.width;
    this.height = canvas.height;
    this.length = [];
    this.food = {};
    this.score = 0;
    this.conf = {
        cw : 10 ,
        size : 5 ,
        fps: 1000
    };

    if (typeof conf == 'object') {
        for (var key in conf) {
            if (conf.hasOwnProperty(key)) {
                this.conf[key] = conf[key];
            }
        }
    }
};

component.snake = function(canvas, conf) {

    this.stage = new component.Stage(canvas, conf);

    this.initSnake = function() {
        for (var i = 0; i < this.stage.conf.size; i++) {
            this.stage.length.push({x: i, y: 0 });
        }
    };
    this.initSnake();

    this.initFood = function() {
        this.stage.food = {
            x: Math.round(Math.random() * (this.stage.width - this.stage.conf.cw) / this.stage.conf.cw),

            y: Math.round(Math.random() * (this.stage.height - this.stage.conf.cw) / this.stage.conf.cw),
        };
    };

    this.restart = function() {
        this.stage.length = [];
        this.stage.food = {};
        this.stage.score = 0;
        this.stage.direction = "right";
        this.stage.keyEvent.presskey = null;
        this.initSnake();
        this.initFood();
    };
};

Game.Draw = function(context, snake) {
    this.drowstage = function() {
        var keypress = snake.stage.keyEvent.getkey();
        if (typeof(keypress) != "undefined") {
            snake.stage.direction = keypress;
        }

        context.fillStyle = "white";
        context.fillRect(0, 0, snake.stage.width, snake.stage.height);

        var nx = snake.stage.length[0].x;
        var ny = snake.stage.lenght[0].y;

        switch (snake.stage.direction) {
            case "right":
                nx++;
                break;
            case "left":
                nx--;
                break;
            case "up":
                ny--;
                break;
            case "down":
                ny++;
                break;
    
        }

        if (this.collection(nx,ny) == true) {
            snake.restart();
            return;
        }

        if
    }
}