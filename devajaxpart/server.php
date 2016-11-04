<?php


if (!empty($_POST)) {
    print_r('POST');
    print_r($_POST);
}

else if (!empty($_GET)) {
    print_r('GET');
    print_r($_SERVER['REQUEST_METHOD']);
    print_r($_GET);
}

else {
    print_r('OTHER REQUEST_METHOD');
    print_r($_SERVER);
    print_r($_POST);
    print_r($_GET);
}


