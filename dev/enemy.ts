/// <reference path="./DomObject.ts" />

class Enemy extends DomObject implements Observer{

    private player:Player;

    constructor(player: Player) {
        super( "enemy")

        this.speedX = 5
        this.speedY = -5
        this.randomPosition()

        this.player = player;
        player.add(this)

    }

    public update():void {

        this.x += this.speedX
        this.y += this.speedY
        
        if (this.x < this.minWidth || this.x > this.maxWidth)
        {
            this.speedX *= -1
            
            if(this.speedX < 0) {
                this.element.style.backgroundPositionX = "0px" 
            } else {
                this.element.style.backgroundPositionX = "-100px" 
            }
            
        }
        if (this.y < 0 || this.y > this.maxHeight)
        {
            this.speedY *= -1
        }


        this.draw()

    }

    public notify():void {
        this.speedX = 2
        this.speedY = -2

        setTimeout(() => {
            this.speedX = 5
            this.speedY = -5
        }, 5000);
    }


}