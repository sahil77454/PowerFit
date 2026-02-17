pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Start Server') {
    steps {
        bat 'start /B node server.js'
        bat 'ping 127.0.0.1 -n 10 > nul'
    }
}

        stage('Selenium Test') {
            steps {
                bat 'node seleniumTest.js'
            }
        }

        stage('Build') {
            steps {
                bat 'echo Build completed'
            }
        }

        stage('Deploy') {
            steps {
                bat 'echo Application deployed successfully'
            }
        }
    }
}