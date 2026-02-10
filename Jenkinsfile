pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Server Test') {
            steps {
                bat 'node server.js'
            }
        }

        stage('Deploy') {
            steps {
                bat 'echo Deployment completed'
            }
        }
    }
}