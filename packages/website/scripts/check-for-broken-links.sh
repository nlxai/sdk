#! /bin/bash
set -euo pipefail

export CADDY_PORT=9999
echo "starting caddy..."
caddy start --config Caddyfile >/dev/null 2>&1 &

echo "Waiting for Caddy to launch on port 9999..."
# disable -e while we test for caddy to have started
set +e
while ! curl -s -o /dev/null -w "%{http_code}" http://localhost:$CADDY_PORT | grep -q "200"; do
  echo "Waiting for 200 OK response..."
  sleep 1
done
set -e

echo "spidering..."
# Use wget to spider for broken links
# -o specifies the log file
# --spider tells wget to not download pages
# -r enables recursive retrieval
# -l1 limits the depth of recursion to 1 level across domains
# --span-hosts also checks links across domains

set +e
wget --spider -r -l1 --span-hosts -o wget.log http://localhost:$CADDY_PORT
set -e

# Capturing the exit status of wget
WGET_EXIT_STATUS=$?

# Stop Caddy
caddy stop

# If wget exited with a non-zero status, check the log for errors and print them
if [ $WGET_EXIT_STATUS -eq 0 ]; then
  echo "No errors found"
  tail -n 1 wget.log
else
  echo "Errors found during link checking:"
  grep -B 2 -A 2 'ERROR' wget.log
fi

rm wget.log

# Exit with the exit status of wget
exit $WGET_EXIT_STATUS
