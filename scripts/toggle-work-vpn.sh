#!/bin/bash

CONNECTION_NAME=IVA

if [[ -n $(nmcli connection show $CONNECTION_NAME | grep "VPN connected") ]]; then
  nmcli connection down $CONNECTION_NAME;
  notify-send "IVA VPN" "Disconnected"
else
  nmcli connection up $CONNECTION_NAME;
  notify-send "IVA VPN" "Connected"
fi
