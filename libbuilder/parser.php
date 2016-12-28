<?php

$root = __DIR__ . DIRECTORY_SEPARATOR;

function show($data) {
    print_r($data);
    print("\n");
}

function input($sendData, $callback) {
    print($sendData);
    $stdin = fopen("php://stdin", "r");
    $response = trim(fgets($stdin));
    fclose($stdin);
    if (is_callable($callback)) $callback($response);
}

if (!is_file($root . 'config.json')) {
    show("[Parser] Error. File config.json not find.");
    exit();
}

$config = json_decode(file_get_contents($root . 'config.json'), true);

$root = $config['root'];
$layoutPath = $config['layout'];
$modules = $config['modules'];
$replaces = $config['replaces'];
$delete_string_marker = $config['delete_string_marker'];
$layout = file_get_contents($layoutPath);

foreach($modules as $mod => $file) {
    if(is_file($root.$file) && $ctx = file_get_contents($root.$file)) {
        //$ctx =  "\n// --------------------------------------------------------- {$mod} --- //\n" . $ctx . "\n";
        $layout = str_replace("[[['$mod']]]", $ctx, $layout);
    } else
        show("[Parser] Error. File $root.$file not find.");
}

// replace
if (!empty($replaces)) {
    foreach($replaces as $search => $re)
        $layout = str_replace($search, $re, $layout);
}

// deleted string
$layoutArr = explode("\n", $layout);
//$layoutArrNew = [];
foreach ($layoutArr as $i => $str) {
    if (strpos($str, $delete_string_marker) !== false)
        unset($layoutArr[$i]);
};

$layout = join("\n", $layoutArr);




// build
if (file_put_contents($config['dump'], $layout)) {
    show("[Parser] File {$config['dump']} is created.");
} else
    show("[Parser] Error File {$config['dump']} not created. Content not find.");

/*
$dataSources = '';
foreach($config['prepare'] as $s) {
    $f = $config['root'] . $s;
    if (is_file($f)) {
        $c = file_get_contents($f);
        $dataSources .= "\n// --------------------------------------------------------- {$f} --- //\n" . $c . "\n";
    }
    else
        show("[Parser] Error. File $f not find.");
}

// build
if (file_put_contents($config['dump'], $dataSources)) {
    show("[Parser] File {$config['dump']} is created.");
} else
    show("[Parser] Error File {$config['dump']} not created. Content not find.");

//show($dataSources);

//print_r($config);*/