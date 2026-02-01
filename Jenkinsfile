pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR  = 'backend'
    }

    stages {

        stage('Check Node') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm run build'
                }
            }
        }

        stage('Backend Start (Test Run)') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'npm start'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Jenkins pipeline SUCCESS (Windows)'
        }
        failure {
            echo '❌ Jenkins pipeline FAILED (Windows)'
        }
    }
}
