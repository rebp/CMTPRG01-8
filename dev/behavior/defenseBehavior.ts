class DefenseBehavior implements PlayerBehavior {
    
    private player: Player

    constructor(player: Player) {
        this.player = player
    }

    public setBehavior() {
        this.player.element.className = 'flicker'
        this.player.setAttackState(true)        
        this.player.setAccelerator(12)
    }
}