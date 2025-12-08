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
)

AUR_PACKAGES=(
	aylurs-gtk-shell-git
	kanata
)

sudo pacman -Syu --noconfirm "${PACKAGES[@]}"
paru -S --noconfirm "${AUR_PACKAGES[@]}"
