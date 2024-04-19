PACKAGES := apps/backend libs/mongo-api-server

all: build

.PHONY: build
build:
	cd apps/backend && make
	cd libs/mongo-api-server && make
