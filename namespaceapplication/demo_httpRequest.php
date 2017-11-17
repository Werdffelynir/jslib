<?php

function loger ($name, $data) {
    print_r("\n\n $name : ");
    print_r($data);
};

if (isset(getallheaders()['X-Requested-With'])) {
    $m = $_SERVER['REQUEST_METHOD'];

    if ($m === 'GET') {
        loger('GET', $_GET);
    }
    else if ($m === 'POST') {
        loger('POST', $_POST);
    }
    else {
        parse_str(file_get_contents("php://input"), $post_vars);
        loger('CUSTOM ['.$m.']', $post_vars);
    }

    die;
}


?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="/namespaceapplication/build/namespaceapplication.js"></script>
</head>
<body>

<pre>
</pre>

<form id="form">
    <input type="text" name="name" value="name">
    <input type="text" name="email" value="email@email">
</form>

<script>

  var book = {
    id: '123',
    title: 'Asd Абв 123',
    at: '@',
    mail: 'mail@mail.com'
  };


  var App = new NamespaceApplication({
    path: '/namespaceapplication/',
    handlerScript: '/namespaceapplication/demo_httpRequest.php',
  });


    document.body.onclick = function (eve) {

      App.httpRequest({
        method: 'GET',
        url: App.handlerScript,
        data: book,
      }, function (status, data) {console.log(status, data);});

      App.httpRequest({
        method: 'POST',
        url: App.handlerScript,
        data: book,
      }, function (status, data) {console.log(status, data);});

      App.httpRequest({
        method: 'PUT',
        url: App.handlerScript,
        data: book,
      }, function (status, data) {console.log(status, data);});

      App.httpRequest({
        method: 'POST',
        url: App.handlerScript,
        data: App.query('#form'),
        useFormData: true
      }, function (status, data) {console.log(status, data);});

      App.httpRequest({
        method: 'POST',
        url: App.handlerScript,
        data: book,
        useFormData: true
      }, function (status, data) {console.log(status, data);});

      App.httpRequest({
        method: 'PUT',
        url: App.handlerScript,
        data: book,
        useFormData: true
      }, function (status, data) {console.log(status, data);});

    }

</script>
</body>
</html>
