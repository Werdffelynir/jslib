<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Animate demo</title>
    <link rel="stylesheet" href="/grid/grid.css">

    <script src="/namespaceapplication/namespaceapplication.js"></script>

    <script src="/animate/build/animate.js"></script>

    <script src="/animate/extensions/animate.extensions.grid.js"></script>
    <script src="/animate/extensions/animate.extensions.maskmap.js"></script>

    <script src="/callback.manager.js"></script>

    <style>
        html, body {
            background: #393939;
            color: #ffffff;
            font-family: sans, sans-serif, Vrinda, Arial, fantasy;
        }
        #menu{
            width: 180px;
            max-height: 600px;
        }
        #menu ul{
            overflow: auto;
        }
        #menu>ul>li{  }
        #menu>ul>li>{  }
        #menu>ul>li>ul{  }
        #menu>ul>li>ul>li{  }
        span.toggle{
            display: block;
            padding: 3px 10px;
            border-bottom: 6px solid #4e4e4e;
            background-color: #5f5f5f;
            color: #9a9a9a;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
        }
        span.toggle:hover{
            background-color: #585858;
        }
        ul.toggle{  }
        ul.toggle > li a{
            display: block;
            padding: 1px 15px;
            border-bottom: 2px solid #4e4e4e;
            background-color: #424242;
            color: #dcdcdc;
            font-size: 12px;
        }
        ul.toggle > li a:hover{
            background-color: #3a3a3a;
        }

        .logo{
            display: block;
            padding: 8px 10px;
            background-color: #4e4e4e;
            color: #333333;
            font-size: 105%;
            text-align: center;
            font-weight: bold;
        }
        #title{
            padding: 2px 10px;
            font-family: monospace, Consolas, sans-serif;
            border-bottom: 2px solid #4e4e4e;
            font-size: 12px;
        }
        #canvas{
            margin: 10px;
            border: 2px solid #b30000;
            background-color: #ffffff;
        }
    </style>
</head>
<body>

<div class="table">
    <div id="menu" class="valign-top">
        <?php include 'index.menu.php'?>
    </div>
    <div id="page" class="valign-top">
        <div id="title"></div>
        <div id="description"></div>
        <div id="before"></div>
        <div id="move">
            <canvas id="canvas" class="select_off"></canvas>
        </div>
        <div id="after"></div>
    </div>
</div>

<script>
    (function () {
        var closed_menu = true,
            src,
            path = location.pathname,
            node_title = NSA.query('#title');

        // menu size
        // NSA.css('#menu>ul', 'max-height', window.innerHeight + 'px');

        // menu toggles
        NSA.each(NSA.queryAll('span.toggle'), function(item){
            if (closed_menu)
                NSA.hide(item.nextElementSibling);
            NSA.on(item, 'click', function (event) {
                NSA.toggle(event.target.nextElementSibling);
            })
        });

        if (path.indexOf('.js') > -1) {
            src = '/animate/demo/' + path.split('/animate/')[1];
            NSA.inject(node_title, '<h4>' + src + '</h4>');
            NSA.loadJS(src,
                function () {
                    // open selected element
                    var sele = 'a[href$="'+src.substr(path.lastIndexOf('/') + 1)+'"]';
                    NSA.css(NSA.query(sele), 'font-weight: bold');
                    NSA.show(NSA.query(sele).parentNode.parentNode);

                },
                function () {
                    console.error('Error Loaded: ' + src);
                });
        }

    })();
</script>
</body>
</html>
