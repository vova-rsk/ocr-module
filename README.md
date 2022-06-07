# ocr-module

test task. app that gets image url, sends it via RabbitMQ to ocr-microservice and recieves back digitized text data.

How to test:

1. Clone repository.
2. Create settings file ".env" in the root app dir and set your ports settings or the same as in .env.example file.
3. From the root app dir run command "npm start" or "npm run start:dev" to start the app and ocr-microservice.
4. Route for sending POST request with fileUrl field : /media

