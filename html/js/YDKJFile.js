/********** YDKJFile **********/

var preloadpool = new Array();
var preloadfifo = new Array();
var preloadprocesses = 0;
var fileID = 0;
function YDKJFile(filetype,url) {
  this.id = fileID++;
  this.filetype = filetype;
  this.url = url;
  this.res = 0;
  
  this.preloaded = 0;
  this.readyFunctions = [];
  
  if (preloadprocesses < 2) {
    preloadprocesses++;
    this.preload();
  } else preloadfifo.push(this);
}

YDKJFile.prototype.preload = function(f) {
  var thisFile = this;
  var preload = jQuery('#preload');
  
  var isready = function() {
    thisFile.preloaded = 1;
    
    var nextfile = preloadfifo.shift();
    if (nextfile) nextfile.preload(); else preloadprocesses--;
    
    for(var i = 0; i < thisFile.readyFunctions.length; i++) {
      thisFile.readyFunctions[i].call(thisFile);
    }
  }
  
  if (this.filetype == 'gif') {
    this.res = preload.append('<img />').children().last().attr('id','file'+this.id).attr('src',this.url)
    this.res.imagesLoaded(isready);
  }
  
  if (this.filetype == 'js') {
    jQuery.ajax({
      url: this.url,
      type: 'get',
      dataType: 'text',
      success: function(html, status, xhr) {
        var res = new Array();
        eval(html);
        thisFile.res = res;
        isready();
      },
      error: function (xhr, ajaxOptions, thrownError){
        //displayLoader(false);
      }
    });
  }
  
  if (this.filetype == 'audio') {
    this.res = preload.append('<audio />').children().last().attr('id','file'+this.id);
    var a = this.res.get(0);
    if (a.canPlayType('audio/ogg')) this.res.append('<source />').children().last().attr('type','audio/ogg').attr('src',this.url+'.ogg');
    else if (a.canPlayType('audio/mpeg')) this.res.append('<source />').children().last().attr('type','audio/mpeg').attr('src',this.url+'.mp3');
    else {
      this.res.append('<source />').children().last().attr('type','audio/ogg').attr('src',this.url+'.ogg');
      this.res.append('<source />').children().last().attr('type','audio/mpeg').attr('src',this.url+'.mp3');
    }
    waitForAudio(this.res,isready);
  }
}

YDKJFile.prototype.ready = function(f) {
  if (!this.preloaded) this.readyFunctions.push(f); else f.call(this);
}

YDKJFile.prototype.free = function() {
  preloadpool[this.url].used--;
  if (preloadpool[this.url].used <= 0) {
    jQuery('#preload').find('#file'+this.id).remove();
    this.res = undefined;
    preloadpool[this.url] = 0;
  }
}

function getYDKJFile(filetype,url) {
  if (preloadpool[url]) {
    preloadpool[url].used++;
    return preloadpool[url].file;
  }
  var f = new YDKJFile(filetype,url);
  preloadpool[url] = {file:f,used:1};
  return f;
}