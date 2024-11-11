# OverTimePro-
```
    docker build -t overtime-tracking .
    docker tag overtime-tracking wonbot/shinheeagv:overtime-tracking
    docker login
    docker push wonbot/shinheeagv:overtime-tracking
    docker compose up -d mongodb_server_erp
```