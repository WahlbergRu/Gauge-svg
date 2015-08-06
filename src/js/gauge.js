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
        ]
    },
    privateVariable = 1,
    circularLength = 12;

    function privateMethod() {
        // ... 
    }

    my.moduleProperty = 1;

    my.circularColorChange = function (data) { // возможность отдельного указания цветных участков

        this.circularColor = data;

        for(var i = 0; i < circularLength; i++){
            circular[i].style.stroke = my.circularColor[i];
        }

    };



    var circular = document.getElementById("circular").getElementsByTagName('*');




    return my;
}());

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

console.log(MODULE);
