#!/bin/bash

while true; do
    echo "Starting bot..."
    
    # Start the bot process in the foreground and run for 120 seconds
    npm start &
    BOT_PID=$!

    sleep 300  # Let the bot run for 120 seconds

    echo "Stopping bot..."

    # Send 5 Ctrl+C signals to stop gracefully
    for i in {1..5}; do
        kill -SIGINT $BOT_PID 2>/dev/null
        sleep 1
    done

    # If still running, force kill
    if ps -p $BOT_PID > /dev/null; then
        echo "Force killing bot..."
        kill -9 $BOT_PID
    fi

    echo "Clearing screen..."
    clear  # Clear the screen once before restarting

    sleep 3  # Wait 3 seconds before restarting
done
