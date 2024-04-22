all: build

.PHONY: build
build:
	cd libs/mongo-api-server && make
	cd libs/test-helpers && make
