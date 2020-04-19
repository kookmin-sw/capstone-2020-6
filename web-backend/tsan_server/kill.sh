#!/bin/bash
kill `ps ax | grep uwsgi | awk '{print $1}'`
