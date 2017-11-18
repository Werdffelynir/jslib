(function () {

    var An = new Animate({
        selector: '#canvas',
        width: 600,
        height: 400,
        fps: 12
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Graphic = An.Graphic();
    var TextField = An.TextField();

    var Pin = {};
    Pin.mode = 'pointer';
    Pin.isMoved = false;
    Pin.moveIndex = null;
    Pin.list = [];
    Pin.isGrid = false;
    Pin.mousePoint = {x:0,y:0};
    Pin.mapPoints = [];
    Pin.isEditable = false;
    Pin.colorPointsLineDefault = 'rgba(725, 85, 195, 0.6)';
    Pin.colorPointsLine = Pin.colorPointsLineDefault;
    Pin.colorPointCircleInnerDefault = '#7C55C2';
    Pin.colorPointCircleInner = Pin.colorPointCircleInnerDefault;
    Pin.colorPointCircleOuterDefault = 'rgba(725, 85, 195, 0.4)';
    Pin.colorPointCircleOuter = Pin.colorPointCircleOuterDefault;

    Pin.onClick = function(event){
        var point = An.mousePosition(event);
        if (Pin.mode === 'pointer') {
            Pin.setPoint(point);
        }
        if (Pin.mode === 'move') {
            var i, rect, p;
            Pin.moveIndex = null;
            for (i = 0; i < Pin.list.length; i ++) {
                p = Pin.list[i];
                rect = [p.x-7.5, p.y-7.5, 15, 15];
                if (An.hitTest(rect, point)) {
                    Pin.moveIndex = i;
                    Pin.isMoved = !Pin.isMoved;
                    break;
                }
            }
        }
    };

    Pin.setPoint = function(point){
        Pin.list.push(point);
    };


    Pin.drawGrid = function (ctx, frameCounter) {
        if (!Pin.isGrid) {
            var i;
            for (i = 0; i < An.width/5; i ++) {
                var i5 = i * 5;
                if (i5 % 100 === 0) {
                    Graphic.line(0, i5, An.width, i5)
                        .thickness(2).color("#C6FFFD").stroke();

                    Graphic.line(i5, 0, i5, An.height)
                        .thickness(2).color('#C6FFFD').stroke();
                }
                else if (i5 % 10 === 0) {
                    Graphic.line(0, i5, An.width, i5)
                        .thickness(2).color('#E2FFFD').stroke();

                    Graphic.line(i5, 0, i5, An.height)
                        .thickness(2).color('#E2FFFD').stroke();
                }
            }
        }


        TextField.text('Arrows - Movie', An.width - 90, 10).font('bold 12px/15px Arial').color('#000000').fill();
        TextField.text('1 - Edit',  An.width - 90, 25).fill();
        TextField.text('2 - Back',  An.width - 90, 40).fill();
        TextField.text('3 - Save',  An.width - 90, 55).fill();
        TextField.text('5 - Clear', An.width - 90, 70).fill();


        // TextField.baseline('middle');
        // TextField.font('normal 11px Arial');
        //TextField.text('TextField Points Line', 200, 200).fill();

        Pin.renderPoints(ctx, frameCounter);

        if (Pin.mode === 'move' && Pin.colorPointsLine === Pin.colorPointsLineDefault) {
            Pin.colorPointsLine = '#FF1E00';
            Pin.colorPointCircleOuter = 'rgba(255, 30, 0, .4)'; // #FF1E00
            Pin.colorPointCircleInner = '#FF1E00'; // #731100
        } else if (Pin.mode === 'pointer' && Pin.colorPointsLine !== Pin.colorPointsLineDefault) {
            Pin.colorPointsLine = Pin.colorPointsLineDefault;
            Pin.colorPointCircleOuter = Pin.colorPointCircleOuterDefault;
            Pin.colorPointCircleInner = Pin.colorPointCircleInnerDefault;
        }
    };


    Pin.generateMapPoints = function(){
        Pin.mapPoints = [];
        Pin.list.map(function(point){
            Pin.mapPoints.push(parseInt(point.x), parseInt(point.y));
        });
        return Pin.mapPoints;
    };
    Pin.renderPoints = function(ctx, fc){
        Pin.generateMapPoints();

        Graphic.shape(Pin.mapPoints)
            .thickness(1)
            .color(Pin.colorPointsLine)
            .stroke();

        Pin.list.map(function(point){

            Graphic.circle(point.x, point.y, 15)
                .thickness(2).color(Pin.colorPointCircleOuter).stroke();
            Graphic.circle(point.x, point.y, 5)
                .thickness(2).color(Pin.colorPointCircleInner).stroke();

            var label = parseInt(point.x) + ' x ' +  parseInt(point.y);
            ctx.fillText(label, point.x + 20, point.y);
        });

    };

























    Pin.onMousemove = function (event, point) {
        //console.log(event, point);
        Pin.mousePoint = An.mousePosition(event);
    };
    Pin.onKeydown = function (event, b) {
        console.log(event, b);
    };



    An.onKeydown = Pin.onKeydown;
    An.onMousemove = Pin.onMousemove;
    // an.onClick = Pin.onClick;
    // an.onFrame = Pin.onFrame;


    An.frame(function (ctx, frameCounter) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        Pin.drawGrid(ctx, frameCounter);

        if (Pin.mode === 'move' && Pin.isMoved && Pin.list[Pin.moveIndex]) {
            Pin.list[Pin.moveIndex].x = Pin.mousePoint.x;
            Pin.list[Pin.moveIndex].y = Pin.mousePoint.y;

            Graphic.line(Pin.mousePoint.x-17, Pin.mousePoint.y, Pin.mousePoint.x+17, Pin.mousePoint.y)
                .stroke();

            Graphic.line(Pin.mousePoint.x, Pin.mousePoint.y-17, Pin.mousePoint.x, Pin.mousePoint.y+17)
                .stroke();
        }

    });

    // start
    An.start();
})();