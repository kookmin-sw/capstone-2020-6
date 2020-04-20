#!/bin/bash
uwsgi --http :8000 --chdir /home/ubuntu/capstone-2020-6/web-backend/tsan_server -w tsan_server.wsgi --daemonize=/home/ubuntu/uwsgi.log
