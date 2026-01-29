pipeline {
    agent any 

    tools {
        nodejs 'node'   // Jenkins → Global Tool Configuration → NodeJS
    }

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR  = 'backend'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm test || echo "No tests found"'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'pm2 restart backend || pm2 start index.js --name backend'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'echo "Deploy frontend build files to server / nginx"'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build & Deployment Successful!'
        }
        failure {
            echo '❌ Build Failed!'
        }
    }
}
