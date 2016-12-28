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

$rootModules = $config['root'];
$layoutPath = $config['layout'];
$autoInclude = $config['modules_auto_include'];
$modules = $config['modules'];
$replaces = $config['replaces'];
$delete_string_marker = $config['delete_string_marker'];
$layout = file_get_contents($layoutPath);

if ($autoInclude) {
    $files = scandir($rootModules);
    if (!empty($files)) {
        foreach($files as $file) {
            if (strlen($file) > 3 && substr($file, -3) === '.js' && is_file($rootModules.$file)) {
                $ctx = file_get_contents($rootModules.$file);
                $layout = str_replace("[[['" . (substr($file, 0, -3)) . "']]]", $ctx, $layout);
            }
        }
    }

} else {
    foreach($modules as $mod => $file) {
        if(is_file($rootModules.$file) && $ctx = file_get_contents($rootModules.$file)) {
            $layout = str_replace("[[['$mod']]]", $ctx, $layout);
        } else
            show("[Parser] Error. File $rootModules.$file not find.");
    }
}

// replace
if (!empty($replaces)) {
    foreach($replaces as $search => $re)
        $layout = str_replace($search, $re, $layout);
}

// deleted string
$layoutArr = explode("\n", $layout);

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
