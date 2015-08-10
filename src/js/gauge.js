;var GAUGE = (function () {

    return {
        domElem: document.getElementById('gauge'),
        domElemContainer: document.getElementById('gauge-container'),
        
        settings: {

            aperture: 240,
            radiusGauge: 200,

            division: {
                divisionsPerSection: 10,
                color: '#bbb',
                radius: 1,
            },

            divisionBreakpoint: {
                width: 2,
                height: 8,
                color: '#333',
                valueColor: [
                    '#666666',
                    '#666666',
                    '#666666',
                    '#666666',
                    '#666666',
                    '#666666',
                    '#666666',
                    '#ffa500',
                    '#ffa500',
                    '#ff0000',
                ],
                value: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ]
            },

            divisionText: {
                fontFamily:'arial',
                fontSize:'14',
                position:'outside',
                color: '#000',
                rotateText: false
            },

            arrow: {
                angle: 0,
                radiusCircle: 10,
                colorCircle: '#1e98e4',
                colorArrow: '#1e98e4'
            },
        }, 
        getPointOnCircle: function(cx, cy, radius, angle) {
            // Находим точку на кольце
            // Параметры:
            // radius - радиус кольца
            // angle - угол, начиная от пересечения кольца с осью OX
            // 270 - смещение начала отрисовки кольца в отрицательной плоскости OY
            return {
                x: cx + radius * Math.cos(Math.PI * (angle + 270 - this.settings.aperture/2) / 180),
                y: cy + radius * Math.sin(Math.PI * (angle + 270 - this.settings.aperture/2) / 180)
            };
        },
        gaugeInit: function(){
            // Отрисовка gauge частями
            // Параметры:
            // cx - начало координат кольца, ось OX
            // cy - начало координат кольца, ось OY
            // radius - радиус gauge

            console.log(this.domElemContainer.offsetWidth);
            console.log(this.domElemContainer.offsetWidth);
            console.log(document.getElementById('gauge-container').offsetWidth);

            // Находим угол между думая точками
            var angularPart = this.settings.aperture/(this.settings.divisionBreakpoint.value.length-1);
            var angularColorPart = this.settings.aperture/(this.settings.divisionBreakpoint.valueColor.length);

            for (var i=0; i<this.settings.divisionBreakpoint.valueColor.length; i++) {
                this.drawPartOfCircle(this.domElemContainer.offsetWidth / 2, this.domElemContainer.offsetHeight / 2, this.settings.radiusGauge, i * angularColorPart, (i + 1) * angularColorPart, this.settings.divisionBreakpoint.valueColor[i]);
            }

            for (var i=0; i<=this.settings.divisionBreakpoint.value.length-1; i++){
                if (i !== this.settings.divisionBreakpoint.value.length-1){
                    //this.drawPartOfCircle(this.domElemContainer.offsetWidth/2,this.domElemContainer.offsetHeight/2,this.settings.radiusGauge, i*angularPart, (i+1)*angularPart, this.settings.divisionBreakpoint.valueColor[i]);
                    if (this.settings.divisionText.position === 'outside'){
                        for (var j=1; j<this.settings.division.divisionsPerSection; j++){
                            this.drawDivisionCircle(this.domElemContainer.offsetWidth/2,this.domElemContainer.offsetHeight/2,this.settings.radiusGauge+15, i*angularPart+j*angularPart/this.settings.division.divisionsPerSection, this.settings.division.radius, this.settings.division.color);
                        }
                    } else {
                        for (var j=1; j<this.settings.division.divisionsPerSection; j++){
                            this.drawDivisionCircle(this.domElemContainer.offsetWidth/2,this.domElemContainer.offsetHeight/2,this.settings.radiusGauge-15, i*angularPart+j*angularPart/this.settings.division.divisionsPerSection, this.settings.division.radius, this.settings.division.color);
                        }
                    }
                }
                if (this.settings.divisionText.position === 'outside'){
                    this.drawDivision(this.domElemContainer.offsetWidth/2,this.domElemContainer.offsetHeight/2,this.settings.radiusGauge+20, i*angularPart, this.settings.divisionBreakpoint.height, this.settings.divisionBreakpoint.width, this.settings.divisionBreakpoint.color, this.settings.divisionBreakpoint.value[i]);
                    this.drawDivisionLabel(this.domElemContainer.offsetWidth/2,this.domElemContainer.offsetHeight/2,this.settings.radiusGauge+30, i*angularPart, this.settings.divisionBreakpoint.value[i]);
                } else {
                    this.drawDivision(this.domElemContainer.offsetWidth/2,this.domElemContainer.offsetHeight/2,this.settings.radiusGauge-15, i*angularPart, this.settings.divisionBreakpoint.height, this.settings.divisionBreakpoint.width, this.settings.divisionBreakpoint.color, this.settings.divisionBreakpoint.value[i]);
                    this.drawDivisionLabel(this.domElemContainer.offsetWidth/2,this.domElemContainer.offsetHeight/2,this.settings.radiusGauge-50, i*angularPart, this.settings.divisionBreakpoint.value[i]);
                }
            } 

            //Рисуем стрелку у gauge

            this.drawArrow(this.domElemContainer.offsetWidth/2,this.domElemContainer.offsetHeight/2,this.settings.radiusGauge, this.settings.arrow.angle, this.settings.arrow.colorArrow , this.settings.arrow.radiusCircle, this.settings.arrow.colorCircle);

        },
        drawArrow: function(cx, cy, radius, arrowAngle, colorArrow, radiusCircle, colorCircle){
            // Отрисовка стрелки
            // Параметры:
            // cx - начало координат кольца, ось OX
            // cy - начало координат кольца, ось OY
            // radius - длина стрелки, ось OY
            var startPointOnCircle;


            // Рисуем стрелку
            startPointOnCircle = this.getPointOnCircle(cx, cy, radius, arrowAngle);
            this.drawPolygon(cx, cy, radiusCircle, radius, colorArrow, arrowAngle, this.domElem);

            //Рисуем кружок над стрелкой
            startPointOnCircle = this.getPointOnCircle(cx, cy, radiusCircle, arrowAngle);
            this.drawCircle(cx,cy,radiusCircle,colorCircle,this.domElem)
        },
        drawPartOfCircle: function(cx,cy,radius,startAngle, endAngle, color){
            // Рисуем часть кольца
            // Находим начальные координаты
            var startPointOnCircle, endPointOnCircle;

            startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
            endPointOnCircle = this.getPointOnCircle(cx, cy, radius, endAngle);

            this.drawArc(startPointOnCircle, endPointOnCircle, radius, color, this.domElem);
        },
        drawPolygon: function(cx, cy, radiusCircle, radius, colorArrow, angle, domElement){
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
            angle = angle  + 180 - this.settings.aperture/2;

            var newpath;
            newpath = document.createElementNS('http://www.w3.org/2000/svg',"polygon");
            newpath.setAttributeNS(null, "points",
                cx+','+ (cy+radius)+ ',' +
                (cx+radiusCircle/2)+','+(cy)+' '+
                (cx-radiusCircle/2)+','+(cy)
            );
            newpath.setAttributeNS(null, "fill", colorArrow);
            newpath.setAttributeNS(null, "data-cx", cx);
            newpath.setAttributeNS(null, "data-cy", cy);
            newpath.setAttributeNS(null, "id", this.domElem.id+'-arrow');
            newpath.setAttributeNS(null, 'transform', "translate(0) rotate(" + angle + ' ' + cx + ' ' + cy + ")");
            domElement.appendChild(newpath);
        },
        drawArc: function(startPointOnCircle, endPointOnCircle, radius, color, domElement){
            // Рисует дугу из начальных точек в конечные, с определенно-параметрическим радиусом кривизны
            // startPointOnCircle - начальные точки {x,y} {float, float}
            // endPointOnCircle - начальные точки {x,y} {float, float}
            // radius - радиус кривизны дуги {float}
            // domElement - элемент дерева
            var newpath;
            newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");
            newpath.setAttributeNS(null, "d", "M" + startPointOnCircle.x + "," + startPointOnCircle.y + " A" + radius + "," + radius + " 0 0,1 " + endPointOnCircle.x + "," + endPointOnCircle.y);
            newpath.setAttributeNS(null, "stroke-width", 3);
            newpath.setAttributeNS(null, "opacity", 1);
            newpath.setAttributeNS(null, "fill", "none");
            if (color === (null || undefined)){
                newpath.setAttributeNS(null, "class", "arc arc-default");
            } else {
                newpath.setAttributeNS(null, "class", "arc arc-color");
                newpath.setAttributeNS(null, "stroke", color);
            }
            domElement.appendChild(newpath);
        },
        drawDivision: function(cx, cy, radius, startAngle, width, height, fill, data){
            // Рисуем зачения

            var startPointOnCircle, newpath, startAngular;

            startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
            startAngular = startAngle  + 90 - this.settings.aperture/2;

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
            startAngular = startAngle - this.settings.aperture/this.settings.divisionBreakpoint.value.length/2-90;

            this.drawText(startPointOnCircle.x, startPointOnCircle.y, this.settings.divisionText.fontFamily, this.settings.divisionText.fontSize, "middle", this.settings.divisionText.color, "translate(0, 0) rotate(" + startAngular + ' '+ startPointOnCircle.x +' '+ startPointOnCircle.y +")", data, this.domElem);
        },
        drawDivisionCircle: function(cx, cy, radius, startAngle, radiusCircle, colorCircle){
            var startPointOnCircle, endPointOnCircle, startAngular;

            startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
            startAngular = startAngle - this.settings.aperture/this.settings.divisionBreakpoint.value.length/2-90;
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
        drawText: function(cx, cy, ff, fz, ta, tc, transform, text, domElement){
            var newpath;

            newpath = document.createElementNS('http://www.w3.org/2000/svg',"text");
            newpath.setAttributeNS(null, "x", cx);
            newpath.setAttributeNS(null, "y", cy);
            newpath.setAttributeNS(null, "font-family", ff);
            newpath.setAttributeNS(null, "font-size", fz);
            newpath.setAttributeNS(null, "text-anchor", ta);
            newpath.setAttributeNS(null, "fill", tc);
            if (this.settings.divisionText.rotateText === true){
                newpath.setAttributeNS(null, 'transform', transform);
            }

            domElement.appendChild(newpath).textContent = text;
        },
        transformArrow: function(angle){
            var newAngle, cx,cy;
            newAngle = angle  + 180 - this.settings.aperture/2;
            cx = document.getElementById(this.domElem.id+'-arrow').getAttributeNS(null, 'data-cx');
            cy = document.getElementById(this.domElem.id+'-arrow').getAttributeNS(null, 'data-cy');
            document.getElementById(this.domElem.id+'-arrow').setAttributeNS(null, 'transform', "translate(0) rotate(" + newAngle + ' ' + cx + ' ' + cy + ")");
        }
    }
}(GAUGE || {}));