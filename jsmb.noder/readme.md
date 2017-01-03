# Noder.JS

Эксперимент. манипулирования элементами.

```
// новый экземпляр работы над указаными елемнтами 
// selector - Выберает по селектору в список
// attr - атрибут, имя в списке
// name - если attr = false, елементы ложатся в массив, имя в списке - name
var inst = new Noder(selector, attr [, name]);

// начать поиск, можно указать где
inst.search([from])

// выбрать все елементы
inst.getElements()

// выбрать один елемент
inst.get(attr [, index])

// изминить конфишурацию
inst.setConfiguration(conf)

// выборка одного элемента
Noder.query(selector, from)

// выборка множества элемента
Noder.queryAll(selector, from)
```

### Пример 

```html
<div id="editor">
    <form name="item">
        <input type="text" name="title">
        <input type="text" name="content">
        <input type="submit" name="submit" value="send">
    </form>
</div>
```

```js
var formElements, formNoder = new Noder({
    selector: '*[name]',
    attr: 'name',
});

formNoder.search();

formElements = formNoder.getElements();
// formElements = Object { item: <form>, title: <input>, content: <input>, submit: <input> }
```


```js
var formElements = new Noder('*[name]', 'name')
    .search()
    .getElements();
    
// formElements = Object { item: <form>, title: <input>, content: <input>, submit: <input> }
```


```js
var formElements = new Noder('*[name]', false, 'my_form')
    .search()
    .getElements();
    
// formElements = Object { my_form: Array[4] }
```


```js
var formElements,
    form = new Noder('input', 'name').search('#editor');

form.on('submit', 'click', function (event, target) {
    event.preventDefault();

    formElements = form.getElements();
    formElements.title.value = 'Title';
    formElements.content.value = 'Hello world, text-content';
});

// упрощенный вариант
form.onClick('submit', function (event, target) {
    event.preventDefault();
    
    formElements = form.getElements();
    formElements.title.value = 'Title';
    formElements.content.value = 'Hello world, text-content';
});
```


## Пример
```html
<div id="menu">
    <ul>
        <li>1 - listitem</li>
        <li>2 - listitem</li>
        <li>3 - listitem</li>
        <li>4 - listitem</li>
        <li>5 - listitem</li>
    </ul>
</div>

<div id="footer">
    <ul>
        <li data-key="footer-element-1">1 - footer</li>
        <li data-key="footer-element-2">2 - footer</li>
        <li data-key="footer-element-3">3 - footer</li>
    </ul>
</div>
```

```js
var menuElements = new Noder('#menu li', false, 'menu')
    .search()
    .getElements();
// menuElements = Object { menu: Array[5] }


var footerElements = new Noder('#footer li', 'data-key')
        .search()
        .getElements();
// footerElements = Object { footer-element-1: <li>, footer-element-2: <li>, footer-element-3: <li> }
```

```js
var menuElements;
var menu = new Noder('li', false, 'menu');
menu.search('#menu');

menu.on('menu', 'click', function (event, target) {
    event.preventDefault();
    console.log(target);
});
```