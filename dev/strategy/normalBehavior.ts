class NormalBehavior implements PlayerBehavior {
    
    private player: Player
    
    constructor(player: Player) {
        this.player = player
    }
    
    collision(): void {
        console.log("normal collision")

        this.player.randomPosition()
        this.player.element.className = 'flicker'
        this.player.setAccelerator(6)
        setTimeout(() => {
            this.player.element.classList.remove('flicker')
        }, 500)
        
        Game.getInstance().subtractLevel()
    }
    public setBehavior() {

        if( this.player.element.classList.contains('flicker') ){
            this.player.element.classList.remove('flicker')
        }

        this.player.setAccelerator(6)
    }
}