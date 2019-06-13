set -e

ARTIFACTS_ROOT=${ARTIFACTS_ROOT:-artifacts}
APPDIRNAME=app-$(date --utc '+%Y-%m-%d-%H-%M-%S')Z

# Copies arg1 to arg2 and replace a bunch of static settings
replace_web_config() {
    sed "
        s/_APPDIR_/$APPDIRNAME/g
        s/_ITINVENTORYDB_DBO_CONNSTRING_/$ITINVENTORYDB_DBO_CONNSTRING/g
        s/_ITINVENTORYDB_APPUSER_CONNSTRING_/$ITINVENTORYDB_APPUSER_CONNSTRING/g
        s/_JWT_SECRET_/$JWT_SECRET/g
    " $1 > $2
}

# Find the app directories we want to delete after deployment. Retain the most recent version as backup
# arg1: The root of the SFTP folder containing app directories
get_stale_dirs_script() {
    echo "cd $1"
    lftp -c "
        open $SFTPURI
        renlist $1/
    "   | grep -E '^app-[0-9]{4}(-[0-9]{2}){5}Z\/$' \
        | sort -r \
        | tail -n +3 \
        | sort \
        | sed "s/^/rm -r /g"
}

# Recursively delete all app directories but the current and one backup
# arg1: The root of the SFTP folder containing app directories
# arg2: A suffix for the temp file name
delete_stale_app_dirs() {
    get_stale_dirs_script $1 > /tmp/deletable-appdirs-$2

    echo "Running the following deletion script to clean up stale app directories under $1"
    cat /tmp/deletable-appdirs-$2

    lftp $SFTPURI < /tmp/deletable-appdirs-$2
}

# Build the target web.config
replace_web_config $API_WEBCONFIGTEMPLATE /tmp/api-web.config

lftp -c "
open $SFTPURI

# Take down the app with app_offline, which will wait up to 10 seconds for a graceful shutdown.
put /tmp/app_offline.htm -o $API_SFTPROOT/app_offline.htm

mirror --verbose=3 -R $ARTIFACTS_ROOT/backend-api $API_SFTPROOT/$APPDIRNAME
mirror --verbose=3 -R $ARTIFACTS_ROOT/frontend-admin $API_SFTPROOT/$APPDIRNAME/wwwroot

put /tmp/api-web.config -o $API_SFTPROOT/web.config

rm $API_SFTPROOT/app_offline.htm
"

echo "API app has been deployed"

delete_stale_app_dirs $API_SFTPROOT api

