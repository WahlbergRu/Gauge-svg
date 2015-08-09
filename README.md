# Gauge-svg

Gauge, without any module, pure js

check in ie10+, ff23+, chrome 24+

# Demo

# Installation

### Install with NPM
```sh
$ npm install gauge-svg
```

### Install with Bower
```sh
$ bower install gauge-svg
```

# How to use

### html
```sh
<div id="gauge-container">
    <svg version="1.1" id="gauge"/>
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



- компонент должен уметь отображать любой список значений для меток. +
- компонент должен быть представлен самостоятельным классом. +
- компонент должен уметь устанавливаться через npm, bower или component.
- компонент должен иметь собранную и минифицированную standalone версию скрипта для включения в браузер. (если это про gauge.min.js, то +)
- компонент не должен использовать картинки/спрайты в зависимостях. +
- компонент должен быть доступно и понятно стилизуем через CSS. +
- размер собранной со всеми зависимостями и минифицированной версии компонента не должен превышать 15кб +
- в реализации не желательно использование трансляторов/препроцессоров +

Дополнительные, но необязательные плюшки:
- возможность подключить как jquery-плагин. -
- возможность выбора - показывать цифры внутри/снаружи шкалы +
- возможность задания "апертуры" шкалы в градусах +
- возможность отдельного указания цветных участков +

Вариант исполнения всего остального - на выбор исполнителя.
 
### Version
1.0.3
 
License
----

MIT
 
**Free Software, Hell Yeah!** 