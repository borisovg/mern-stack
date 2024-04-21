all: build

.PHONY: build
build:
	cd apps/backend && make
	cd libs/mongo-api-server && make
	cd libs/test-helpers && make
