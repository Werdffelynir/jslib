
(function (window, NamespaceApplication) {
  NamespaceApplication.domLoaded(function () {

    const appConfig = {
      debug: true,
      path: 'jsapp/',
      url: 'jsapp/',
    };

    const app = new NamespaceApplication(appConfig);

    app.loadJSSync([
      'jsapp/container',
      'jsapp/tool',
    ], () => {

      let success = () => {console.log('success')};
      let failed = () => {console.log('failed')};

      let chain = NamespaceApplication.Chain(success, failed);

      chain.register('Test', function (next) {
          console.log('1');
          next();
      });

      chain.register('Next', function (next) {
        setTimeout(() => {
          console.log('2');
          next();
        }, 1000);
      });

      chain.register('Last', function (next) {
        setTimeout(() => {
          console.log('3');
          next();
        }, 3000);
      });

      chain.next();

    });

    window.NSApp = app;
  })
})(window, NamespaceApplication);
