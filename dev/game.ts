class Game {

    private static instance: Game;

    private enemies: Enemy[] = []
    private cookies: Cookie[] = []
    private player: Player

    private upgrades: CookiesAndMilk[] = []

    private statusbar:HTMLElement
    private textfield:HTMLElement

    private level:number = 0
    private score:number = 0
    
    
    constructor() {

        this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement

        this.player = new Player()
        this.enemies.push(new Enemy(), new Enemy())
        this.cookies.push(new Cookie())        
        this.upgrades.push(new CookiesAndMilk())

        this.gameLoop()
    }
    
    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    gameLoop() {

        let $this = this

        for(const enemy of this.enemies ) {
            enemy.update()

                if($this.player.getAttackState()) {

                } else {
                    if( Util.checkCollision(this.player.getBoundingClientRect(), enemy.getBoundingClientRect()) ){
                        this.player.randomPosition()
                        this.player.element.className = 'flicker'
                        setTimeout(function(){
                            $this.player.element.classList.remove('flicker')
                        }, 500)
                        this.subtractLevel()
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
                if(Util.checkCollision(enemy.getBoundingClientRect(), cookie.getBoundingClientRect())){
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

            if($this.score < 3) {
                upgrade.element.className = 'hide'
            } else {
                upgrade.element.className = 'show'

                if( Util.checkCollision(this.player.getBoundingClientRect(), upgrade.getBoundingClientRect()) ) {
                    let c = this.upgrades[0]
                    let i = this.upgrades.indexOf(c)
                    this.upgrades.splice(i, 1)
                    upgrade.element.remove()

                    this.player.setBehavior(new DefenseBehavior(this.player))

                    setTimeout(() => { 
                        this.player.setBehavior(new NormalBehavior(this.player))
                    }, 7500)
                }
            }



            upgrade.update()
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