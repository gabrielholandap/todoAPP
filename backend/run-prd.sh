#!/bin/sh

echo '--Sleeping 15 seconds before start --'; 
sleep 15 ; 

yarn run db:generate ; 
yarn run db:migration:up ; 
yarn run start