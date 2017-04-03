<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Animate demo</title>

    <link rel="stylesheet" href="../grid.css">

    <script src="../namespaceapplication/build/namespaceapplication.js"></script>
    <script src="build/animate.js"></script>

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
        </ul>
    </div>
    <div id="page" class="valign_top">
        <div id="desc"></div>
        <div id="move">
            <canvas id="canvas"></canvas><svg id="svg1"></svg>
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