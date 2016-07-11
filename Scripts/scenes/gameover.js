var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// GAME_OVER SCENE
var scenes;
(function (scenes) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function GameOver() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        GameOver.prototype.start = function () {
            // add the WELCOME Label to the MENU scene
            this._gameOverLabel = new objects.Label("GAME OVER", "60px Consolas", "#000000", config.Screen.CENTER_X, config.Screen.CENTER_Y, true);
            this.addChild(this._gameOverLabel);

            // add the START button to the MENU scene
            this._startOverButton = new objects.Button("StartButton", config.Screen.CENTER_X - 20, config.Screen.CENTER_Y + 80, true);
            this.addChild(this._startOverButton);

            // add the QUIT button to finish
            this._quitButton = new objects.Button("QuitButton", config.Screen.CENTER_X + 20, config.Screen.CENTER_Y + 80, true);
            this.addChild(this._quitButton);

            // START Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);

            // QUIT Button event listener
            this._quitButton.on("click", this._quitOverButtonClick, this);

            // add this scene to the global stage container
            stage.addChild(this);
        };

        // INTRO Scene updates here
        GameOver.prototype.update = function () {
        };

        //EVENT HANDLERS ++++++++++++++++++++
        // START Button click event handler
        GameOver.prototype._startOverButtonClick = function (event) {
            // Switch to the LEFT_CAVE Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        };

        // QUIT Button click event handler
        GameOver.prototype._quitOverButtonClick = function (event) {
            // Finish Game
            if (confirm("Quit Game?")) {
                window.close();
            }
        };
        return GameOver;
    })(objects.Scene);
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
