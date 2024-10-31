#!/bin/sh

echo "Iniciando o Nginx..."
# Inicie o serviço Nginx no modo daemon desligado
nginx -g 'daemon off;' 

# Mantém o container rodando caso o Nginx ou a app falhem
tail -f /dev/null