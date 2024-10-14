    nmcli device wifi hotspot ifname wlan0 con-name "hotspot" ssid "MKA-KΣ S1" password "MKA.v1s1"

    # Step 2: Set static IP configuration
    nmcli c modify hotspot ipv4.addresses 192.168.1.10/24
    nmcli c modify hotspot ipv4.gateway 192.168.1.1 

    # Step 3: Activate the hotspot (if not already activated)
    nmcli c down hotspot
    nmcli c up hotspot