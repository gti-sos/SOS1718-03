#!/bin/bash

case $1 in 
    heroku)
    npm test -- --params.host=sos1718-03.herokuapp.com --params.port=80
    ;;
    *)
    npm test
    ;;
esac