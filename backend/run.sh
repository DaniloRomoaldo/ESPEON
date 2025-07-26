#!/bin/bash
set -x

# --- FUNÇÕES DE CONTROLE DOS AMBIENTES ---

# Sobe os dois ambientes principais: shipDB e o sandbox postgres
function up_all() {
    echo "Subindo o banco de dados principal (shipDB)..."
    # Usa -f para especificar o arquivo, evitando a necessidade de 'cd'
    docker compose -f ./docker-compose.yaml --project-name "shipDB" up -d
    
    echo "Subindo o ambiente sandbox (postgres)..."
    docker compose -f ./source/domain/postgres/docker-compose.yaml --project-name "postgres" up -d
    
    echo "Ambientes iniciados."
}

# Popula o banco de dados shipDB com os dados iniciais
function database_populate() {
    echo "Aguardando o shipDB ficar pronto..."
    sleep 5 # Um pequeno delay para garantir que o banco de dados está pronto para aceitar conexões

    echo "Populando o banco de dados shipDB..."
    # O nome do container é geralmente 'nome-do-projeto_nome-do-servico_1'.
    # O nome do container do shipDB é 'shipDB-shipDB-1'
    docker exec shipDB-shipDB-1 psql -U admin -d shipDB -h shipDB -f /scripts/populate.sql
    
    echo "Banco de dados populado."
}

# Para e remove os dois ambientes principais
function down_all() {
    echo "Parando o banco de dados principal (shipDB)..."
    docker compose -f ./docker-compose.yaml --project-name "shipDB" down -v

    echo "Parando o ambiente sandbox (postgres)..."
    docker compose -f ./source/domain/postgres/docker-compose.yaml --project-name "postgres" down -v

    echo "Ambientes finalizados."
}

# --- FUNÇÃO DE MANUTENÇÃO ---

# Limpa redes Docker não utilizadas que podem ter ficado "órfãs"
function cleanup() {
    echo "Limpando redes Docker não utilizadas..."
    # A flag -f força a limpeza sem pedir confirmação
    docker network prune -f
    echo "Limpeza de redes concluída."
}


# --- LÓGICA PRINCIPAL DO SCRIPT ---

# Verifica o primeiro argumento passado para o script
case "$1" in
    up)
        up_all
        ;;
    populate)
        database_populate
        ;;
    down)
        down_all
        ;;
    cleanup)
        cleanup
        ;;
    *)
        echo "Uso: $0 {up|populate|down|cleanup}"
        exit 1
        ;;
esac

exit 0