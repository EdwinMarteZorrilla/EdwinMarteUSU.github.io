#!/bin/bash

echo "Copying Files from Server..."

 # scp -r . eedadmin@129.123.49.21:/var/www/html/core
 scp -r eedadmin@129.123.49.21:/var/www/html/core/data/output/. include/data/output

 echo "All files were copied!"