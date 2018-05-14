class Game {

    private enemies: Enemy[] = []
    private cookies: Cookie[] = []
    private player: Player

    private statusbar:HTMLElement
    private textfield:HTMLElement

    private level:number = 0
    private score:number = 0
    
    
    constructor() {

        this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement

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
                this.subtractLevel()
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

                this.scorePoint()

            }            

        }
        this.player.update()

        requestAnimationFrame(() => this.gameLoop())
    }

    public subtractLevel(){

        const $this = this
        this.level ++

        switch (this.level) {
            case 1:
                this.statusbar.style.backgroundPositionX = "-72px"
                break;
            case 2:
                this.statusbar.style.backgroundPositionX = "-144px"
                break;
            case 3:
            this.statusbar.style.backgroundPositionX = "-216px"
                break;
            case 4:
                this.statusbar.style.backgroundPositionX = "-288px"               
                setTimeout(function(){
                    $this.statusbar.style.backgroundPositionX = "0px" 
                    alert("Game Over") 
                    $this.reset() 
                }, 300)        
                break;

        }
        
    }

    public scorePoint() {
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score 
    }

    public reset() {
        this.level = 0
        this.score = 0
        this.textfield.innerHTML = "Score: " + this.score 
    }

    

}

window.addEventListener("load", () => new Game())