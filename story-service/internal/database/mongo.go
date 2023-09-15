package database

import (
	"context"
	"log"
	"time"

	// "story-service/internal/models"

	// "go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	database *mongo.Collection
}

func New() *Database {
	db := connect()
	return &Database{
		database: db,
	}
}

func connect() *mongo.Collection {
	log.Println("Connecting to MongoDB...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Use this for when running in Docker
	// clientOptions := options.Client().ApplyURI("mongodb://root:rootpassword@mongo:27017/")
	// client, err := mongo.Connect(ctx, clientOptions)

	// Use this for when running locally
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://127.0.0.1:27017/"))

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Connected to MongoDB!")

	collection := client.Database("GolangStoryTest").Collection("stories")

	return collection
}

func (db *Database) CreateLike() {}
