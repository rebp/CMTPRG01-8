class NormalBehavior implements PlayerBehavior {
    
    private player: Player

    constructor(player: Player) {
        this.player = player
    }

    public setBehavior() {

        if( this.player.element.classList.contains('flicker') ){
            this.player.element.classList.remove('flicker')
        }

        this.player.setAccelerator(6)
    }
}