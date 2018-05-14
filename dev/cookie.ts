/// <reference path="./DomObject.ts" />

class Cookie extends DomObject {

    constructor() {
        super( "cookie")
        this.randomPosition()

    }

    public update():void {

        this.draw()

    }


}