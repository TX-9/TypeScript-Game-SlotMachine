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
// SLOT_MACHINE SCENE - the slotmachine scene
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // Reset the Game to initial values
            this._resetAll();

            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);

            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 148, 480, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this);

            // add Bet50Button to the scene
            this._bet50Button = new objects.Button("Bet50Button", 213, 480, false);
            this.addChild(this._bet50Button);
            this._bet50Button.on("click", this._bet50ButtonClick, this);

            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 281, 480, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);

            // add ResetButton to the scene
            this._resetButton = new objects.Button("ResetButton", 346, 480, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);

            // add QuitButton to the scene
            this._gameoverButton = new objects.Button("GameoverButton", 414, 480, false);
            this.addChild(this._gameoverButton);
            this._gameoverButton.on("click", this._gameoverButtonClick, this);

            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 521, 80, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);

            // add JackPot Text to the scene
            this._jackpotText = new objects.Label(this.jackpot.toString(), "36px Consolas", "#FFFF00", 350, 40, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);

            // add Credits Text to the scene
            this._creditsText = new objects.Label(this.playerMoney.toString(), "23px Consolas", "#FFFF00", 255, 386, false);
            this._creditsText.textAlign = "right";
            this.addChild(this._creditsText);

            // add Bet Text to the scene
            this._betText = new objects.Label(this.playerBet.toString(), "23px Consolas", "#FFFF00", 345, 386, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);

            // add Result Text to the scene
            this._resultText = new objects.Label(this.winnings.toString(), "23px Consolas", "#FFFF00", 437, 386, false);
            this._resultText.textAlign = "right";
            this.addChild(this._resultText);

            // Initialize Array of Bitmaps
            this._initializeBitmapArray();

            // Setup Background
            this._setupBackground("WhiteBackground");

            // FadeIn
            this._fadeIn(500);

            // add this scene to the global stage container
            stage.addChild(this);
        };

        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };

        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };

        //Reset variables to start gain
        SlotMachine.prototype._resetAll = function () {
            this.playerMoney = 500;
            this.winnings = 0;
            this.jackpot = 3000;
            this.playerBet = 0;
        };

        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._spinReels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];

            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        };

        /* This function calculates the player's winnings, if any */
        SlotMachine.prototype._determineWinnings = function () {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this.winnings = this.playerBet * 10;
                } else if (this._bananas == 3) {
                    this.winnings = this.playerBet * 20;
                } else if (this._oranges == 3) {
                    this.winnings = this.playerBet * 30;
                } else if (this._cherries == 3) {
                    this.winnings = this.playerBet * 40;
                } else if (this._bars == 3) {
                    this.winnings = this.playerBet * 50;
                } else if (this._bells == 3) {
                    this.winnings = this.playerBet * 75;
                } else if (this._sevens == 3) {
                    this.winnings = this.playerBet * 100;
                } else if (this._grapes == 2) {
                    this.winnings = this.playerBet * 2;
                } else if (this._bananas == 2) {
                    this.winnings = this.playerBet * 2;
                } else if (this._oranges == 2) {
                    this.winnings = this.playerBet * 3;
                } else if (this._cherries == 2) {
                    this.winnings = this.playerBet * 4;
                } else if (this._bars == 2) {
                    this.winnings = this.playerBet * 5;
                } else if (this._bells == 2) {
                    this.winnings = this.playerBet * 10;
                } else if (this._sevens == 2) {
                    this.winnings = this.playerBet * 20;
                } else if (this._sevens == 1) {
                    this.winnings = this.playerBet * 5;
                } else {
                    this.winnings = this.playerBet * 1;
                }
                console.log("Win!");
            } else {
                console.log("Loss!");
            }

            this._resultText.text = this.winnings.toString();
            this.playerMoney += this.winnings;
            this._creditsText.text = this.playerMoney.toString();
            this._resetFruitTally();
        };

        //Reset fruit counters to start again
        SlotMachine.prototype._resetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };

        //initialize first images
        SlotMachine.prototype._initializeBitmapArray = function () {
            this._reels = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Banana"));
                this._reels[reel].x = 178 + (reel * 100);
                this._reels[reel].y = 245;
                this.addChild(this._reels[reel]);
                console.log("reel" + reel + " " + this._reels[reel]);
            }
        };

        //assign bet money and show the amount
        SlotMachine.prototype._placeBet = function (playerBet) {
            // Check player has as enough money as it is more than bet money
            if (playerBet > this.playerMoney) {
                alert("Sorry, not enough money");
            } else {
                this.playerBet += playerBet;
                this.playerMoney -= playerBet;
                this._creditsText.text = this.playerMoney.toString();
                this._betText.text = this.playerBet.toString();
            }
        };

        //EVENT HANDLERS ++++++++++++++++++++
        //Bet button click event
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
            this._placeBet(10);
        };

        //Bet button click event
        SlotMachine.prototype._bet50ButtonClick = function (event) {
            console.log("Bet 50 Credit");
            this._placeBet(50);
        };

        //Bet button click event
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
            this._placeBet(100);
        };

        //Spring button click event
        SlotMachine.prototype._spinButtonClick = function (event) {
            // Check player bet his money
            if (this.playerBet <= 0) {
                alert("Please Bet!");
            } else {
                var bitmap = this._spinReels();
                for (var reel = 0; reel < 3; reel++) {
                    //Show images
                    this._reels[reel].image = assets.getResult(bitmap[reel]);
                    console.log("reel" + reel + " " + this._reels[reel]);
                }

                //Determine the result
                this._determineWinnings();

                // reset player's bet to zero
                this.playerBet = 0;
                this._betText.text = this.playerBet.toString();
            }
        };

        //Reset game variables
        SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("_resetButtonClick");
            this.start();
        };

        //Move to a gameover page
        SlotMachine.prototype._gameoverButtonClick = function (event) {
            console.log("_quitButtonClick");

            //FadeOut
            this._fadeOut(500, function () {
                // Switch to the Game over Scene
                scene = config.Scene.GAME_OVER;
                changeScene();
            });
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
