source .src/logging.lib
source .setup/depends.sh

#----------------------------------------------------------------

service nginx start
python3 server.py