<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Demo YDKJ FR</title>
<link href="css/ydkj.css" rel="stylesheet"/>
<script src="js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="js/SeamlessLoop.js" type="text/javascript"></script>

<script src="js/demo-res.js" type="text/javascript"></script>
<script src="js/common.js" type="text/javascript"></script>
<script src="js/YDKJFile.js" type="text/javascript"></script>
<script src="js/YDKJAnimation.js" type="text/javascript"></script>
<script src="js/YDKJResource.js" type="text/javascript"></script>
<script src="js/ModeIntro.js" type="text/javascript"></script>
<script src="js/ModeCategory.js" type="text/javascript"></script>
<script src="js/ModeQuestion.js" type="text/javascript"></script>
<script src="js/ModeDisOrDat.js" type="text/javascript"></script>
<script src="js/YDKJMode.js" type="text/javascript"></script>
<script src="js/YDKJGame.js" type="text/javascript"></script>

<script type="text/javascript">

jQuery(document).ready(function() {
  jQuery('#startbutton').val("J'ai compris, commencer le jeu");
})

function startgame() {
  jQuery('#warning').hide();
  jQuery('#screen').show();

  jQuery(document).ready(function() {
    var game = new YDKJGame();
    game.start();
  });
}

</script>
</head>

<body style="background-color:#000;margin:0;padding:0;border:0">
  <div id="warning" style="border:#F00 1px solid; background-color:#300;color:#FFF;margin:50px;padding:20px;font-family:JackCondensed;font-size:18px">
    <div style="text-align:center;font-size:42px;font-weight:bold">You Don't Know JACK DEMO FR</div>
    <p style="text-align:center;font-size:24px;font-weight:bold">ATTENTION : A LIRE AVANT DE JOUER ! <span style="font-size:20px">(Si si, vraiment, au moins ce qui est <u>souligné</u>)</span></p>
    <p>
     <u>Ce jeu est sous copyright <a style="color:#F00" href="http://www.jellyvision.com/">JellyVision Games</a></u>. Il est sorti à l'origine en 1995 sur PC et Mac et en 1998 pour la version française (pour en savoir plus, voir la fiche du jeu sur <a style="color:#F00" href="http://fr.wikipedia.org/wiki/You_Don%27t_Know_Jack_%28s%C3%A9rie_de_jeux_vid%C3%A9o%29">Wikipedia</a>), et j'ai décidé d'en faire une version jouable dans un navigateur en extrayant les éléments graphiques et sonores des fichiers du jeu et en réécrivant (comprenez en simulant) le moteur en Javascript.<br/>
     <br/>
     <u>Ceci n'est que la démo du jeu original, et elle est loin d'être finie</u>, beaucoup de choses ne sont pas fonctionnelles. J'ajouterai les éléments au fur et à mesure. Vous pouvez télécharger la démo d'origine en cliquant sur <a style="color:#F00" href="JACKDemo.zip">ce lien</a>.<br/>
     <br/>
     <u>Le jeu fonctionne le mieux dans Firefox et Chrome</u>. Chrome pose quelques problèmes de bugs graphiques et de ralentissements lorsqu'on zoom la page pour avoir l'image en plein écran (mais Firefox le fait très bien). Internet Explorer ne gère pas les polices CSS3 et il a des soucis avec les sons qui s'arrêtent trop tôt. Les navigateurs mobiles quant à eux ont des problèmes avec la gestion des fichiers audio (permission de jouer un seul fichier audio à la fois, et uniquement suite à une action de l'utilisateur...).<br/>
     <br/>
     <u>Le but de ce projet est de transformer le jeu complet et d'y ajouter des fonctionnalités multi-joueurs en ligne</u>. Etant donné mon temps libre et le travail que cela va demander, ce n'est pas pour tout de suite, ni pour demain... mais à suivre ! Si vous ne connaissez pas déjà le jeu, je vous laisse le découvrir.<br/>
     <br/>
     Contact : <a style="color:#F00" href="mailto:demo@ydkj.fr">demo@ydkj.fr</a>
    </p>
    <p style="text-align:center"><br/><input type="button" onclick="startgame()" value="Chargement..." id="startbutton" /><br/>
        <span style="font-size:12px">Super, <span style="color:#FF0"><?php include 'count.txt'; ?></span> personnes ont osé essayer !</span></p>
  </div>
  <div id="screen" style="display:none;background-color:#000;position:relative;width:640px;height:480px;overflow:hidden;margin-left:auto;margin-right:auto;margin-top:15px">
    <img src="ajax-loader.gif" style="position:absolute;left:293px;top:212px" class="markedAsRemoved"/>
  </div> <!-- Couleur #EEE pour l'intro -->
  <div id="tmpscreen" style="display:none"></div>
  <div id="preload" style="display:none"></div>
</body>
</html>