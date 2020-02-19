#!/bin/bash

echo "Moving Files to Server..."

 # scp -r . eedadmin@129.123.49.21:/var/www/html/core
 scp -r js/ data/ include/ media/ main/ db/ css/ index.html eedadmin@129.123.49.21:/var/www/html/core

 echo "All files were moved!"