
[[ ! -f /tmp/logging.lib ]] && \
    curl https://raw.githubusercontent.com/the-abra/func4bash/refs/heads/main/logging.lib -o /tmp/logging.lib

source /tmp/logging.lib

function run() {
    if [[ $(command -v $1) ]]; then
        eval $@ &> /tmp/rcpanel-setup.log
        [[ $? == 1 ]] && log.error "An error accoured during process" && log.sub "CMD: $@" && log.sub "Log: /tmp/rcpanel-setup.log" && exit 1
    else
        log.error "Command not found! ($1)"
        exit 1
    fi
}

log.info "Installing depends..."

if [[ $(command -v apt) ]]; then
    apt install -y python3 python3-pip python3.11-venv 2> /dev/null
else
    pacman -Syu --needed python python-pip python-virtualenv 2> /dev/null
fi

log.info "Clonning Files via Git..."
run git clone https://github.com/MKA-K/RCPanel.git

[[ ! -f ./RCPanel ]] && log.error "./RCPanel not found!" && exit 1

log.info "Creating VENV..."
run python3 -m venv RCPanel
source RCPanel/bin/activate
run pip install --upgrade pip
run pip install flask opencv-python
deactivate

log.done "Setup Finished :D"
log.sub "RUN: bash main.sh"
exit 0