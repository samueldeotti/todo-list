# 1º estágio
FROM eclipse-temurin:21-jdk-jammy AS build-image
WORKDIR /app
COPY . .
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests=true -Dfile.encoding=UTF-8

# 2º estágio
FROM eclipse-temurin:21-jre-jammy
COPY --from=build-image /app/target/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
