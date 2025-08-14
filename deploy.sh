#!/bin/bash

# AI Body Language Decoder - Deployment Script
# This script helps deploy the application to various cloud platforms

set -e

echo "🚀 AI Body Language Decoder - Deployment Script"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_status "Docker and Docker Compose are installed ✓"
}

# Check if required files exist
check_files() {
    required_files=("docker-compose.yml" "api/package.json" "web/package.json")
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            print_error "Required file $file not found!"
            exit 1
        fi
    done
    
    print_status "All required files are present ✓"
}

# Deploy to Render
deploy_render() {
    print_status "Deploying to Render..."
    
    # Check if Render CLI is installed
    if ! command -v render &> /dev/null; then
        print_warning "Render CLI not found. Installing..."
        curl -fsSL https://render.com/install.sh | sh
    fi
    
    # Deploy using render.yaml
    if [ -f "render.yaml" ]; then
        print_status "Using render.yaml configuration..."
        render deploy --yaml render.yaml
    else
        print_error "render.yaml not found!"
        exit 1
    fi
    
    print_status "Render deployment initiated!"
    print_status "Check your Render dashboard for deployment status"
}

# Deploy to Railway
deploy_railway() {
    print_status "Deploying to Railway..."
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI not found. Installing..."
        curl -fsSL https://railway.app/install.sh | sh
    fi
    
    # Login to Railway
    railway login
    
    # Deploy using railway.toml
    if [ -f "railway.toml" ]; then
        print_status "Using railway.toml configuration..."
        railway up
    else
        print_error "railway.toml not found!"
        exit 1
    fi
    
    print_status "Railway deployment initiated!"
}

# Deploy to Fly.io
deploy_fly() {
    print_status "Deploying to Fly.io..."
    
    # Check if Fly CLI is installed
    if ! command -v fly &> /dev/null; then
        print_warning "Fly CLI not found. Installing..."
        curl -L https://fly.io/install.sh | sh
    fi
    
    # Login to Fly
    fly auth login
    
    # Deploy using fly.toml
    if [ -f "fly.toml" ]; then
        print_status "Using fly.toml configuration..."
        fly deploy
    else
        print_error "fly.toml not found!"
        exit 1
    fi
    
    print_status "Fly.io deployment initiated!"
}

# Deploy to Heroku
deploy_heroku() {
    print_status "Deploying to Heroku..."
    
    # Check if Heroku CLI is installed
    if ! command -v heroku &> /dev/null; then
        print_warning "Heroku CLI not found. Installing..."
        curl https://cli-assets.heroku.com/install.sh | sh
    fi
    
    # Login to Heroku
    heroku login
    
    # Create Heroku apps
    heroku create body-language-api
    heroku create body-language-web
    
    # Deploy API
    cd api
    git add .
    git commit -m "Deploy API to Heroku"
    git push heroku main
    cd ..
    
    # Deploy Web
    cd web
    heroku create body-language-web
    git add .
    git commit -m "Deploy Web to Heroku"
    git push heroku main
    cd ..
    
    print_status "Heroku deployment initiated!"
}

# Main deployment menu
show_menu() {
    echo
    echo "Select a deployment option:"
    echo "1) Render (Recommended - Free tier available)"
    echo "2) Railway (Free tier available)"
    echo "3) Fly.io (Pay-as-you-go)"
    echo "4) Heroku (Free tier available)"
    echo "5) Local Docker (for testing)"
    echo "6) Exit"
    echo
}

# Main execution
main() {
    check_docker
    check_files
    
    while true; do
        show_menu
        read -p "Enter your choice (1-6): " choice
        
        case $choice in
            1)
                deploy_render
                break
                ;;
            2)
                deploy_railway
                break
                ;;
            3)
                deploy_fly
                break
                ;;
            4)
                deploy_heroku
                break
                ;;
            5)
                print_status "Starting local Docker deployment..."
                docker-compose up -d
                print_status "Application running at:"
                print_status "Web: http://localhost:3000"
                print_status "API: http://localhost:5000"
                break
                ;;
            6)
                print_status "Exiting..."
                exit 0
                ;;
            *)
                print_error "Invalid choice. Please select 1-6."
                ;;
        esac
    done
}

# Run main function
main
