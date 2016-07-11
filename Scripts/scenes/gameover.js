var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
Author: Changbae Lee(300770812)
Service URL: http://changbaelee-slotmachine.azurewebsites.net/
Description: Web App called Slot machine is developed with CreateJS framework
Revision History: It is managed with GitHub (https://github.com/TX-9/COMP397-S2016-SlotMachine)
Last Modified by: Changbae Lee
Last Modified date: Jul 11, 2016
*/
// GAME_OVER SCENE - the last scene
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
            this._gameOverLabel = new objects.Label("Play again or Quit?", "40px Consolas", "#000000", config.Screen.CENTER_X, config.Screen.CENTER_Y, true);
            this.addChild(this._gameOverLabel);

            // add the START button to the MENU scene
            this._startOverButton = new objects.Button("StartButton", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 80, true);
            this.addChild(this._startOverButton);

            // add the QUIT button to finish
            this._quitButton = new objects.Button("QuitButton", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 80, true);
            this.addChild(this._quitButton);

            // START Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);

            // QUIT Button event listener
            this._quitButton.on("click", this._quitOverButtonClick, this);

            // add this scene to the global stage container
            stage.addChild(this);
        };

        // GAME_OVER Scene updates here
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
            if (confirm("Do you want to quit game?")) {
                var objWindow = window.open(location.href, "_self");
                objWindow.close();
                //  window.opener = window;
                // window.close();
            }
        };
        return GameOver;
    })(objects.Scene);
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
