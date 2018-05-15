/// <reference path="./DomObject.ts" />

class Player extends DomObject {

    private behavior : PlayerBehavior

    private attackState:boolean = false
    private accelerator:number = 0

    constructor() {
        super( "player")
        this.randomPosition()

        this.behavior = new NormalBehavior(this)
        
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

        this.behavior.setBehavior()

        this.draw()
    }

    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 37:
            this.speedX = -this.accelerator
            break
        case 39:
            this.speedX = this.accelerator
            break
        case 38:
            this.speedY = -this.accelerator
            break
        case 40:
            this.speedY = this.accelerator
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

    public getAttackState() : boolean {
        return this.attackState
    }

    public setAttackState(state:boolean) :void {
       this.attackState = state
    }

    public setAccelerator(accelerator:number) :void {
        this.accelerator = accelerator
    }

    public setBehavior(behavior: PlayerBehavior):void {
        this.behavior = behavior
    }

}