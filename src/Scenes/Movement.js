class Movement extends Phaser.Scene {
    constructor() {
        super("1D Movement");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        this.arrowTravel = 0; // Tracks arrow's distance travelled
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Scribble Platformer Pack"
        // hhttps://kenney.nl/assets/scribble-platformer
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("playerParts", "spritesheet_default.png", "spritesheet_default.xml");

        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Movement.js<br>S - shoot // SPACE<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        this.aKey = this.input.keyboard.addKey('A');
        this.dKey = this.input.keyboard.addKey('D');
        this.spaceKey = this.input.keyboard.addKey('SPACE');

        // Create the main body sprite
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "playerParts", "character_squareRed.png");
        my.sprite.arrow = this.add.sprite(this.bodyX, this.bodyY, "playerParts", "item_arrow.png");
        my.sprite.arrow.rotation = 4.5;
        my.sprite.arrow.visible = false;
    }

    update() {
        let my = this.my;   // create an alias to this.my for readability

        // Move character with A or D movement
        if (this.aKey.isDown && my.sprite.body.x > 25) {
            my.sprite.body.x -= 8;
        }
        if (this.dKey.isDown && my.sprite.body.x < 775) {
            my.sprite.body.x += 8;
        }
        if (this.spaceKey.isDown && this.arrowTravel == 0) {
            my.sprite.arrow.x = my.sprite.body.x;
            my.sprite.arrow.y = 350;
            my.sprite.arrow.visible = true;
            this.arrowTravel = 30;

        }
        
        if (this.arrowTravel > 0) {
            this.arrowTravel--;
            my.sprite.arrow.y -= 12;
        }
        else {
            my.sprite.arrow.visible = false;
        }
    }

}