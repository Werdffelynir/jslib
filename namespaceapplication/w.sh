#!/bin/sh


while ( true ); do
  before=`date +%s`
  sleep `echo $(( ( RANDOM % 30 )  + 1 ))` # Place you command here
  after=`date +%s`
  DELAY=`echo "60-($after-$before)" | bc`
  sleep $DELAY
done



#while ( true ); do
#  echo Date starting `date`
#  before=`date +%s`
#  sleep `echo $(( ( RANDOM % 30 )  + 1 ))`
#  echo Before waiting `date`
#  after=`date +%s`
#  DELAY=`echo "60-($after-$before)" | bc`
#  sleep $DELAY
#  echo Done waiting `date`
#done





#repeat() {
#    n=$1
#    shift
#
#    while [ $(( n -= 1 )) -ge 0 ]
#    do
#        "$@"
#    done
#}
#
#repeat 5 echo Hello World !!!

#FILE="/var/www/jslib/namespaceapplication/demo.html"
#
#tail -F ${FILE} | while read line; do
#  if echo "$line" | grep -q '[Ss]ome.regex'; then
#    # do your stuff
#    echo 'Hello'
#  fi
#done
#





#watcher () {
#    while :
#    do
##        clear
#        echo 'Hello'
#        sleep $1
#    done
#};
#
#
#
#watcher 0.5


#
#alias myWatch='_() { while :; do clear; $2; sleep $1; done }; _'
#myWatch 1 ls ## self-explanatory
#myWatch 5 "ls -lF $HOME" ## every 5 seconds, list out home dir; double-quotes around command to keep its args together
#


#ip monitor all >> /some/log.log &
#while inotifywait -qq -e modify /some/log.log; do
#  sleep 0.2;
#  date >>/root/mon.log;
#done


##!/bin/bash
#HOSTS="foo.bar foo2.bar"
#COUNT=4
#while :
#do
#    for myHost in $HOSTS
#    do
#      count=$(ping -c $COUNT $myHost | grep 'received' | awk -F',' '{ print $2 }' | awk '{ print $1 }')
#      if [ $count -eq 0 ]; then
#        # 100% failed
#        echo "Host : $myHost is down (ping failed) at $(date)"
#      fi
#      done
#sleep 15 # here is your refresh rate
#done


#ip monitor all >> /some/log.log &
#while inotifywait -qq -e modify /some/log.log; do
#  sleep 0.2;
#  date >>/root/mon.log;
#done

























