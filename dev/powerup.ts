/// <reference path="./DomObject.ts" />

class Powerup extends DomObject {

    constructor(type : string) {
        super(type)
        this.randomPosition()
    }

    public update():void {
        this.draw()
    }

}