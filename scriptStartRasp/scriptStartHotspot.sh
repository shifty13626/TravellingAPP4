#!/bin/bash
echo "Start hotspot ..."

#copy interfaces
sudo rm /etc/network/interfaces
sudo cp /home/pi/TravellingAPP4/scriptStartRasp/filesConfWifi/interfaces_hotspot /etc/network/interfaces

#restart network service
sudo service networking restart

#start hostpot
