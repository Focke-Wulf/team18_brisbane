#!/bash/sh

# ---------------------------------------------------------
# Nectar Playbook script
# Team 18 - Brisbane Configuration Script
# Members:
#    - Shawn Fallon
#    - Luke Jones
#    - Ivan Sanchez
#    - Pablo Serrano
#    - Youhan Xia
# Description:
#   This script executes all the necessary ansible playbook
#  scripts to configure servers and harvesters.
# ---------------------------------------------------------

INVENTORY="hosts"
echo "[DEBUG] inventory=$INVENTORY"
SSH_PRIVATE_KEY="ccteam18.pem"
echo "[DEBUG] private key=$SSH_PRIVATE_KEY"

CMD="ansible-playbook -i $INVENTORY --private-key=$SSH_PRIVATE_KEY server-setup.yml -vvvv"
echo "[DEBUG] server playbook command line=$CMD"
eval $CMD

CMD="ansible-playbook -i $INVENTORY --private-key=$SSH_PRIVATE_KEY harvesters-setup.yml -vvvv"
echo "[DEBUG] harvesters playbook command line=$CMD"
eval $CMD
