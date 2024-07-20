#!/usr/bin/env bash

if [[ `hyprctl monitors | grep "Monitor" | wc -l` != 1 ]]; then
    hyprctl keyword monitor "eDP-1, disable"
else
    hyprctl keyword monitor "eDP-1, highrr, auto, auto"
fi
