<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Animate demo</title>

    <link rel="stylesheet" href="../grid.css">

    <script src="../jsmb_ns/ns_v0.2.2.js"></script>
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
            <li><a href="demo.js">demo.js</a></li>
            <li><a href="shape-house.js">shape-house.js</a></li>
            <li><a href="mouse-events.js">mouse-events.js</a></li>
            <li><a href="text.js">text.js</a></li>
            <li><a href="rocket.js">rocket.js</a></li>
            <li><a href="active-balls.js">active-balls.js</a></li>
        </ul>
    </div>
    <div id="page" class="valign_top">
        <div id="desc"></div>
        <div id="move">
            <canvas id="canvas"></canvas>
        </div>
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

            NamespaceApplication.loadJS('/jsmb_animate/demo/' + src, function() {
                console.log('Loaded: ' + src);
            });
        }

    })();
</script>
</body>
</html>