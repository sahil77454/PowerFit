pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Server Test') {
            steps {
                sh 'node server.js &'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh 'cp -r * /var/www/html/'
            }
        }
    }
}