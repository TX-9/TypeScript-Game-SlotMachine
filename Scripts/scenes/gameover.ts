/* 
Author: Changbae Lee(300770812)
Service URL: http://changbaelee-slotmachine.azurewebsites.net/
Description: Web App called Slot machine is developed with CreateJS framework
Revision History: It is managed with GitHub (https://github.com/TX-9/COMP397-S2016-SlotMachine)
Last Modified by: Changbae Lee
Last Modified date: Jul 11, 2016
*/
// GAME_OVER SCENE - the last scene
module scenes {
    export class GameOver extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _startOverButton:objects.Button;
        private _gameOverLabel:objects.Label;
        private _quitButton: objects.Button;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    
            
            // add the WELCOME Label to the MENU scene
            this._gameOverLabel = new objects.Label(
                "Play again or Quit?", 
                "40px Consolas", 
                "#000000", 
                config.Screen.CENTER_X, 
                config.Screen.CENTER_Y, true);
            this.addChild(this._gameOverLabel);      
                   
            // add the START button to the MENU scene
            this._startOverButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X - 100,
                config.Screen.CENTER_Y + 80, true);
            this.addChild(this._startOverButton);
            
             // add the QUIT button to finish
            this._quitButton = new objects.Button(
                "QuitButton",
                config.Screen.CENTER_X + 100,
                config.Screen.CENTER_Y + 80, true);
            this.addChild(this._quitButton);

            // START Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);
           
             // QUIT Button event listener
            this._quitButton.on("click", this._quitOverButtonClick, this);

            // add this scene to the global stage container
            stage.addChild(this);
        }

        // GAME_OVER Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startOverButtonClick(event: createjs.MouseEvent) {
            // Switch to the LEFT_CAVE Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }

         // QUIT Button click event handler
        private _quitOverButtonClick(event: createjs.MouseEvent) {
            // Finish Game
            if (confirm("Do you want to quit game?")) {
                window.close();
            }
        }
        
    }
}