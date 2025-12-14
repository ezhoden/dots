#!/bin/bash

PACKAGES=(
	hyprland
	xdg-desktop-portal-hyprland
	grim
	slurp
	wl-clipboard
	swww
	brave-bin
	neovim
	ghostty
	telegram-desktop
	thunar
	thunar-volman
	gvfs
	steam
	nodejs
	npm
	spotify-launcher
	quickshell
	waybar
	wtype
	zen-browser-bin
	blueman
	network-manager-applet
)

AUR_PACKAGES=(
	kanata
	vicinae-bin
)

sudo pacman -Syu --noconfirm "${PACKAGES[@]}"
paru -S --noconfirm "${AUR_PACKAGES[@]}"
