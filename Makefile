args=`arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

run-dev:
	npm start

build-staging:
	npm run build-staging

build-production:
	npm run build-production

new-component:
	node tools/CreateNewComponent.js component $(args)

new-component-redux:
	node tools/CreateNewComponent.js component $(args) redux

new-module:
	node tools/CreateNewComponent.js module $(args)

new-module-redux:
	node tools/CreateNewComponent.js module $(args) redux

new-reducer:
	node tools/CreateNewComponent.js reducer $(args)