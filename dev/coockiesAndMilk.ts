/// <reference path="./DomObject.ts" />

class CookiesAndMilk extends DomObject {

    constructor() {
        super( "cookiesandmilk")
        this.randomPosition()
    }

    public update():void {
        this.draw()
    }


}