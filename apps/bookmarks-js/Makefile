NPM := pnpm
NPM_BIN := ./node_modules/.bin

all: 

node_modules: package.json
	$(NPM) install || (rm -rf $@; exit 1)
	test -d $@ && touch $@ || true

.PHONY: start-dev
start-dev: node_modules
	while true; do LOG_LEVEL=debug $(NPM_BIN)/nodemon ./index.mjs; sleep 1; done
