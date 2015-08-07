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

    my.getPointOnCircle = function(radius, angle) {
        // Находим точку на кольце
        // Параметры:
        // radius - радиус кольца
        // angle - угол, начиная от пересечения кольца с осью OX
        var x =  100 + radius * Math.cos(Math.PI * angle / 180)
        var y =  100 + radius * Math.sin(Math.PI * angle / 180)
        console.log('x:' + x);
        console.log('y:' + y);
        return {
            x: 100 + radius * Math.cos(Math.PI * angle / 180),
            y: 100 + radius * Math.sin(Math.PI * angle / 180)
        };
    };

    my.drawPartOfCircle = function(){ // рисуем часть кольца
        var svg, startPointOnCircle, endPointOnCircle;
        svg = document.getElementById('gauge-2');
        startPointOnCircle = this.getPointOnCircle(50, 90);
        endPointOnCircle = this.getPointOnCircle(50, 0);
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

MODULE.drawPartOfCircle();

console.log(MODULE);
