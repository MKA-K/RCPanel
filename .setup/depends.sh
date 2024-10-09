#!/bin/bash

# List of packages to check
packages=("python3" "python3-flask" "wget" "net-tools" "openssh-client" "curl" "python3-pip" "nginx" "ncurses")
aa=true
# Loop through each package
for pkg in "${packages[@]}"
do
    # Check if package is installed
    if ! (dpkg -l | grep -q "^ii  $pkg "); then
        $aa && apt update && aa=false
        apt -qq install $pkg -yq # silent mode
        # not need nginx at this project for now
        # [[ $pkg == "nginx" ]] && soruce .setup/nginx.sh
    fi
done
