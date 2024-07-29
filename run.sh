#!/bin/bash
tmux kill-session -t reporter
tmux new-session -s reporter -d
tmux split-window -h -l "50%"
tmux send-keys -t 1 C-z "./web/node_modules/.bin/vite ./web" Enter
tmux send-keys -t 2 C-z "source ./core/.venv/bin/activate && py ./core/api.py" Enter
#tmux select-window -t 1
tmux attach-session -t reporter
