.PHONY: all build clean debug run shell

all: build run

build: clean
	docker-compose build

run:
	docker-compose up

debug: build
	docker-compose run --service-ports api python3 -m pdb main.py

shell: build
	docker-compose run --service-ports api /bin/sh

clean:
	docker-compose down
