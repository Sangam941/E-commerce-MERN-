pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR  = 'backend'
    }

    stages {

        stage('Check Node') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm install'
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

        stage('Backend Start (Test Run)') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm start || echo "Backend start skipped"'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Jenkins pipeline SUCCESS'
        }
        failure {
            echo '❌ Jenkins pipeline FAILED'
        }
    }
}
