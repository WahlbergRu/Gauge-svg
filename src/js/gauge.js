var GAUGE = (function () {

    return {
        domElem: document.getElementById('gauge'),
        aperture: 210,
        radiusGauge: 200,
        divisionsPerSection: 20,
        divisionSettings: {
            width: 2,
            height: 10,
            fill: '#000',
            radius: 1,

            fontFamily:'Arial',
            fontSize:'16',
            position:'outside',

            value: [
                20,
                40,
                '60',
                'asd80',
                '100',
                120
            ]
        },
        arrowSettings: {
            angle: 30,
            radiusCircle: 10,
            colorCircle: '#000',
            colorArrow: '#ccc'
        },
        getPointOnCircle: function(cx, cy, radius, angle) {
        // Находим точку на кольце
        // Параметры:
        // radius - радиус кольца
        // angle - угол, начиная от пересечения кольца с осью OX
        // 270 - смещение начала отрисовки кольца в отрицательной плоскости OY
            return {
                x: cx + radius * Math.cos(Math.PI * (angle + 270 - this.aperture/2) / 180),
                y: cy + radius * Math.sin(Math.PI * (angle + 270 - this.aperture/2) / 180)
            };
        },
        drawParts: function(){
        // Отрисовка gauge частями
        // Параметры:
        // cx - начало координат кольца, ось OX
        // cy - начало координат кольца, ось OY
        // radius - радиус gauge

        // Находим угол между думая точками
        var angularPart = this.aperture/(this.divisionSettings.value.length-1);

        for (var i=0; i<=this.divisionSettings.value.length-1; i++){
            if (i !== this.divisionSettings.value.length-1){
                this.drawPartOfCircle(this.domElem.offsetWidth/2,this.domElem.offsetHeight/2,this.radiusGauge, i*angularPart, (i+1)*angularPart);
                if (this.divisionSettings.position === 'outside'){
                    for (var j=1; j<this.divisionsPerSection; j++){
                        this.drawDivisionCircle(this.domElem.offsetWidth/2,this.domElem.offsetHeight/2,this.radiusGauge+15, i*angularPart+j*angularPart/this.divisionsPerSection, this.divisionSettings.radius, this.divisionSettings.fill);
                    }
                } else {
                    for (var j=1; j<this.divisionsPerSection; j++){
                        this.drawDivisionCircle(this.domElem.offsetWidth/2,this.domElem.offsetHeight/2,this.radiusGauge-15, i*angularPart+j*angularPart/this.divisionsPerSection, this.divisionSettings.radius, this.divisionSettings.fill);
                    }
                }
            }

            if (this.divisionSettings.position === 'outside'){
                for (var j=1; j<this.divisionsPerSection; j++){
                    this.drawDivision(this.domElem.offsetWidth/2,this.domElem.offsetHeight/2,this.radiusGauge+20, i*angularPart, this.divisionSettings.height, this.divisionSettings.width, this.divisionSettings.fill, this.divisionSettings.value[i]);
                    this.drawDivisionLabel(this.domElem.offsetWidth/2,this.domElem.offsetHeight/2,this.radiusGauge+30, i*angularPart, this.divisionSettings.value[i]);
                }
            } else {
                for (var j=1; j<this.divisionsPerSection; j++){
                    this.drawDivision(this.domElem.offsetWidth/2,this.domElem.offsetHeight/2,this.radiusGauge-15, i*angularPart, this.divisionSettings.height, this.divisionSettings.width, this.divisionSettings.fill, this.divisionSettings.value[i]);
                    this.drawDivisionLabel(this.domElem.offsetWidth/2,this.domElem.offsetHeight/2,this.radiusGauge-50, i*angularPart, this.divisionSettings.value[i]);
                }
            }

        }

        //Рисуем стрелку у gauge

        this.drawArrow(this.domElem.offsetWidth/2,this.domElem.offsetHeight/2,this.radiusGauge-40, this.arrowSettings.angle, this.arrowSettings.radiusCircle, this.arrowSettings.colorCircle,this.arrowSettings.colorArrow);

    },
        drawArrow: function(cx, cy, radius, arrowAngle, radiusCircle, colorCircle, colorArrow){
        // Отрисовка стрелки
        // Параметры:
        // cx - начало координат кольца, ось OX
        // cy - начало координат кольца, ось OY
        // radius - длина стрелки, ось OY
        var startPointOnCircle;


        // Рисуем стрелку
        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, arrowAngle);
        this.drawPolygon(cx, cy, radiusCircle, colorArrow, arrowAngle, this.domElem);

        //Рисуем кружок над стрелкой
        startPointOnCircle = this.getPointOnCircle(cx, cy, radiusCircle, arrowAngle);
        this.drawCircle(cx,cy,radiusCircle,colorCircle,this.domElem)
    },
        drawPartOfCircle: function(cx,cy,radius,startAngle, endAngle){
        // Рисуем часть кольца
        // Находим начальные координаты
        var startPointOnCircle, endPointOnCircle;

        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
        endPointOnCircle = this.getPointOnCircle(cx, cy, radius, endAngle);

        this.drawArc(startPointOnCircle, endPointOnCircle, radius, this.domElem);
    },
        drawPolygon: function(cx, cy, radiusCircle, colorArrow, angle, domElement){
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
        angle = (angle  + 180 - this.aperture/2);

        var newpath;
        console.log(cx);
        console.log(cy);
        newpath = document.createElementNS('http://www.w3.org/2000/svg',"polygon");
        newpath.setAttributeNS(null, "points",
            cx+','+ (cy+this.radiusGauge)+ ',' +
            (cx+radiusCircle/2)+','+(cy)+' '+
            (cx-radiusCircle/2)+','+(cy)
        );
        newpath.setAttributeNS(null, "fill", colorArrow);
        newpath.setAttributeNS(null, 'transform', "translate(0) rotate(" + angle + ' ' + cx + ' ' + cy + ")");
        domElement.appendChild(newpath);

    },
        drawArc: function(startPointOnCircle, endPointOnCircle, radius, domElement){
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
        newpath.setAttributeNS(null, "class", "arc");
        domElement.appendChild(newpath);
    },
        drawDivision: function(cx, cy, radius, startAngle, width, height, fill, data){
        // Рисуем зачения

        var startPointOnCircle, newpath, startAngular;

        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
        startAngular = startAngle - this.aperture/this.divisionSettings.value.length/2;

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"rect");
        newpath.setAttributeNS(null, 'x', startPointOnCircle.x);
        newpath.setAttributeNS(null, 'y', startPointOnCircle.y);
        newpath.setAttributeNS(null, 'transform', "translate(0) rotate(" + startAngular + ' '+ startPointOnCircle.x +' '+ startPointOnCircle.y +")");
        newpath.setAttributeNS(null, 'height', height);
        newpath.setAttributeNS(null, 'width', width);
        newpath.setAttributeNS(null, 'fill', fill);
        this.domElem.appendChild(newpath);
    },
        drawDivisionLabel: function(cx, cy, radius, startAngle, data){
        var startPointOnCircle, endPointOnCircle, newpath, startAngular;

        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
        startAngular = startAngle - this.aperture/this.divisionSettings.value.length/2-90;

        this.drawText(startPointOnCircle.x, startPointOnCircle.y, this.divisionSettings.fontFamily, this.divisionSettings.fontSize, "middle", "translate(0, 0) rotate(" + startAngular + ' '+ startPointOnCircle.x +' '+ startPointOnCircle.y +")", data, this.domElem);
    },
        drawDivisionCircle: function(cx, cy, radius, startAngle, radiusCircle, colorCircle){
        var startPointOnCircle, endPointOnCircle, startAngular;

        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
        startAngular = startAngle - this.aperture/this.divisionSettings.value.length/2-90;
        this.drawCircle(startPointOnCircle.x,startPointOnCircle.y,radiusCircle,colorCircle, this.domElem);
    },
        drawCircle: function(cx, cy, r, fill, domElement ){
        var newpath;

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
        newpath.setAttributeNS(null, "cx", cx);
        newpath.setAttributeNS(null, "cy", cy);
        newpath.setAttributeNS(null, "r", r);
        newpath.setAttributeNS(null, "fill", fill);

        domElement.appendChild(newpath);
    },
        drawText: function(cx, cy, ff, fz, ta, transform, text, domElement){
        var newpath;

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"text");
        newpath.setAttributeNS(null, "x", cx);
        newpath.setAttributeNS(null, "y", cy);
        newpath.setAttributeNS(null, "font-family", ff);
        newpath.setAttributeNS(null, "font-size", fz);
        newpath.setAttributeNS(null, "text-anchor", ta);
        newpath.setAttributeNS(null, 'transform', transform);

        domElement.appendChild(newpath).innerHTML = text;
    },
    }}());


//TODO sdelat' setting

GAUGE.drawParts(200);
console.log(GAUGE);
