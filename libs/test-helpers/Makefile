MOCHA_OPTS := --bail
NPM := pnpm
NPM_BIN := ./node_modules/.bin
TS_FILES := $(shell find src/ -name '*.ts')

all: dist

## help:		show this help
.PHONY: help
help:
	@sed -n 's/^##//p' Makefile | sort

## clean: 	delete generated files
.PHONY: clean
clean:
	rm -rf coverage dist node_modules

dist: node_modules $(TS_FILES) tsconfig.json Makefile
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

## test:		run unit tests (set FILE env variable to run test for that file only)
.PHONY: test
ifdef FILE
test: dist
	$(NPM_BIN)/c8 --reporter=none $(NPM_BIN)/ts-mocha $(MOCHA_OPTS) $(FILE)
else
test: dist
	$(NPM_BIN)/c8 --reporter=none $(NPM_BIN)/ts-mocha $(MOCHA_OPTS) 'src/**/*.test.ts' \
		&& $(NPM_BIN)/c8 report --all --clean -n src -x 'src/**/*.test.ts' -x 'src/types.*' --reporter=text
endif
