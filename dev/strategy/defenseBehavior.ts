class DefenseBehavior implements PlayerBehavior {
    
    private player: Player

    constructor(player: Player) {
        this.player = player
    }

    collision(): void {
        console.log("defense collision")
    }

    public setBehavior() {
        this.player.element.className = 'flicker'     
        this.player.setAccelerator(12)
    }
}