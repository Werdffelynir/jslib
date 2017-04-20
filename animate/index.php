<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Animate demo</title>

    <link rel="stylesheet" href="../grid.css">

    <script src="../namespaceapplication/build/namespaceapplication.js"></script>
    <script src="build/animate.js"></script>
    <script src="extensions/animate.extensions.grid.js"></script>

    <style>
        #menu{
            width: 180px;
        }
        #menu ul{
            max-height: 500px;
            overflow: auto;
        }
        #canvas{
            border: 2px solid #ddd;
        }
    </style>
</head>
<body>

<div class="table">
    <div id="menu" class="valign_top">
        <ul>
            <li><a href="shape-generator.js">Shape Generator</a></li>
            <li><a href="graphic-shapes.js">Graphic Shape</a></li>
            <li><a href="background-circle.js">Background Circle</a></li>
            <li><a href="fox-gardener.js">Game Fox Gardener</a></li>
            <li><a href="camera.js">Camera</a></li>
            <li><a href="mouse-cursor.js">Mouse-Cursor</a></li>
            <li><a href="space-runner.js">Space Runner</a></li>
            <li><a href="attacker.js">Attacker demo</a></li>
            <li><a href="ping-pong.js">Ping-Pong</a></li>
            <li><a href="tank_defender.js">Tank Defender</a></li>
            <li><a href="noise.js">NOISE</a></li>
            <li><a href="planet.js">Planet</a></li>
            <li><a href="rocket-station.js">Rocket Station</a></li>
            <li><a href="spacewalker.js">SpaceWalker Game</a></li>
            <li><a href="walker.js">Walker Game</a></li>
            <li><a href="platformer.js">Platformer Game</a></li>
            <li><a href="carmove.js">Car move Game</a></li>
            <li><a href="carmove-2.js">Car move 2 Game</a></li>
            <li><a href="map-mask.js">Map Mask</a></li>
            <li><a href="map-mask-2.js">Map Mask 2</a></li>
            <li><a href="sprite-dev.js">sprite-dev</a></li>
        </ul>
    </div>
    <div id="page" class="valign_top">
        <div id="desc"></div>
        <div id="move">
            <canvas id="canvas" class="select_off"></canvas>
<!--            <svg id="svg1"></svg>-->
        </div>
        <div id="after"></div>
    </div>
</div>

<script>
    (function () {

        var
            src,
            url = location.pathname,
            desc = NamespaceApplication.query('#desc');

        if (url.indexOf('.js') > -1) {
            src = url.substr(url.lastIndexOf('/') + 1);

            NamespaceApplication.inject(desc, '<h4>' + src + '</h4>');

            NamespaceApplication.loadJS('/animate/demo/' + src, function() {
                console.log('Loaded: ' + src);
            });
        }

    })();
</script>
</body>
</html>