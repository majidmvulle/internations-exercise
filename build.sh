#!/usr/bin/env bash

env="$1"

if [[ "$env" == "" ]];
then
    env="prod"
fi

echo ""
echo "Running composer"
composer install


echo ""
echo "Building Front End"
yarn install
yarn run build --$env

echo ""
echo "Generating database"
bin/console doctrine:database:create

echo ""
echo "Running migrations"
echo "y" | bin/console doctrine:migrations:migrate

