# Bucket.JS

Как замена скриптов linker.js и clicker.js

### Использовать
```js
// Эквивалентно Bucket.refresh ()
Bucket ()

// Эквивалентно Bucket.get (key)
Bucket (key)

// Эквивалентно Bucket.add (key, node)
Bucket (key, node)

// Объетк глобальных параметров скрипта
Bucket.config

// Повтор поиска нодов
Bucket.refresh ()

// Добавления нода
Bucket.add ('group', elem)

// Выбрать массив всех нодов
Bucket.get ()

// Выбрать массив нодов по ключу
Bucket.get ('group')

// Выбрать массив нодов по ключу, если указан второй аргумент - фукция,
результат выборки попадет в первый параметр фукции
Bucket.get ('group', function (elemList) {})

// Выбрать единственный елемент нода, если указан второй аргумент - фукция,
результат выборки попадет в первый параметр фукции
Bucket.getOne ('group', function (elem) {})

// Пройдет по списку каждого нода.
Bucket.each (function (elem) {})
Bucket.each ('group', function (elem) {})
Bucket.each ('group', function (elem) {}, thisInst)

// Удалит все ноды по ключу
Bucket.remove ('group')

// Удалит один нод по ключу
Bucket.remove ('group', elem)

// Добавить событие
Bucket.on ('click', 'group', function (event) {})

// Добавить событие click
Bucket.click ('group', function (event, elem, value) {})
```
