<?php

function create ($values, $name, $param, $units) {
    $css = '';
    foreach ($values as $n) {
        $css .= $name . $n . '{' . $param . ':' . $n . $units . '}';
    }
    return $css . "\n\n";
}

$values = [
    1,2,3,4,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,110,120,130,140,150,160,170,180,190,200,300,400,500,600,700,800,1000
];

$css = '';
$css .= create ($values,'.pt-', 'padding-top', 'px');
$css .= create ($values,'.pb-', 'padding-bottom', 'px');
$css .= create ($values,'.pl-', 'padding-left', 'px');
$css .= create ($values,'.pr-', 'padding-right', 'px');

print_r($css);