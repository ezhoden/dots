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
	wtype
	zen-browser-bin
)

AUR_PACKAGES=(
	kanata
)

sudo pacman -Syu --noconfirm "${PACKAGES[@]}"
paru -S --noconfirm "${AUR_PACKAGES[@]}"
