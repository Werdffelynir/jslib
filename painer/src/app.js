
document.addEventListener('DOMContentLoaded', (event) => {

  var App = new NamespaceApplication({
    url: '/',
    Painer: new Painer(),
    Canvas: new Canvas(),
    Clip: new Clip()
  });


  console.log(App.Clip.index);
  console.log(App.Clip.cIndex);

});
