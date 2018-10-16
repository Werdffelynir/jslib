
const path = '/apppack/jsapp/';

const staticModules = [
  path + 'extensions/helper.js',
];

const dynamicModules = [
  path + 'components/main.js',
];

NamespaceApplication.loadJSSync(staticModules, () => {

  NamespaceApplication.domLoaded(() => {

    const App = new NamespaceApplication({
      path: path,
      url: path,
    });

    NamespaceApplication.loadJSSync(dynamicModules, () => {

      // TODO: Code here...

    });

  });

});

