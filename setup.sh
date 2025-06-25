#!/bin/bash

dotfiles="$HOME/dots"

source $dotfiles/setup-utils/install-packages.sh

install_packages()

configs=(
	ags
	hypr
	kitty
	nvim
)

config_files=(
	mimeapps.list
)

files=(
	.gitconfig
)

echo "Creating symlink for directories in .config"
for value in "${configs[@]}"
do
	destination="$HOME/.config/$value"
	if [ -d "$destination" ]; then echo "Directory $destination already exists, deleting it"; fi
	if [ -d "$destination" ]; then rm -rf $destination; fi
	ln -s $dotfiles/$value $HOME/.config/
	echo "Symlink for $value has been created ('$dotfiles/$value' -> $destination)"
done

echo "Creating symlink for files in .config"
for value in "${config_files[@]}"
do
	destination="$HOME/.config/$value"
	if [ -f "$destination" ]; then echo "File $destination already exists, deleting it"; fi
	if [ -f "$destination" ]; then rm $destination; fi
	ln -s $dotfiles/$value $HOME/.config/
	echo "Symlink for $value has been created ('$dotfiles/$value' -> $destination)"
done

echo "Creating symlink for dotfiles in HOME directory"
for value in "${files[@]}"
do
	destination="$HOME/$value"
	if [ -f "$destination" ]; then echo "File $destination already exists, deleting it"; fi
	if [ -f "$destination" ]; then rm $destination; fi
	ln -s $dotfiles/$value $HOME/
	echo "Symlink for $value has been created ('$dotfiles/$value' -> $destination)"
done

echo "Disabling bluetooth headset profile switching"
destination="$HOME/.config/wireplumber/wireplumber.conf.d/51-mitigate-annoying-profile-switch.conf"
if [ -f "$destination" ]; then echo "File $destination already exists, deleting it"; fi
if [ -f "$destination" ]; then rm $destination; fi
if [ ! -d "$HOME/.config/wireplumber" ]; then mkdir $HOME/.config/wireplumber; fi
if [ ! -d "$HOME/.config/wireplumber/wireplumber.conf.d" ]; then mkdir $HOME/.config/wireplumber/wireplumber.conf.d; fi
ln -s $dotfiles/51-mitigate-annoying-profile-switch.conf $HOME/.config/wireplumber/wireplumber.conf.d/
echo "Bluetooth headset profile switching has been disabled"

echo "source /usr/share/cachyos-fish-config/cachyos-config.fish

set -gx EDITOR nvim

if [ (tty) = "/dev/tty1" ]
    exec Hyprland
end" > $HOME/.config/fish/config.fish
