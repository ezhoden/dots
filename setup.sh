#!/usr/bin/env bash

dotfiles="$HOME/dots"

configs=(
	ags
	hypr
	kitty
	nvim
)

files=(
	.gitconfig
	.zprofile
	.zshrc
)

echo "Creating symlink for dotfiles in .config"
for value in "${configs[@]}"
do
	destination="$HOME/.config/$value"
	if [ -d "$destination" ]; then echo "Directory $destination already exists, deleting it"; fi
	if [ -d "$destination" ]; then rm -rf $destination; fi
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
