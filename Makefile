args=`arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

run-dev:
	npm start

build-staging:
	npm run build-staging

build-production:
	npm run build-production