<?php

set_time_limit(0);

while (true) {
    system('php -f builder.php < config.json');
    sleep(5);
}