#!/bin/bash

# 
# Install packages
#
PACKAGES=(
	brave-bin
	neovim
	telegram-desktop
	thunar
	thunar-volman
	gvfs
	steam
	nodejs
	npm
	spotify-launcher
	network-manager-applet
)

AUR_PACKAGES=(
)

# sudo pacman -Syu --noconfirm "${PACKAGES[@]}"
# paru -S --noconfirm "${AUR_PACKAGES[@]}"


# 
# Copy my configs
#
dotfiles="$HOME/dots"

CONFIGS=(
	# ghostty
	# niri
	nvim
	# quickshell
)

FILES=(
	.gitconfig
)

echo "Creating symlink for directories in .config"
for value in "${CONFIGS[@]}"
do
	destination="$HOME/.config/$value"
	if [ -d "$destination" ]; then echo "Directory $destination already exists, deleting it"; fi
	if [ -d "$destination" ]; then rm -rf $destination; fi
	ln -s $dotfiles/$value $HOME/.config/
	echo "Symlink for $value has been created ('$dotfiles/$value' -> $destination)"
done

echo "Creating symlink for dotfiles in HOME directory"
for value in "${FILES[@]}"
do
	destination="$HOME/$value"
	if [ -f "$destination" ]; then echo "File $destination already exists, deleting it"; fi
	if [ -f "$destination" ]; then rm $destination; fi
	ln -s $dotfiles/$value $HOME/
	echo "Symlink for $value has been created ('$dotfiles/$value' -> $destination)"
done

echo "Applying niri overrides"
niri_config_destination="$HOME/.config/niri"
ln -sf "$dotfiles/niri/override.kdl" "$niri_config_destination/override.kdl"
echo "include \"override.kdl\"" >> $niri_config_destination/config.kdl

# echo "Disabling bluetooth headset profile switching"
# destination="$HOME/.config/wireplumber/wireplumber.conf.d/51-mitigate-annoying-profile-switch.conf"
# if [ -f "$destination" ]; then echo "File $destination already exists, deleting it"; fi
# if [ -f "$destination" ]; then rm $destination; fi
# if [ ! -d "$HOME/.config/wireplumber" ]; then mkdir $HOME/.config/wireplumber; fi
# if [ ! -d "$HOME/.config/wireplumber/wireplumber.conf.d" ]; then mkdir $HOME/.config/wireplumber/wireplumber.conf.d; fi
# ln -s $dotfiles/51-mitigate-annoying-profile-switch.conf $HOME/.config/wireplumber/wireplumber.conf.d/
# echo "Bluetooth headset profile switching has been disabled"
#
# echo "source /usr/share/cachyos-fish-config/cachyos-config.fish
#
# set -gx EDITOR nvim
#
# if [ (tty) = "/dev/tty1" ]
#     exec Hyprland
# end" > $HOME/.config/fish/config.fish
