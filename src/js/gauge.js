var MODULE = (function () {

    var my = {
        circularColor:[
        ],
        circularText:{
            'fontFamily':'Arial',
            'fontSize':'12',
            'position':'outside',
            'elementsName':[
                '31',
                '32',
                '41',
                '64',
                '75',
                '32',
                '14'
            ]
        },
        aperture: 210,
        drawElements: 6,
        divisionsPerSection: 10,

    };

    my.getPointOnCircle = function(cx, cy, radius, angle) {
        // Находим точку на кольце
        // Параметры:
        // radius - радиус кольца
        // angle - угол, начиная от пересечения кольца с осью OX
        // 270 - смещение начала отрисовки кольца в отрицательной плоскости OY
        return {
            x: cx + radius * Math.cos(Math.PI * (angle + 270 - my.aperture/2) / 180),
            y: cy + radius * Math.sin(Math.PI * (angle + 270 - my.aperture/2) / 180)
        };
    };


    my.drawParts = function(cx,cy,radius){
        // Отрисовка gauge
        // Параметры:
        // cx - начало координат кольца, ось OX
        // cy - начало координат кольца, ось OY
        var angularPart = this.aperture/this.drawElements;

        for (var i=0; i<=this.drawElements; i++){
            if (i !== this.drawElements){
                this.drawPartOfCircle(cx,cy,radius, i*angularPart, (i+1)*angularPart);
                for (var j=1; j<this.divisionsPerSection; j++){
                    this.drawDivisionCircle(cx,cy,radius+15, i*angularPart+j*angularPart/this.divisionsPerSection, '1', 'black');
                }
            }
            this.drawDivision(cx,cy,radius+20, i*angularPart, i);
            this.drawDivisionLabel(cx,cy,radius+30, i*angularPart, i);
            console.log(this.divisionsPerSection);

        }

        this.drawArrow(cx,cy,radius-40, 1*angularPart, 10, '#000', '#ccc');

    };

    my.drawArrow = function(cx, cy, radius, arrowAngle, radiusCircle, colorCircle, colorArrow){
        // Отрисовка стрелки
        // Параметры:
        // cx - начало координат кольца, ось OX
        // cy - начало координат кольца, ось OY
        // radius - длина стрелки, ось OY
        var svg, startPointOnCircle, endPointOnCircle, newpath, startAngular, angle;
        svg = document.getElementById('gauge2');
        startPointOnCircle = this.getPointOnCircle(cx, cy, radiusCircle, arrowAngle);

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
        newpath.setAttributeNS(null, "cx", 400);
        newpath.setAttributeNS(null, "cy", 300);
        newpath.setAttributeNS(null, "r", radiusCircle);
        newpath.setAttributeNS(null, "fill", colorCircle);
        svg.appendChild(newpath);

        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, arrowAngle);


        this.drawPolygon(cx, cy, radiusCircle, colorArrow, arrowAngle, svg);
    };

    my.drawPartOfCircle = function(cx,cy,radius,startAngle, endAngle){
        // Рисуем часть кольца
        // Находим начальные координаты
        var svg, startPointOnCircle, endPointOnCircle, newpath;
        svg = document.getElementById('gauge2');
        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
        endPointOnCircle = this.getPointOnCircle(cx, cy, radius, endAngle);

        this.drawArc(startPointOnCircle, endPointOnCircle, radius, svg);
    };

    my.drawPolygon = function(cx, cy, radiusCircle, colorArrow, angle, domElement){
        // Рисуем полигон
        // Параметры:
        // cx - начало координат кольца, ось OX
        // cy - начало координат кольца, ось OY
        // radiusCircle - радиус кольца у стрелки
        // radius - длина стрелки
        // colorArrow - цвет стрелки
        // angle - угол поворота, относительно OY
        // domElement - элемент дерева


        // Переводим параметрический угол в начало измерительных зачений gauge
        angle = (angle  + 180 - my.aperture/2);

        var newpath;
        newpath = document.createElementNS('http://www.w3.org/2000/svg',"polygon");
        newpath.setAttributeNS(null, "points",
            '400,500 '+
            (cx+radiusCircle/2)+','+(cy)+' '+
            (cx-radiusCircle/2)+','+(cy)
        );
        newpath.setAttributeNS(null, "fill", colorArrow);
        newpath.setAttributeNS(null, 'transform', "translate(0) rotate(" + angle + " 400 300)");
        domElement.appendChild(newpath);

    };

    my.drawArc = function(startPointOnCircle, endPointOnCircle, radius, domElement){
        // Рисует дугу из начальных точек в конечные, с определенно-параметрическим радиусом кривизны
        // startPointOnCircle - начальные точки {x,y} {float, float}
        // endPointOnCircle - начальные точки {x,y} {float, float}
        // radius - радиус кривизны дуги {float}
        // domElement - элемент дерева
        var newpath;
        newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");
        newpath.setAttributeNS(null, "d", "M" + startPointOnCircle.x + "," + startPointOnCircle.y + " A" + radius + "," + radius + " 0 0,1 " + endPointOnCircle.x + "," + endPointOnCircle.y);
        newpath.setAttributeNS(null, "stroke", "black");
        newpath.setAttributeNS(null, "stroke-width", 3);
        newpath.setAttributeNS(null, "opacity", 1);
        newpath.setAttributeNS(null, "fill", "none");
        domElement.appendChild(newpath);
    };

    my.drawDivision = function(cx, cy, radius, startAngle, data){ // Рисуем зачения

        var svg, startPointOnCircle, endPointOnCircle, newpath, startAngular;
        svg = document.getElementById('gauge2');
        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
        startAngular = startAngle - this.aperture/this.drawElements/2;

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"rect");
        newpath.setAttributeNS(null, 'x', startPointOnCircle.x);
        newpath.setAttributeNS(null, 'y', startPointOnCircle.y);
        newpath.setAttributeNS(null, 'transform', "translate(0) rotate(" + startAngular + ' '+ startPointOnCircle.x +' '+ startPointOnCircle.y +")");
        newpath.setAttributeNS(null, 'height', '2');
        newpath.setAttributeNS(null, 'width', '10');
        newpath.setAttributeNS(null, 'fill', '#000');
        svg.appendChild(newpath);
    };

    my.drawDivisionLabel = function(cx, cy, radius, startAngle, data){
        var svg, startPointOnCircle, endPointOnCircle, newpath, startAngular;
        svg = document.getElementById('gauge2');
        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
        startAngular = startAngle - this.aperture/this.drawElements/2-90;

        this.drawText(startPointOnCircle.x, startPointOnCircle.y, "arial", 16, "middle", "translate(0, 0) rotate(" + startAngular + ' '+ startPointOnCircle.x +' '+ startPointOnCircle.y +")", data, svg);
    };

    my.drawDivisionCircle = function(cx, cy, radius, startAngle, radiusCircle, colorCircle){
        var svg, startPointOnCircle, endPointOnCircle, startAngular;
        svg = document.getElementById('gauge2');
        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
        startAngular = startAngle - this.aperture/this.drawElements/2-90;
        console.log(startPointOnCircle.x);
        this.drawCircle(startPointOnCircle.x,startPointOnCircle.y,radiusCircle,colorCircle, svg);
    };

    my.drawCircle = function(cx, cy, r, fill, domElement ){
        var newpath;

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
        newpath.setAttributeNS(null, "cx", cx);
        newpath.setAttributeNS(null, "cy", cy);
        newpath.setAttributeNS(null, "r", r);
        newpath.setAttributeNS(null, "fill", fill);

        domElement.appendChild(newpath);
    };

    my.drawText = function(cx, cy, ff, fz, ta, transform, text, domElement){
        var newpath;

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"text");
        newpath.setAttributeNS(null, "x", cx);
        newpath.setAttributeNS(null, "y", cy);
        newpath.setAttributeNS(null, "font-family", ff);
        newpath.setAttributeNS(null, "font-size", fz);
        newpath.setAttributeNS(null, "text-anchor", ta);
        newpath.setAttributeNS(null, 'transform', transform);

        domElement.appendChild(newpath).innerHTML = text;
    };



    return my;
}());


//TODO sdelat' setting

//MODULE.circularColorChange([
//    '#56503D',
//    '#56503D',
//    '#56503D',
//    '#56503D',
//    '#56503D',
//    '#56503D',
//    '#56503D',
//    '#56503D',
//    '#56503D',
//    '#CEA229',
//    '#CEA229',
//    '#A31313'
//]);
//
//MODULE.textOnCircular({
//    'fontFamily':'Arial',
//    'fontSize':'14',
//    'position':'outside',
//    'elementsName':[
//        '0',
//        '1',
//        '2',
//        '3',
//        '4',
//        '5',
//        '6'
//    ]}
//);

MODULE.drawParts(400, 300, 200);
console.log(MODULE);
