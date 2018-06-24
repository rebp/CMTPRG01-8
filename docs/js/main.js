"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomObject = (function () {
    function DomObject(type) {
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.minWidth = 0;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.element = document.createElement(type);
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
    }
    DomObject.prototype.draw = function () {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    DomObject.prototype.randomPosition = function () {
        this.minWidth = 0;
        this.maxWidth = window.innerWidth - this.element.clientWidth;
        this.maxHeight = window.innerHeight - this.element.clientHeight;
        this.x = (Math.random() * (this.maxWidth - this.minWidth) + this.minWidth);
        this.y = (Math.random() * (this.maxHeight - 0) + 0);
    };
    DomObject.prototype.getBoundingClientRect = function () {
        return this.element.getBoundingClientRect();
    };
    return DomObject;
}());
var Powerup = (function (_super) {
    __extends(Powerup, _super);
    function Powerup(type) {
        var _this = _super.call(this, type) || this;
        _this.randomPosition();
        return _this;
    }
    Powerup.prototype.update = function () {
        this.draw();
    };
    return Powerup;
}(DomObject));
var CookiesAndMilk = (function (_super) {
    __extends(CookiesAndMilk, _super);
    function CookiesAndMilk() {
        return _super.call(this, "cookiesandmilk") || this;
    }
    return CookiesAndMilk;
}(Powerup));
var Cookie = (function (_super) {
    __extends(Cookie, _super);
    function Cookie() {
        var _this = _super.call(this, "cookie") || this;
        _this.randomPosition();
        return _this;
    }
    Cookie.prototype.update = function () {
        this.draw();
    };
    return Cookie;
}(DomObject));
var CookiesJar = (function (_super) {
    __extends(CookiesJar, _super);
    function CookiesJar() {
        return _super.call(this, "cookiesjar") || this;
    }
    return CookiesJar;
}(Powerup));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(player) {
        var _this = _super.call(this, "enemy") || this;
        _this.speedX = 5;
        _this.speedY = -5;
        _this.randomPosition();
        _this.player = player;
        player.add(_this);
        return _this;
    }
    Enemy.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < this.minWidth || this.x > this.maxWidth) {
            this.speedX *= -1;
            if (this.speedX < 0) {
                this.element.style.backgroundPositionX = "0px";
            }
            else {
                this.element.style.backgroundPositionX = "-100px";
            }
        }
        if (this.y < 0 || this.y > this.maxHeight) {
            this.speedY *= -1;
        }
        this.draw();
    };
    Enemy.prototype.notify = function () {
        var _this = this;
        this.speedX = 2;
        this.speedY = -2;
        setTimeout(function () {
            _this.speedX = 5;
            _this.speedY = -5;
        }, 5000);
    };
    return Enemy;
}(DomObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.enemies = [];
        this.cookies = [];
        this.addEnemy = true;
        this.powerups = [];
        this.level = 0;
        this.score = 0;
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.player = new Player();
        for (var i = 0; i < 2; i++) {
            this.enemies.push(new Enemy(this.player));
        }
        this.cookies.push(new Cookie());
        setInterval(function () {
            if (_this.powerups.length == 0) {
                if (Math.random() <= 0.5) {
                    _this.powerups.push(new CookiesJar());
                }
                else {
                    _this.powerups.push(new CookiesAndMilk());
                }
            }
        }, 3000);
        this.gameLoop();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.powerups; _i < _a.length; _i++) {
            var powerup = _a[_i];
            if (powerup instanceof CookiesAndMilk) {
                if (Util.checkCollision(powerup.getBoundingClientRect(), this.player.getBoundingClientRect())) {
                    this.player.notifyAllObservers();
                    var c = this.powerups[0];
                    var i = this.powerups.indexOf(c);
                    this.powerups.splice(i, 1);
                    powerup.element.remove();
                    this.player.setBehavior(new DefenseBehavior(this.player));
                    setTimeout(function () {
                        _this.player.setBehavior(new NormalBehavior(_this.player));
                    }, 5000);
                }
            }
            if (powerup instanceof CookiesJar) {
                if (Util.checkCollision(powerup.getBoundingClientRect(), this.player.getBoundingClientRect())) {
                    var c = this.powerups[0];
                    var i = this.powerups.indexOf(c);
                    this.powerups.splice(i, 1);
                    powerup.element.remove();
                    this.score = this.score + 3;
                    this.textfield.innerHTML = "Score: " + this.score;
                }
            }
            powerup.update();
        }
        for (var _b = 0, _c = this.enemies; _b < _c.length; _b++) {
            var enemy = _c[_b];
            enemy.update();
            if (Util.checkCollision(this.player.getBoundingClientRect(), enemy.getBoundingClientRect())) {
                this.player.collision();
            }
        }
        for (var _d = 0, _e = this.cookies; _d < _e.length; _d++) {
            var cookie = _e[_d];
            cookie.update();
            if (Util.checkCollision(cookie.getBoundingClientRect(), this.player.getBoundingClientRect())) {
                var c = this.cookies[0];
                var i = this.cookies.indexOf(c);
                this.cookies.splice(i, 1);
                cookie.element.remove();
                this.cookies.push(new Cookie());
                this.score++;
                this.textfield.innerHTML = "Score: " + this.score;
            }
            for (var _f = 0, _g = this.enemies; _f < _g.length; _f++) {
                var enemy = _g[_f];
                if (Util.checkCollision(cookie.getBoundingClientRect(), enemy.getBoundingClientRect())) {
                    var c = this.cookies[0];
                    var i = this.cookies.indexOf(c);
                    this.cookies.splice(i, 1);
                    cookie.element.remove();
                    this.cookies.push(new Cookie());
                    this.score--;
                    if (this.score < 1) {
                        this.score = 0;
                    }
                    this.textfield.innerHTML = "Score: " + this.score;
                }
            }
        }
        if (this.addEnemy) {
            if (this.score == 10) {
                this.enemies.push(new Enemy(this.player));
                this.addEnemy = false;
            }
        }
        this.player.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.subtractLevel = function () {
        var $this = this;
        this.level++;
        switch (this.level) {
            case 1:
                this.statusbar.style.backgroundPositionX = "-72px";
                break;
            case 2:
                this.statusbar.style.backgroundPositionX = "-144px";
                break;
            case 3:
                this.statusbar.style.backgroundPositionX = "-216px";
                break;
            case 4:
                this.statusbar.style.backgroundPositionX = "-288px";
                this.textfield.innerHTML = "GAME OVER <br /> <br />\n                                            Score: " + this.score;
                setTimeout(function () {
                    $this.statusbar.style.backgroundPositionX = "0px";
                    alert();
                    $this.reset();
                }, 300);
                break;
        }
    };
    Game.prototype.reset = function () {
        this.level = 0;
        this.score = 0;
        this.textfield.innerHTML = "Score: " + this.score;
    };
    Game.prototype.getScore = function () {
        return this.score;
    };
    return Game;
}());
window.addEventListener("load", function () { Game.getInstance(); });
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this, "player") || this;
        _this.accelerator = 0;
        _this.observers = [];
        _this.randomPosition();
        _this.behavior = new NormalBehavior(_this);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Player.prototype.collision = function () {
        this.behavior.collision();
    };
    Player.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y > (window.innerHeight)) {
            this.y = 0 - this.element.clientHeight;
        }
        if (this.y < 0 - this.element.clientHeight) {
            this.y = window.innerHeight;
        }
        if (this.x > (window.innerWidth)) {
            this.x = 0 - this.element.clientWidth;
        }
        if (this.x < 0 - this.element.clientWidth) {
            this.x = window.innerWidth;
        }
        this.behavior.setBehavior();
        this.draw();
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 37:
                this.speedX = -this.accelerator;
                break;
            case 39:
                this.speedX = this.accelerator;
                break;
            case 38:
                this.speedY = -this.accelerator;
                break;
            case 40:
                this.speedY = this.accelerator;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 37:
                this.speedX = 0;
                break;
            case 39:
                this.speedX = 0;
                break;
            case 38:
                this.speedY = 0;
                break;
            case 40:
                this.speedY = 0;
                break;
        }
    };
    Player.prototype.setAccelerator = function (accelerator) {
        this.accelerator = accelerator;
    };
    Player.prototype.setBehavior = function (behavior) {
        this.behavior = behavior;
    };
    Player.prototype.add = function (o) {
        this.observers.push(o);
    };
    Player.prototype.notifyAllObservers = function () {
        this.observers.forEach(function (observer) {
            observer.notify();
        });
    };
    return Player;
}(DomObject));
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Util;
}());
var DefenseBehavior = (function () {
    function DefenseBehavior(player) {
        this.player = player;
    }
    DefenseBehavior.prototype.collision = function () {
        console.log("defense collision");
    };
    DefenseBehavior.prototype.setBehavior = function () {
        this.player.element.className = 'flicker';
        this.player.setAccelerator(12);
    };
    return DefenseBehavior;
}());
var NormalBehavior = (function () {
    function NormalBehavior(player) {
        this.player = player;
    }
    NormalBehavior.prototype.collision = function () {
        var _this = this;
        console.log("normal collision");
        this.player.randomPosition();
        this.player.element.className = 'flicker';
        this.player.setAccelerator(6);
        setTimeout(function () {
            _this.player.element.classList.remove('flicker');
        }, 500);
        Game.getInstance().subtractLevel();
    };
    NormalBehavior.prototype.setBehavior = function () {
        if (this.player.element.classList.contains('flicker')) {
            this.player.element.classList.remove('flicker');
        }
        this.player.setAccelerator(6);
    };
    return NormalBehavior;
}());
//# sourceMappingURL=main.js.map