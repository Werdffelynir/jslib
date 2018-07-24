
if(NSApp.namespace){NSApp.namespace('Tool', function(app){

  class Tool {
    constructor () {
      this.extensionName = 'Tool';
    }

    input (type, name, value, onChange, onInput) {
      const inp = app.createElement('input', {type, name, value});
      app.on(inp, 'change', onChange);
      app.on(inp, 'input', onInput);
      return inp;
    }

  }

  return new Tool();

})}
