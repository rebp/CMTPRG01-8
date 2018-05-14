/// <reference path="./DomObject.ts" />

class Enemy extends DomObject {

    constructor() {
        super( "enemy")

        // this.speedX = (Math.random() * (5 - (-5)) + (-5))
        // this.speedY = (Math.random() * (3 - (-3)) + (-3))
        this.speedX = 5
        this.speedY = -5
        this.randomPosition()

    }

    public update():void {

        this.x += this.speedX
        this.y += this.speedY
        
        if (this.x < this.minWidth || this.x > this.maxWidth)
        {
            this.speedX *= -1
            
        }
        if (this.y < 0 || this.y > this.maxHeight)
        {
            this.speedY *= -1
        }

        this.draw()

    }


}