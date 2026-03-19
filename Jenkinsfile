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

        stage('Stop All Containers') {
            steps {
                bat 'docker stop $(docker ps -q) || echo no running containers'
                bat 'docker rm $(docker ps -aq) || echo no containers'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 5000:5000 --name powerfit-container powerfit'
            }
        }
    }
}