pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'echo Build completed'
            }
        }

        stage('Deploy') {
            steps {
                bat 'echo Deployment completed'
            }
        }
    }
}