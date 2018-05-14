class Game {

    private enemies: Enemy[] = []
    private player: Player

    private cookies: Cookie[] = []
    
    constructor() {

        this.player = new Player()
        this.enemies.push(new Enemy())
        this.enemies.push(new Enemy())
        this.enemies.push(new Enemy())
        this.enemies.push(new Enemy())
        this.cookies.push(new Cookie())

        this.gameLoop()
    }

    gameLoop() {

        for(const enemy of this.enemies ) {
            enemy.update()

            if( Util.checkCollision(this.player.getBoundingClientRect(), enemy.getBoundingClientRect()) ){
                this.player.randomPosition()
            }
        }

        for (const cookie of this.cookies) {
            cookie.update()

            if( Util.checkCollision(cookie.getBoundingClientRect(), this.player.getBoundingClientRect()) ) {
                let c = this.cookies[0]
                let i = this.cookies.indexOf(c)
                this.cookies.splice(i, 1)
                cookie.element.remove()
                this.cookies.push(new Cookie())

            }            

        }
        this.player.update()

        requestAnimationFrame(() => this.gameLoop())
    }

}

window.addEventListener("load", () => new Game())