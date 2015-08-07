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
        }
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
        return {
            x: cx + radius * Math.cos(Math.PI * angle / 180),
            y: cy + radius * Math.sin(Math.PI * angle / 180)
        };
    };

    my.drawPartOfCircle = function(cx,cy,radius,startAngle, endAngle){ // рисуем часть кольца
        var svg, startPointOnCircle, endPointOnCircle, newpath;
        svg = document.getElementById('gauge2');
        var radius = 50;
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

    return my;
}());


//TODO sdelat' setting

MODULE.circularColorChange([
    '#56503D',
    '#56503D',
    '#56503D',
    '#56503D',
    '#56503D',
    '#56503D',
    '#56503D',
    '#56503D',
    '#56503D',
    '#CEA229',
    '#CEA229',
    '#A31313'
]);

MODULE.textOnCircular({
    'fontFamily':'Arial',
    'fontSize':'14',
    'position':'outside',
    'elementsName':[
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6'
    ]}
);

MODULE.drawPartOfCircle(100, 100, 50, 0, 30);
MODULE.drawPartOfCircle(100, 100, 50, 30, 60);
MODULE.drawPartOfCircle(100, 100, 50, 60, 90);
MODULE.drawPartOfCircle(100, 100, 50, 90, 120);
MODULE.drawPartOfCircle(100, 100, 50, 120, 150);
MODULE.drawPartOfCircle(100, 100, 50, 150, 180);
MODULE.drawPartOfCircle(100, 100, 50, 180, 210);

console.log(MODULE);
