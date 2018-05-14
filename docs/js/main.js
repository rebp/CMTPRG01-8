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
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this, "enemy") || this;
        _this.speedX = 5;
        _this.speedY = -5;
        _this.randomPosition();
        return _this;
    }
    Enemy.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < this.minWidth || this.x > this.maxWidth) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > this.maxHeight) {
            this.speedY *= -1;
        }
        this.draw();
    };
    return Enemy;
}(DomObject));
var Game = (function () {
    function Game() {
        this.enemies = [];
        this.cookies = [];
        this.level = 0;
        this.score = 0;
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.player = new Player();
        this.enemies.push(new Enemy());
        this.enemies.push(new Enemy());
        this.enemies.push(new Enemy());
        this.enemies.push(new Enemy());
        this.cookies.push(new Cookie());
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
            var enemy = _a[_i];
            enemy.update();
            if (Util.checkCollision(this.player.getBoundingClientRect(), enemy.getBoundingClientRect())) {
                this.player.randomPosition();
                this.subtractLevel();
            }
        }
        for (var _b = 0, _c = this.cookies; _b < _c.length; _b++) {
            var cookie = _c[_b];
            cookie.update();
            if (Util.checkCollision(cookie.getBoundingClientRect(), this.player.getBoundingClientRect())) {
                var c = this.cookies[0];
                var i = this.cookies.indexOf(c);
                this.cookies.splice(i, 1);
                cookie.element.remove();
                this.cookies.push(new Cookie());
                this.scorePoint();
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
                setTimeout(function () {
                    $this.statusbar.style.backgroundPositionX = "0px";
                    alert("Game Over");
                    $this.reset();
                }, 300);
                break;
        }
    };
    Game.prototype.scorePoint = function () {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    };
    Game.prototype.reset = function () {
        this.level = 0;
        this.score = 0;
        this.textfield.innerHTML = "Score: " + this.score;
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this, "player") || this;
        _this.randomPosition();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
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
        this.draw();
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 37:
                this.speedX = -5;
                break;
            case 39:
                this.speedX = 5;
                break;
            case 38:
                this.speedY = -5;
                break;
            case 40:
                this.speedY = 5;
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
//# sourceMappingURL=main.js.map