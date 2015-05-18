<?php

use Demo\Math\Adder;

spl_autoload_register(function ($class) {
    $class = 'php/src/' . str_replace("\\", '/', $class) . '.php';

    require_once $class;
});

$adder = new Adder();

print '21 plus 7 is ' . $adder->add(21, 7);
