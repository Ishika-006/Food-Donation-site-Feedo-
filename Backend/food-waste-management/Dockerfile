# ---------- build stage ----------
  FROM maven:3.8.6-openjdk-17 AS build
  WORKDIR /workspace
  
  # copy only pom files first (to cache dependencies)
  COPY pom.xml ./
  COPY jps-service/pom.xml jps-service/
  COPY web-service/pom.xml web-service/
  
  # download dependencies
  RUN mvn -B -DskipTests dependency:go-offline
  
  # now copy the full source
  COPY . .
  
  # build the full project
  RUN mvn -B -DskipTests clean package
  
  # ---------- run stage ----------
  FROM eclipse-temurin:17-jre
  WORKDIR /app
  
  # copy the jar produced by web-service module
  COPY --from=build /workspace/web-service/target/*.jar app.jar
  
  EXPOSE 8080
  ENTRYPOINT ["java","-jar","/app/app.jar"]
  