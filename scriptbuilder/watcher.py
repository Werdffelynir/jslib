import time
import fcntl
import os
import signal

FNAME = "src"
SYSCOMMAND = 'php -f parser.php'

def handler(signum, frame):
    try:
        print("Watcher: modified.")
        os.system(SYSCOMMAND)
    except RuntimeError:
        pass

signal.signal(signal.SIGIO, handler)
fd = os.open(FNAME,  os.O_RDONLY)
fcntl.fcntl(fd, fcntl.F_SETSIG, 0)
fcntl.fcntl(fd, fcntl.F_NOTIFY, fcntl.DN_MODIFY | fcntl.DN_CREATE | fcntl.DN_MULTISHOT)


while True:
    time.sleep(10000)