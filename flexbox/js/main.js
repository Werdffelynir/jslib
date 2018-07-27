NamespaceApplication.domLoaded(function () {

  var App = new NamespaceApplication({
    wrapperDOMElement: NamespaceApplication.query('.flex-wrapper'),
    containerDOMElement: NamespaceApplication.query('.flex-container'),
    editorContainerDOMElement: NamespaceApplication.query('.editor-container'),
    editorItemDOMElement: NamespaceApplication.query('.editor-item'),
    editorItemSelectedDOMElement: NamespaceApplication.query('.editor-item-selected'),
    sizeInputElement: NamespaceApplication.query('[name="size"]'),
    styleItemDOMElement: NamespaceApplication.query('.style-item'),
    styleContainerDOMElement: NamespaceApplication.query('.style-container'),
    button: NamespaceApplication.search('button', 'data-action'),
    items: [],
    containerParamRef: {
      'height': {'100%': '100%', '400px': '400px'},
      'display': {'flex': 'flex', 'inline-flex': 'inline-flex'},
      'flex-direction': {
        'row': 'row',
        'row-reverse': 'row-reverse',
        'column': 'column',
        'column-reverse': 'column-reverse'
      },
      'flex-wrap': {'nowrap': 'nowrap', 'wrap': 'wrap', 'wrap-reverse': 'wrap-reverse'},
      'justify-content': {
        'flex-start': 'flex-start',
        'flex-end': 'flex-end',
        'center': 'center',
        'space-between': 'space-between',
        'space-around': 'space-around',
        'space-evenly': 'space-evenly'
      },
      'align-items': {
        'stretch': 'stretch',
        'flex-start': 'flex-start',
        'flex-end': 'flex-end',
        'center': 'center',
        'baseline': 'baseline'
      },
      'align-content': {
        'stretch': 'stretch',
        'flex-start': 'flex-start',
        'flex-end': 'flex-end',
        'center': 'center',
        'space-between': 'space-between',
        'space-around': 'space-around'
      }
    },
    itemParamRef: {
      'width': {'auto': 'auto', '100%': '100%', '50%': '50%', '25%': '25%', '10%': '10%', '100px': '100px'},
      'height': {'100%': '100%', '50%': '50%', '25%': '25%', '10%': '10%', '100px': '100px'},
      'order': {'0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5'},
      'flex-grow': {'0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10'},
      'flex-shrink': {'1': '1', '2': '2', '3': '3', '4': '4', '5': '5'},
      'flex-basis': {'auto': 'auto', '10': '10', '5': '5'},
      'align-self': {
        'auto': 'auto',
        'flex-start': 'flex-start',
        'flex-end': 'flex-end',
        'center': 'center',
        'baseline': 'baseline',
        'stretch': 'stretch'
      }
    },
    containerParam: {
      'width': '100%',
      'height': '100%',
      'display': 'flex',
      'flex-grow': 0,
      'flex-shrink': 1,
      'flex-basis': 'auto',
      'align-self': 'auto'
    },
    itemParam: {
      'width': 'auto',
      'height': '100%',
      'order': 0,
      'flex-grow': 0,
      'flex-shrink': 1,
      'flex-basis': 'auto',
      'align-self': 'auto'
    },

    currentContainerStyle: Object.assign({}, this.containerParam),

    currentItemStyle: Object.assign({}, this.itemParam),

    addItem: function () {
      var len = this.items.length;
      var itm = this.createElement('div', {'class': 'flex-item'}, 'BOX: ' + len);

      this.on(itm, 'click', this.onClickItem);
      this.css(itm, this.itemParam);
      this.items.push(itm);
      this.containerDOMElement.appendChild(itm);
    },

    onClickItem: function (event) {
      var
        itm = event.target,
        deleteButton = NamespaceApplication.createElement('button', {class: 'button-delete'}, 'delete');

      // console.log(itm);

      NamespaceApplication.on(deleteButton, 'click', function (eve) {
        App.containerDOMElement.removeChild(itm);
        App.cleanItemSelected();
      });

      App.cleanItemSelected();
      NamespaceApplication.inject('.item-name', [itm.textContent, deleteButton]);
      NamespaceApplication.css(itm, {'background-color': '#bfd8ba'});

      App.createItemEditorSelected(App.itemParamRef, function (eve) {
        var param = {};
        param[eve.target.name] = eve.target.value;
        //App.currentItemStyle[String(eve.target.name)] = eve.target.value;
        //App.showCodeItem();
        App.css(itm, param);
      });

      NamespaceApplication.each(App.itemParam, function (value, key) {
        //App.currentItemStyle[String(key)] = value;
        var se = App.query('select[name="'+key+'"]>option[value="'+itm.style[key]+'"]', App.editorItemSelectedDOMElement);
        se.selected = 'selected';
      });

      //App.showCodeItem();
    },

    showCodeContainer: function () {
      App.currentContainerStyle.textContent = '';
      var content = '<pre class="code">.container {\n';
      App.each(App.currentContainerStyle, function (value, key) {
        content += '\t' + key + ': ' + value + ';\n';
      });
      content += '}\n</pre>';
      App.currentContainerStyle.innerHTML = content;
    },

    showCodeItem: function () {
      App.styleItemDOMElement.textContent = '';
      var content = '<pre class="code">.item {\n';
      App.each(App.currentItemStyle, function (value, key) {
        content += '\t' + key + ': ' + value + ';\n';
      });
      content += '}\n</pre>';
      App.styleItemDOMElement.innerHTML = content;
    },

    onClickContainer: function (event) {
      var itm = event.target;
      console.log(itm.params);
    },

    onChangeContainer: function (event) {
      App.containerParam[event.target.name] = event.target.value;
      App.css(App.containerDOMElement, App.containerParam);
    },

    onChangeItem: function (event) {
      App.cleanItemSelected();
      App.itemParam[event.target.name] = event.target.value;
      App.css('.flex-item', App.itemParam);
    },

    cleanItemSelected: function () {
      NamespaceApplication.inject('.item-name', '');
      NamespaceApplication.inject(App.editorItemSelectedDOMElement, '');
      NamespaceApplication.css('.flex-item', {'background-color': '#d2eccc'});
    },

    createEditor: function (paramRef, editorDOMElement, eventCallback) {
      var name, key, option, select, wrapper = this.createElement('div');
      for (name in paramRef) {
        select = NamespaceApplication.createElement('select', {name: name});
        for (key in paramRef[name]) {
          option = NamespaceApplication.createElement('option', {value: paramRef[name][key]}, paramRef[name][key]);
          select.appendChild(option);
        }
        wrapper.appendChild(
          NamespaceApplication.createElement('div', {}, ['<span class="label">' + name + ':</span>', select])
        );
        App.on(select, 'change', eventCallback);
      }
      NamespaceApplication.inject(editorDOMElement, wrapper);

    },

    createContainerEditor: function (event) {
      this.createEditor(
        this.containerParamRef,
        this.editorContainerDOMElement,
        this.onChangeContainer);
    },

    createItemEditor: function (event) {
      this.createEditor(
        this.itemParamRef,
        this.editorItemDOMElement,
        this.onChangeItem);
    },

    createItemEditorSelected: function (paramRef, eventCallback) {
      this.createEditor(
        paramRef,
        this.editorItemSelectedDOMElement,
        eventCallback);
    }

  });

  App.domLoaded(function () {

    App.on(App.button['addItem'], 'click', function (event) {
      App.addItem();
    });

    // add default items
    for (var i = 0; i < 4; i++) {
      App.addItem();
    }

    // add sections with settings
    App.createContainerEditor();
    App.createItemEditor();

    // to default style
    App.css(App.wrapperDOMElement, {width: App.position(App.wrapperDOMElement).width + 'px'});
    App.css(App.containerDOMElement, App.containerParam);
    App.css('.flex-item', App.itemParam);

    // get wrapper size
    var wrapperWidth = App.position(App.wrapperDOMElement).width;

    App.on(App.sizeInputElement, 'input', function (eve) {
      var newWidth = wrapperWidth * eve.target.value  / 100;
      App.css(App.wrapperDOMElement, {width: newWidth + 'px'});
    });

  });

});