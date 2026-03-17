pipeline {
    agent any

    stages {

        stage('Pull Code') {
            steps {
                git branch: 'main', url: 'https://github.com/sahil77454/PowerFit.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t powerfit .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat 'docker stop powerfit-container || exit 0'
                bat 'docker rm powerfit-container || exit 0'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 5000:5000 --name powerfit-container powerfit'
            }
        }
    }
}