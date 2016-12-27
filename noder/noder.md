# Noder.JS

## Назначение

Приминается для сбору и группирования NODE элементов для дальнейших манипуляций с ими 

> Как замена скриптов linker.js или clicker.js

### Использовать
```js
// Эквивалентно Noder.refresh ()
Noder ()

// Эквивалентно Noder.get (key)
Noder (key)

// Эквивалентно Noder.add (key, node)
Noder (key, node)

// Объетк глобальных параметров скрипта
Noder.config

// Повтор поиска нодов
Noder.refresh ()

// Добавления нода
Noder.add ('group', elem)

// Выбрать массив всех нодов
Noder.get ()

// Выбрать массив нодов по ключу
Noder.get ('group')

// Выбрать массив нодов по ключу, если указан второй аргумент - фукция,
результат выборки попадет в первый параметр фукции
Noder.get ('group', function (elemList) {})

// Выбрать единственный елемент нода, если указан второй аргумент - фукция,
результат выборки попадет в первый параметр фукции
Noder.getOne ('group', function (elem) {})

// Пройдет по списку каждого нода.
Noder.each (function (elem) {})
Noder.each ('group', function (elem) {})
Noder.each ('group', function (elem) {}, thisInst)

// Удалит все ноды по ключу
Noder.remove ('group')

// Удалит один нод по ключу
Noder.remove ('group', elem)

// Добавить событие
Noder.on ('group', 'click', function (event) {})

// Добавить событие click
Noder.click ('group', function (event, elem, value) {})
```
