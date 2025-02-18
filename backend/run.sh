function up_postgres(){
    cd './source/domain/postgres/' ||  echo "diretório não encontrado o removido"; exit 1; 
    docker compose --project-name "postgres" up -d;
    cd - > /dev/null || exit 1
}


function up_database(){
    docker compose --project-name "shipDB" up -d ||  echo "erro"; exit 1;
}

function database_populate(){
    docker exec shipDB psql -U admin -d 'shipDB' -p 25432 -f /scripts/populate.sql  || echo "error"; exit 1;
}