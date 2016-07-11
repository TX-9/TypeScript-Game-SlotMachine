/* 
Author: Changbae Lee(300770812)
Service URL: http://changbaelee-slotmachine.azurewebsites.net/
Description: Web App called Slot machine is developed with CreateJS framework
Revision History: It is managed with GitHub (https://github.com/TX-9/COMP397-S2016-SlotMachine)
Last Modified by: Changbae Lee
Last Modified date: Jul 11, 2016
*/
// MENU SCENE - the first scene
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _startButton: objects.Button;
        private _welcomeLabel: objects.Label;
        private _logoImage: createjs.Bitmap;
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    

             // add background image to the scene
            this._logoImage = new createjs.Bitmap(assets.getResult("SlotMachineLogo"));
            this._logoImage.x = config.Screen.CENTER_X - 120;
            this._logoImage.y = config.Screen.CENTER_Y - 100;
            this.addChild(this._logoImage);

            // add the START button to the MENU scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 170, true);
            this.addChild(this._startButton);
            
            // START Button event listener
            this._startButton.on("click", this._startButtonClick, this);

           
            // Setup Background
            this._setupBackground("WhiteBackground");
           
            // FadeIn
            this._fadeIn(500);
           
            // add this scene to the global stage container
            stage.addChild(this);

           
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {
            //FadeOut 
            this._fadeOut(500, () => {
                // Switch to the SLOT_MACHINE Scene
                scene = config.Scene.SLOT_MACHINE;
                changeScene();
            });
        }

    }
}