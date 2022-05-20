docker-start:
	docker-compose up -d
docker-build:
	docker-compose up --build
docker-stop:
	docker-compose stop
docker-down:
	docker-compose down
docker-seed:
	docker-compose exec users node src/modules/users_seed.js
