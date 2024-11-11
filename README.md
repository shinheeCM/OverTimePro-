# OverTimePro-
```
    docker build -t overtime-tracking .
    docker tag overtime-tracking wonbot/shinheeagv:overtime-tracking

    or, 
    
    docker login
    docker build -t wonbot/shinheeagv:overtime-tracking .
    docker push wonbot/shinheeagv:overtime-tracking
    
    docker compose up -d mongodb_server_erp
    docker compose up -d
```