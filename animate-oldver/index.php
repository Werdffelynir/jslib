<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Animate demo</title>

    <link rel="stylesheet" href="/grid/grid.css">

    <script src="/namespaceapplication/namespaceapplication.js"></script>
    <script src="/animate/build/animate.js"></script>
    <script src="/animate/extensions/animate.extensions.maskmap.js"></script>
    <script src="/animate/extensions/animate.extensions.grid.js"></script>

    <style>

        #menu{
            width: 180px;
        }
        #menu ul{
            max-height: 500px;
            overflow: auto;
        }
        #menu>ul>li{  }
        #menu>ul>li>{  }
        #menu>ul>li>ul{  }
        #menu>ul>li>ul>li{  }
        span.toggle{
            display: block;
            padding: 3px 10px;
            border-bottom: 2px solid #a2a2a2;
            background-color: #c1c1c1;
            color: #000000;
            cursor: pointer;
        }
        span.toggle:hover{
            background-color: #a2a2a2;
        }
        ul.toggle{  }
        ul.toggle > li a{
            display: block;
            padding: 3px 20px;
            border-bottom: 2px solid #505050;
            background-color: #696969;
            color: #f5f5f5;
        }
        ul.toggle > li a:hover{
            background-color: #585858;
        }

        .logo{
            display: block;
            padding: 10px 10px;
            background-color: #1d1d1d;
            color: #ffcc00;
            font-size: 120%;
            text-align: center;
            font-weight: bold;
        }
        #title{
            padding: 2px 10px;
            border-bottom: 2px solid #a2a2a2;
        }
        #canvas{
            margin: 10px;
            border: 2px solid #ddd;
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
        NSA.css('#menu>ul', 'max-height', window.innerHeight + 'px');

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
                    // console.log('LOADED SCRIPT: ' + src);

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