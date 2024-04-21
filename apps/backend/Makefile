MOCHA_OPTS := --bail
TS_FILES := $(shell find src/ -name '*.ts')
NPM := pnpm
NPM_BIN := ./node_modules/.bin

all: dist

## help:		show this help
.PHONY: help
help:
	@sed -n 's/^##//p' Makefile | sort

## clean: 	delete generated files
.PHONY: clean
clean:
	rm -rf coverage dist node_modules

dist: node_modules $(TS_FILES) tsconfig.json tsconfig-build.json Makefile
	rm -rf $@
	$(NPM_BIN)/tsc -p tsconfig-build.json

## lint:		run linter checks
.PHONY: lint
lint: node_modules
	$(NPM_BIN)/prettier --check 'src/**/*.{js,ts,json,md,yml}'
	$(NPM_BIN)/eslint src/ --max-warnings 0

node_modules: package.json
	$(NPM) install || (rm -rf $@; exit 1)
	test -d $@ && touch $@ || true

## start-dev:	start application in develoment mode
.PHONY: start-dev
start-dev:
	LOG_LEVEL=debug $(NPM_BIN)/ts-node -e 'require("./src/index.ts").start()'

## test:		run unit tests (set FILE env variable to run test for that file only)
.PHONY: test
ifdef FILE
test:
	$(NPM_BIN)/c8 --reporter=none $(NPM_BIN)/ts-mocha $(MOCHA_OPTS) $(FILE)
else
test:
	$(NPM_BIN)/c8 --reporter=none $(NPM_BIN)/ts-mocha $(MOCHA_OPTS) 'src/**/*.spec.ts' \
		&& $(NPM_BIN)/c8 report --all --clean -n src -x 'src/**/*.spec.ts' -x 'src/types.*' --reporter=text
endif
