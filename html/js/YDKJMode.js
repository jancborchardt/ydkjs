/********** YDKJMode **********/

function YDKJMode(game, modename, options) {
  this.modeObj = false;
  
  // preload
  if (modename == 'Intro') this.modeObj = new ModeIntro();
  if (modename == 'Category') this.modeObj = new ModeCategory();
  if (modename == 'Question') this.modeObj = new ModeQuestion();
  if (modename == 'DisOrDat') this.modeObj = new ModeDisOrDat();
  
  if (!this.modeObj) return false;
  
  this.modeObj.game = game;
  this.modeObj.options = options;
  this.modeObj.preload();
}

YDKJMode.prototype.start = function() {
  if (!this.modeObj) return false;
  if (this.modeObj.game.currentmode) this.modeObj.game.currentmode.free();
  this.modeObj.game.currentmode = this;
  this.modeObj.skiplistener = 0;
  this.modeObj.start();
}

YDKJMode.prototype.free = function() {
  for (var i in this.modeObj) {
    if (this.modeObj[i] instanceof YDKJResource) {
      this.modeObj[i].free();
      this.modeObj[i] = undefined;
      delete this.modeObj[i];
    }
  }
}