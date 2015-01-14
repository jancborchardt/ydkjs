/********** YDKJGame **********/

function YDKJGame(html, demomode) {
    var thisGame = this;
    if (!demomode) demomode = false;
    this.html = html;
    this.api = new YDKJAPI(this, demomode);
    jQuery.fx.interval = 66;
    this.playersready = this.api.players();
    this.gamemodeready = this.api.gamemode();
    this.currentmode = 0;

    // Gestion du fullscreen
    var onresize = function() {};
    var onfullscreenoff = function() {};
    var oldcssbody = '';
    var oldcssscreen = '';
    var body = jQuery('body');
    var thewindow = jQuery(window);

    thewindow.resize(function() {
        // This will execute whenever the window is resized
        onresize();
    });

    thewindow.keyup(function(event) {
        if (event.keyCode == 27) {
            onresize = function() {};
            body.attr('style',oldcssbody);
            thisGame.html.screen.attr('style',oldcssscreen);
            onfullscreenoff();
            onfullscreenoff = function() {};
        }
    });

    this.fullscreen = function(f) {
        var autozoom = function() {
            var zoom = Math.min(jQuery(window).width()/640,jQuery(window).height()/480);
            var centerup = Math.max(0,Math.round((jQuery(window).height()-(zoom*480))/4));
            body.css({
                'background-color': '#000',
                'margin-top': '640px',
                'padding-top': '640px',
                'overflow': 'hidden',
                'zoom': zoom.toFixed(2),
                '-moz-transform-origin': '50% 0',
                '-moz-transform': 'scale('+zoom.toFixed(2)+','+zoom.toFixed(2)+')'}).css('zoom',(zoom*100).toFixed(0)+'%');
            thisGame.html.screen.css({
                'top': centerup+'px'
            });
        };
        onfullscreenoff = f;
        oldcssbody = body.attr('style');
        oldcssscreen = thisGame.html.screen.attr('style');
        thisGame.html.screen.css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'right': '0',
            'margin': '0 auto'});

        onresize = autozoom;
        autozoom();
    }
}

YDKJGame.prototype.start = function() {
    var thisGame = this;
    this.playersready(function (players) {
        thisGame.players = players;
        thisGame.gamemodeready(function (gamemode) {
            gamemode.start();
        });
    });
};

YDKJGame.prototype.fullscreen = function(f) {
    this.fullscreen(f);
};

YDKJGame.prototype.displayPlayer = function(playernumber,position,outof) {
    var x;
    if (!position) position = playernumber;
    if (!outof) outof = this.players.length;
    if (outof == 3) {
        x=[106,320,533];
    }
    if (outof == 1) {
        x=[320];
    }

    var playerdiv = jQuery('<div />').css({
        'position':'absolute',
        'z-index':'1000',
        'left':(x[position-1]-100)+'px',
        'top':'400px',
        'width':'200px',
        'text-align':'center',
        'color':'#FFF',
        'font-family':'JackRoman',
        'font-size':'20px',
        'line-height':'30px',
        'display':'none'
    }).appendTo(this.html.screen);

    jQuery('<div />').addClass('name').css({'position':'relative'}).html(this.players[playernumber-1].name).appendTo(playerdiv);
    jQuery('<div />').addClass('score').css({'position':'relative'}).html(this.players[playernumber-1].score+' F').appendTo(playerdiv);

    return playerdiv;
};
