<?php

const ROOT = __DIR__ . '/';
const OUTPUT = ROOT . 'build/grid.build.css';
const NL = "\n";
const MINIFICATION = false;

$css = '';


function create ($values, $name, $param, $units) {
    $css = '';
    foreach ($values as $n) {
        $css .= $name . $n . '{' . $param . ':' . $n . $units . '}';
    }
    return $css . NL;
}

// padding & margin in px
// $values = [1,2,3,4,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,110,120,130,140,150,160,170,180,190,200,300,400,500,600,700,800,1000];
$values = [1,2,3,4,5];
$css .= create ($values,'.pt-', 'padding-top', 'rem');
$css .= create ($values,'.pb-', 'padding-bottom', 'rem');
$css .= create ($values,'.pl-', 'padding-left', 'rem');
$css .= create ($values,'.pr-', 'padding-right', 'rem');

$css .= create ($values,'.mt-', 'margin-top', 'rem');
$css .= create ($values,'.mb-', 'margin-bottom', 'rem');
$css .= create ($values,'.ml-', 'margin-left', 'rem');
$css .= create ($values,'.mr-', 'margin-right', 'rem');

// width & height in % vh vw
//$values = array_pad([], 101, 0);
//$values = array_keys($values);
//$values = array_slice($values, 1);
$values = [1,2,3,4,5,10,15,20,25,33,50,75,100];
$css .= '*[class^="width-"] {display: inline-block}' . NL;
$css .= create ($values,'.width-', 'width', '%');
$css .= create ($values,'.height-', 'height', '%');
$css .= create ($values,'.vw-', 'width', 'vw');
$css .= create ($values,'.vh-', 'height', 'vh');

$resultCSS = file_get_contents(__DIR__ . '/static/reset.css');
$resultCSS .= file_get_contents(__DIR__ . '/static/rules.css');
$resultCSS .= $css;
$resultCSS .= file_get_contents(__DIR__ . '/static/grid-columns.css');
$resultCSS .= file_get_contents(__DIR__ . '/static/styles.css');

if (MINIFICATION) {
    $resultCSS = str_replace(array("\r\n", "\r", "\n", "\t", " "), '', $resultCSS);
}

file_put_contents(OUTPUT, $resultCSS);

