# Base go image
FROM golang:1.21-alpine3.17 as image-service-builder

RUN mkdir /app

COPY . /app

WORKDIR /app

# Not using any c library
RUN CGO_ENABLED=0 go build -o imageApp ./cmd/api

# Make sure imageApp is executable
RUN chmod +x /app/imageApp


# Build a small image
FROM alpine:latest

RUN mkdir /app

# Copy the executable
COPY --from=image-service-builder /app/imageApp /app

# Run the image
CMD [ "/app/imageApp" ]
