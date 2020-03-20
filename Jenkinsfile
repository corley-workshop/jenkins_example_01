pipeline {
    agent {
        label 'agente1'
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }

    stages {
        stage("Test and publish result") {
            agent {
                docker {
                    image 'node:lts-alpine'
                }
            }

            steps {
                script {
                    sh 'npm i'
                    sh 'npm test'
                    junit 'test-results.xml'
                }
            }
        }

        stage("Build docker image") {
            steps {
                script {
                    sh 'docker build -t api:${GIT_COMMIT} .'
                }
            }
        }

        stage("Stop old container") {
            steps {
                script {
                    sh 'docker stop web || true'
                }
            }
        }

        stage("Launch new container") {
            steps {
                script {
                    sh 'docker run -p 3000:3000 --name=web --rm -d api:${GIT_COMMIT}'
                }
            }
        }
    }
}
