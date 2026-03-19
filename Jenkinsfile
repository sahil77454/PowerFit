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
                bat 'for /f "tokens=*" %%i in (\'docker ps -q\') do docker stop %%i'
                bat 'for /f "tokens=*" %%i in (\'docker ps -aq\') do docker rm %%i'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 5000:5000 --name powerfit-container powerfit'
            }
        }
    }
}