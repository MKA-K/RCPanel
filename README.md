# RCPanel
Remote Control panel for MKA-KΣ Project

### Prerequisites 📋

- Python3.x
- Python Flask (request, send_from_directory, Response)
- Python OpenCV
- 720P Camera
- Hotspot supported Wi-Fi adaptor.
- Linux Based OS (EX. debian / arch)

### Depends Installation (DEBIAN) 🛠️

    apt install -y python3 python3-pip python3.11-venv

### Depends Installation (ARCH)   🛠️

    pacman -Syu --needed python python-pip python-virtualenv

### VENV And PIP Depends Setup

    python3 -m venv RCPanel
    source RCPanel/bin/activate
    pip install --upgrade pip
    pip install flask opencv-python

# Hotspot Setup

    # Step 1: Create the hotspot
    nmcli dev wifi hotspot ssid "MKA-KΣ S1" password "MKA.v1s1"

    # Step 2: Set static IP configuration
    nmcli connection modify "MKA-KΣ" ipv4.addresses 192.168.1.10/24
    nmcli connection modify "MKA-KΣ" ipv4.gateway 192.168.1.1 
    nmcli connection modify "MKA-KΣ" ipv4.dns ""
    nmcli connection modify "MKA-KΣ" ipv4.method manual

    # Step 3: Activate the hotspot (if not already activated)
    nmcli connection up "MKA-KΣ"


