env:
	cp .env.example .env

docker-build:
	docker build . -t node-express-api:latest