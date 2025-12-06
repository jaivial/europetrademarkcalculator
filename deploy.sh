#!/bin/bash

# Deploy script for Europe Trademark Calculator
# Commits and pushes local changes, then connects to server and forces fresh update from remote repository

echo "🚀 Starting deployment process..."

# Check if there are any changes to commit
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Committing local changes..."

    # Get current timestamp for commit message
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

    # Add all changes
    git add .

    # Create commit with timestamp
    git commit -m "Auto-deployment commit - $TIMESTAMP

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

    if [ $? -eq 0 ]; then
        echo "✅ Changes committed successfully"
    else
        echo "❌ Failed to commit changes"
        exit 1
    fi
else
    echo "ℹ️  No local changes to commit"
fi

# Push to origin
echo "📤 Pushing to remote repository..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Pushed to remote successfully"
else
    echo "❌ Failed to push to remote"
    exit 1
fi

echo "🔗 Connecting to server and deploying latest changes..."

ssh root@178.16.130.178 << 'EOF'
cd /var/www/europetrademarkcalculator
echo "Current directory: $(pwd)"

echo "🔄 Updating code from remote repository..."
echo "Running git clean -fd..."
git clean -fd
echo "Running git reset --hard HEAD..."
git reset --hard HEAD
echo "Running git fetch origin..."
git fetch origin
echo "Running git reset --hard origin/main..."
git reset --hard origin/main

echo "Final git status:"
git status

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "Deployment completed!"
EOF

echo "🎉 Deploy script finished."
