# DevOps Project - 4TWIN4

## Overview
This project aims to implement a DevOps pipeline for managing and deploying a Spring Boot and Angular application. The pipeline includes various stages from development to deployment, utilizing different tools and technologies.

## Stages
1. **Application Development:**
   - Developing the application using Spring Boot for the backend and Angular for the frontend.

2. **Dependency Management:**
   - Managing Spring Boot application dependencies using Maven.

3. **Continuous Integration:**
   - Triggering pipeline build events with GitHub.
   - Managing and version controlling source code using Git with GitHub hosting service.
   - Creating and running tests with JUnit and Mockito.
   - Checking the quality of source code using SonarQube.
   - Measuring code coverage and reporting it via visual reports with JaCoCo.

4. **Artifact Management:**
   - Hosting artifacts using Nexus3.

5. **Containerization:**
   - Configuring Docker Compose and Dockerfile to set up and build a working environment with Spring Boot, MySQL, and Angular.

6. **Continuous Integration & Automation:**
   - Implementing continuous integration and automation using Jenkins Pipeline.

7. **Continuous Delivery:**
   - Achieving continuous delivery by pushing generated Docker images to DockerHub.

8. **Monitoring and Visualization:**
   - Data tracking and visualization with Prometheus and Grafana.

## Tools and Technologies Used
- Spring Boot
- Angular
- Maven
- GitHub
- Git
- JUnit
- Mockito
- SonarQube
- JaCoCo
- Nexus3
- Docker
- Docker Compose
- Jenkins
- DockerHub
- Prometheus
- Grafana


## Screenshots
1. Jenkins Pipeline:
   ![Jenkins Pipeline](/images/jenkins_pipeline.png)
   
2. SonarQube Dashboard:
   ![SonarQube Dashboard](/images/sonarqube_dashboard.png)
   
3. Docker Containerization:
   ![Docker Containerization](/images/ocker_containerization.png)

4. Prometheus metrics:
   ![Prometheus Metric](/images/prometheus.png)

5. Grafana Spring:
   ![Grafana Spring](/images/spring.png)

5. FrontEnd With Docker-Compose:
   ![Frontend ](/images/front.png)
