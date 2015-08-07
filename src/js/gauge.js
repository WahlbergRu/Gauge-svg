var MODULE = (function () {

    var my = {
        circularColor:[
            '#000',
            '#000',
            '#000',
            '#000',
            '#000',
            '#000',
            '#000',
            '#000',
            '#000',
            '#000',
            '#000',
            '#000'
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

    my.circularColorChange = function (data) { // возможность отдельного указания цветных участков

        var circular = document.getElementById("circular").getElementsByTagName('*');
        this.circularText = data;

        for(var i = 0; i < my.circularColor.length; i++){
            circular[i].style.stroke = my.circularColor[i];
        }

    };

    my.textOnCircular = function(data){ // компонент должен уметь отображать любой список значений для меток

        var gaugeText = document.getElementById("gauge-text").getElementsByTagName('*');

        console.log(gaugeText);

        for(var i = 0; i < gaugeText.length; i++){
            console.log(data.fontFamily);
            gaugeText[i].attributes['font-family'] = data.fontFamily;
            gaugeText[i].attributes['font-size'] = data.fontSize;
            gaugeText[i].textContent = data.elementsName[i];
        }
    };

    my.getPointOnCircle = function(cx, cy, radius, angle) {
        // Находим точку на кольце
        // Параметры:
        // radius - радиус кольца
        // angle - угол, начиная от пересечения кольца с осью OX
        // 270 - смещение начала отрисовки кольца в 3 и 4 плоскость
        return {
            x: cx + radius * Math.cos(Math.PI * (angle + 270 - my.aperture/2) / 180),
            y: cy + radius * Math.sin(Math.PI * (angle + 270 - my.aperture/2) / 180)
        };
    };


    my.drawParts = function(cx,cy,radius){
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

        angle = (arrowAngle  + 180 - my.aperture/2)

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"polygon");
        newpath.setAttributeNS(null, "points",
            '400,500 '+
            (400+radiusCircle/2)+','+(300)+' '+
            (400-radiusCircle/2)+','+(300)
        );
        newpath.setAttributeNS(null, "fill", colorArrow);
        newpath.setAttributeNS(null, 'transform', "translate(0) rotate(" + angle + " 400 300)");
        svg.appendChild(newpath);



    };

    my.drawPartOfCircle = function(cx,cy,radius,startAngle, endAngle){ // рисуем часть кольца
        var svg, startPointOnCircle, endPointOnCircle, newpath;
        svg = document.getElementById('gauge2');
        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
        endPointOnCircle = this.getPointOnCircle(cx, cy, radius, endAngle);

        console.log('startPointOnCircle:' + startPointOnCircle);
        console.log('endPointOnCircle:' + endPointOnCircle);

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");
        newpath.setAttributeNS(null, "d", "M" + startPointOnCircle.x + "," + startPointOnCircle.y + " A" + radius + "," + radius + " 0 0,1 " + endPointOnCircle.x + "," + endPointOnCircle.y);
        newpath.setAttributeNS(null, "stroke", "black");
        newpath.setAttributeNS(null, "stroke-width", 3);
        newpath.setAttributeNS(null, "opacity", 1);
        newpath.setAttributeNS(null, "fill", "none");
        console.log(svg);
        svg.appendChild(newpath);
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

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"text");
        newpath.setAttributeNS(null, "x", startPointOnCircle.x);
        newpath.setAttributeNS(null, "y", startPointOnCircle.y);
        newpath.setAttributeNS(null, "font-family", "arial");
        newpath.setAttributeNS(null, "font-size", 16);
        newpath.setAttributeNS(null, "text-anchor", "middle");
        newpath.setAttributeNS(null, 'transform', "translate(0, 0) rotate(" + startAngular + ' '+ startPointOnCircle.x +' '+ startPointOnCircle.y +")");
        svg.appendChild(newpath).innerHTML = data;
    };

    my.drawDivisionCircle = function(cx, cy, radius, startAngle, radiusCircle, colorCircle){
        var svg, startPointOnCircle, endPointOnCircle, newpath, startAngular;
        svg = document.getElementById('gauge2');
        startPointOnCircle = this.getPointOnCircle(cx, cy, radius, startAngle);
        startAngular = startAngle - this.aperture/this.drawElements/2-90;
        console.log(startPointOnCircle.x);

        newpath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
        newpath.setAttributeNS(null, "cx", startPointOnCircle.x);
        newpath.setAttributeNS(null, "cy", startPointOnCircle.y);
        newpath.setAttributeNS(null, "r", radiusCircle);
        newpath.setAttributeNS(null, "fill", colorCircle);
        svg.appendChild(newpath);
    };

    my.drawCircle = function(cx, cy, r, fill){

    }



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
