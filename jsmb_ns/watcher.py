#!/usr/bin/python3.5
# python3 watcher.py 'temp' 'php -f script.php'

import os
import sys
import json
import time
import fcntl
import signal


FNAME = False
SYSCOMMAND = False
arguments = sys.argv[1:]


def to_path(path):
    _path = path
    if path[-1] is not '/':
        _path = path + '/'
    return _path


def parse_json_file(file):
    directory = False
    command = False
    try:
        with open(arguments[0], 'r') as file:
            config = json.load(file)
    except FileNotFoundError:
        print('[watcher] Error. File Not Found "%s"' % (file))
    else:
        try:
            directory = to_path(config['watcher_directory'])
            command = config['watcher_command']
        except KeyError:
            print('[watcher] Config not find keys "watcher_directory" or "watcher_command"')
    return {'directory': directory, 'command': command}


if len(arguments) is 2:
    FNAME = to_path(arguments[0])
    SYSCOMMAND = arguments[1]
elif len(arguments) is 1 and os.path.isfile(arguments[0]):
    config = parse_json_file(arguments[0])
    FNAME = config['directory']
    SYSCOMMAND = config['command']
elif os.path.isfile('config.json'):
    config = parse_json_file('config.json')
    FNAME = config['directory']
    SYSCOMMAND = config['command']


if os.path.exists(FNAME) is False:
    print('[watcher] Path not exist "%s". Exit' % (FNAME))
    exit()
elif SYSCOMMAND is False:
    print('[watcher] Command not find. Exit')
    exit()
else:
    print('[watcher] start')


def handler(signum, frame):
    try:
        print('[watcher] Catch changes "%s". run "%s"' % (FNAME, SYSCOMMAND))
        os.system(SYSCOMMAND)
    except RuntimeError:
        pass


# FileNotFoundError:
fd = os.open(FNAME,  os.O_RDONLY)
fcntl.fcntl(fd, fcntl.F_NOTIFY, fcntl.DN_MODIFY | fcntl.DN_MULTISHOT)

signal.signal(signal.SIGIO, handler)

while True:
    time.sleep(1000)
