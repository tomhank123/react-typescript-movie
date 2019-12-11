APP_NAME=$1

if [ "$1" == "--help" ] || [ -z "${APP_NAME}" ] || [ $( echo "${APP_NAME}" | egrep -c "^(client|admin)$" ) -eq 0 ] ; then
  echo "Usage: ./deploy.sh [client | admin]"
  exit 0
fi

CURRENT_DATETIME="$(date +'%Y%m%d.%H%M')"

git checkout release/staging-${APP_NAME}
git pull
git pull origin develop
git tag -a release/staging-${APP_NAME}/${CURRENT_DATETIME}
git push --follow-tags