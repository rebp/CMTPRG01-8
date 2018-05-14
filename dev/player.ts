/// <reference path="./DomObject.ts" />

class Player extends DomObject {

    constructor() {
        super( "player")
        this.randomPosition()
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
    }

    public update():void {
        this.x += this.speedX
        this.y += this.speedY

        if (this.y > (window.innerHeight) ) {
            this.y = 0 - this.element.clientHeight
        }

        if(this.y < 0 - this.element.clientHeight) {
            this.y = window.innerHeight
        }

        if (this.x > (window.innerWidth) ) {
            this.x = 0 - this.element.clientWidth
        }

        if (this.x < 0 - this.element.clientWidth ) {
            this.x = window.innerWidth
        }

        this.draw()
    }

    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 37:
            this.speedX = -5
            break
        case 39:
            this.speedX = 5
            break
        case 38:
            this.speedY = -5
            break
        case 40:
            this.speedY = 5
            break
        }
    }

    onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 37:
            this.speedX = 0
            break
        case 39:
            this.speedX = 0
            break
        case 38:
            this.speedY = 0
            break
        case 40:
            this.speedY = 0
            break
        }
    }


}