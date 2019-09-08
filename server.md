# Server Data
Hostname: 								feellab
Fully Qualified Domain Name (FQDN):		feellab.engr.usu.edu
IP:										129.123.49.21

Local Account Username:					eedadmin
Password:								Letmein1

DB root password:						YGan6dpn64xW

# To access server

## Linux, OSX
    ssh eedadmin@129.123.49.21

# Copying Files

## Copy folder content to server
### Linux, OSX
    scp -r . eedadmin@129.123.49.21:/var/www/html/core

### Windows (Using cscp from Putty)
    pscp -r * eedadmin@129.123.49.21:/var/www/html/core

## Copy from server to local folder
### Linux, OSX
    scp -r eedadmin@129.123.49.21:/var/www/html/core/data/. include/data

### For Windows
    pscp -r eedadmin@129.123.49.21:/var/www/html/core/data/* c:/temp/data

# Usefull commands
## Create a folder
    sudo mkdir /core

## Change folder permissions
    sudo chmod 777 -R /var/www/html/core

## Remove folder and content
    sudo rm -rf /core

## Remove all content of a folder
    sudo rm -rf /var/www/html/core/*

## Changing files names (extensions), Linux, OSX
    for f in *.foo; do mv -- "$f" "${f%.foo}.bar"; done
    for f in *.PNG; do echo mv -- "$f" "${f%.PNG}.png"; done

# Links
    https://usu.co1.qualtrics.com
