# RCPanel
Remote Control panel for MKA-KΣ Project

### Prerequisites 📋

- Python3.x
- Python Flask (request, send_from_directory, Response)
- Python OpenCV
- 720P Camera
- Hotspot supported Wi-Fi adaptor.
- Linux Based OS (EX. debian / arch)

## 1. Setup

### 1.1. Depends Installation (DEBIAN) 🛠️

    apt install -y python3 python3-pip python3.11-venv

### 1.2. Depends Installation (ARCH)   🛠️

    pacman -Syu --needed python python-pip python-virtualenv

### 1.3. Clone The Repo

    git clone https://github.com/MKA-K/RCPanel.git

### 1.4. Setup VENV And PIP Depends 

    python3 -m venv RCPanel
    source RCPanel/bin/activate
    pip install --upgrade pip
    pip install flask opencv-python
    deactivate

### 1.5. Run Code (in RCPanel path)

    bash main.sh

---

## 2. Copy-Paste Setup

    curl https://raw.githubusercontent.com/MKA-K/RCPanel/refs/heads/main/.setup/setup.sh | bash

## 3. Hotspot Setup

    # Step 1: Create the hotspot
    nmcli device wifi hotspot ifname wlan0 con-name "hotspot" ssid "MKA-KΣ S1" password "MKA.v1s1"

    # Step 2: Set static IP configuration
    nmcli c modify hotspot ipv4.addresses 192.168.1.10/24
    nmcli c modify hotspot ipv4.gateway 192.168.1.1 

    # Step 3: Activate the hotspot (if not already activated)
    nmcli c down hotspot
    nmcli c up hotspot


