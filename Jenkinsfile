pipeline {
  agent any
  stages {
    stage('Node Install') {
      agent {
        docker {
          image 'node:16-alpine'
        }
       }
       steps {
         sh 'node --version'
       }
    }
    stage('Docker Build') {
      steps {
      	sh 'docker build -t loginapp:latest .'
      }
    }
  }
}
