# Derivando da imagem oficial do MySQL
FROM mysql:8.0.21
# Adicionando os scripts SQL para serem executados na criação do banco
COPY ./db/ /docker-entrypoint-initdb.d/
