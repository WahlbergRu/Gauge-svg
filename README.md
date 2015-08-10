# Gauge-svg

Gauge, without any module, pure js

check in ie10+(i think can use in ie8), ff23+, chrome 24+

# Demo

# Installation

### Install with NPM
```sh
$ npm install gauge-svg
```

# How to use

### html
```sh
<div id="gauge-container" class="gauge-container">
    <svg version="1.1" id="gauge" class="gauge"/>
</div>
```

### js

```sh
    <script src="../src/js/gauge.js"></script>
    <script>
        GAUGE.gaugeInit();
    </script>
```

# Settings

### you can use setting
 
```sh
    <script src="../src/js/gauge.js"></script>
    <script>
        GAUGE.domElem = document.getElementById('gauge');
        GAUGE.domElemContainer = document.getElementById('gauge-container');
        GAUGE.settings = {

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
                    '#666666','#666666','#666666','#666666','#666666','#666666','#666666','#ffa500','#ffa500','#ff0000',
                ],
                value: [
                    1,2,3,4,5,6
                ]
            },

    </script>
```

# Rotate Arrow

```sh
    <script>
        GAUGE.gaugeInit();
        GAUGE.transformArrow(30); // angle in degree
    </script>
```

### Version
1.0.5
 
License
----

MIT
 
**Free Software, Hell Yeah!** 