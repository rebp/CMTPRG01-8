class Game {

    private static instance: Game;

    private enemies: Enemy[] = []
    private cookies: Cookie[] = []
    private addEnemy: boolean = true
    private player: Player

    private upgrades: CookiesAndMilk[] = []

    private statusbar:HTMLElement
    private textfield:HTMLElement

    private level:number = 0
    private score:number = 0
    
    
   private constructor() {

        this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement

        this.player = new Player()
        
        for(let i = 0; i < 2; i++) {
            this.enemies.push(new Enemy(this.player))
        }

        this.cookies.push(new Cookie())
        
        setInterval( () => {

            if (this.upgrades.length == 0) {
                this.upgrades.push(new CookiesAndMilk())
            }
            
        }, 10000 )


        this.gameLoop()
    }
    
    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    gameLoop() {

        for(const enemy of this.enemies ) {
            enemy.update()

            if( Util.checkCollision(this.player.getBoundingClientRect(), enemy.getBoundingClientRect()) ){
                this.player.collision()
            }

            for(const upgrade of this.upgrades) {

                if( Util.checkCollision(upgrade.getBoundingClientRect(), enemy.getBoundingClientRect()) ) {
                    let c = this.upgrades[0]
                    let i = this.upgrades.indexOf(c)
                    this.upgrades.splice(i, 1)
                    upgrade.element.remove()

                    this.score = this.score - 2
                    if(this.score < 1) {
                        this.score = 0
                    }                    
                    this.textfield.innerHTML = "Score: " + this.score 

                }

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

                this.score ++
                this.textfield.innerHTML = "Score: " + this.score 
            }
            
            for(const enemy of this.enemies ) {
                if(Util.checkCollision(cookie.getBoundingClientRect(), enemy.getBoundingClientRect()) ){
                    let c = this.cookies[0]
                    let i = this.cookies.indexOf(c)
                    this.cookies.splice(i, 1)
                    cookie.element.remove()
                    this.cookies.push(new Cookie())

                    this.score --
                    if(this.score < 1) {
                        this.score = 0
                    }                    
                    this.textfield.innerHTML = "Score: " + this.score 
                }
            }

        }

        for(const upgrade of this.upgrades) {

            upgrade.update()

            if( Util.checkCollision(this.player.getBoundingClientRect(), upgrade.getBoundingClientRect()) ) {

                this.player.notifyAllObservers()

                let c = this.upgrades[0]
                let i = this.upgrades.indexOf(c)
                this.upgrades.splice(i, 1)
                upgrade.element.remove()

                this.player.setBehavior(new DefenseBehavior(this.player))

                setTimeout(() => { 
                    this.player.setBehavior(new NormalBehavior(this.player))
                }, 5000)
            }
            
        }

        if(this.addEnemy) {
            if (this.score == 10) {
                this.enemies.push( new Enemy(this.player) )   
                this.addEnemy = false  
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
                this.textfield.innerHTML = `GAME OVER <br /> <br />
                                            Score: ${this.score}`         
                setTimeout(function(){
                    $this.statusbar.style.backgroundPositionX = "0px" 
                    alert() 
                    $this.reset() 
                }, 300)        
                break;

        }
        
    }

    public reset() {
        this.level = 0
        this.score = 0
        this.textfield.innerHTML = "Score: " + this.score 
    }

    public getScore():number {
        return this.score
    }
    

}

window.addEventListener("load", () => {  Game.getInstance() });