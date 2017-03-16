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
            <li><a href="demo.js">demo.js</a></li>
            <li><a href="shape-house.js">shape-house.js</a></li>
            <li><a href="mouse-events.js">mouse-events.js</a></li>
            <li><a href="text.js">text.js</a></li>
            <li><a href="rocket.js">rocket.js</a></li>
            <li><a href="active-balls.js">active-balls.js</a></li>
            <li><a href="move.js">move.js</a></li>
            <li><a href="move_keys.js">move_keys.js</a></li>
            <li><a href="move_survive.js">move_survive.js</a></li>
            <li><a href="move_between.js">move_between.js</a></li>
            <li><a href="mouse_press.js">mouse_press.js</a></li>
            <li><a href="generator_shape.js">generator_shape.js</a></li>
            <li><a href="line_draw_animation.js">line_draw_animation.js</a></li>
            <li><a href="move_to_click.js">move_to_click.js</a></li>
        </ul>
    </div>
    <div id="page" class="valign_top">
        <div id="desc"></div>
        <div id="move">
            <canvas id="canvas"></canvas>
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