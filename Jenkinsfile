pipeline {
    agent any
    
    stages {
        stage('Checkout GIT') {
            steps {
                echo 'Pulling...';
                git branch: 'main',
                url: 'https://github.com/NidhalNar/Foyer-Automation.git',
                credentialsId: 'devops2'
            }
        }
        
        
        stage('Docker Compose down') {
            steps {
                script {
                  dir('Spring-Boot') {
                     sh 'docker-compose down'
                }}
            }

    }
    
        stage('Start MySQL Docker') {
            steps {
                script {
                    // Start MySQL Docker container
                    sh 'docker start 449fe3782220'
                }
            }
        }
            stage('Maven Clean Compile') {
            steps {
                 dir('Spring-Boot') {
                sh 'mvn clean'
                echo 'Running Maven Compile'
                sh 'mvn compile'
            }}
        }
        stage('Tests - JUnit/Mockito') {
            steps {
                 dir('Spring-Boot') {
                sh 'mvn test'
            }}
        }
        stage('Build package') {
            steps {
                 dir('Spring-Boot') {
                sh 'mvn package'
            }}
        }
        stage('Maven Install') {
            steps {
                 dir('Spring-Boot') {
                sh 'mvn install'
            }}
        }
        stage('Rapport JaCoCo') {
            steps {
                 dir('Spring-Boot') {
                sh 'mvn test'
                sh 'mvn jacoco:report'
            }}
        }
        stage('JaCoCo coverage report') {
            steps {
                 dir('Spring-Boot') {
                step([$class: 'JacocoPublisher',
                      execPattern: '**/target/jacoco.exec',
                      classPattern: '**/classes',
                      sourcePattern: '**/src',
                      exclusionPattern: '*/target/**/,**/*Test*,**/*_javassist/**'
                ])
            }}
        }
 
        
        
        
        
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    dir('Spring-Boot') {
                        withSonarQubeEnv('SonarQubeServer') {
                            sh 'mvn sonar:sonar'
                        }
                    }
                }
            }
        }
       
         stage('Deploy to Nexus') {
            steps {
                script {
                    dir('Spring-Boot') {
                        withCredentials([usernamePassword(credentialsId: 'Devops', usernameVariable: 'NEXUS_USERNAME', passwordVariable: 'NEXUS_PASSWORD')]) {
                            sh "mvn deploy -DskipTests"
                        }
                    }
                }
            }
        }
        
          stage('Build and Push Image Back') {
               steps {
                   script {
                          dir('Spring-Boot') {
                       docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                           def customImage = docker.build("narnidhal/foyer:6.0")
                          // def version = "narnidhal/foyer:${env.BUILD_NUMBER}.0"
                           // def customImage = docker.build(version)
                           //customImage.push()
                       }
                              
                     }
                   }
               }
           }
            
          stage('Build and Push Image Front') {
               steps {
                   script {
                          dir('Angular') {
                       docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                           def customImage = docker.build("narnidhal/foyerfront:4")
                          // def version = "narnidhal/foyer:${env.BUILD_NUMBER}.0"
                           // def customImage = docker.build(version)
                           customImage.push()
                       }
                              
                     }
                   }
               }
           }
        
        
   
 stage('Docker Compose') {
            steps {
                script {
                  dir('Spring-Boot') {
                    // Start MySQL Docker container
                    sh 'docker stop 449fe3782220'
                    sh 'docker-compose up -d'
                }}
            }

    }
        
}
    
}