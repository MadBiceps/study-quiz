#!/bin/sh

generatePassword() {
  echo $(tr </dev/urandom -dc _a-Z-a-z-0-9 | head -c${1:-$1})
}

CHECK_CERTIFICATES=cerificates/acme.json

if [ -f "$CHECK_CERTIFICATES"]; then
  echo "Certificates File already exists. Going on..."
else
  echo "{}" > certificates/acme.json
  chmod 600 certificates/acme.json
  echo "Certificates File generated. Going on..."
fi

CHECK_ENV=.env
if [ -f "$CHECK_ENV" ]; then
  echo "ENV File already exists. Going on..."
else
  POSTGRES_PASSWORD=$(generatePassword 64)
  echo "POSTGRES_USER=quiz_user" > .env
  echo "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" >> .env

