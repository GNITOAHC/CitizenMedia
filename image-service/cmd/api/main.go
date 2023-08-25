package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// portNumber is the port number that the server will listen on
const portNumber = ":80"

// App is the struct that holds the MongoDB collection
type App struct {
	collection *mongo.Collection
}

// MongoFields is the struct that defines the fields in the MongoDB database
type MongoFields struct {
	Id       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name     string             `bson:"name" json:"name"`
	Data     []byte             `bson:"data" json:"data"`
	Type     string             `bson:"type" json:"type"`
	Uploaded time.Time          `bson:"uploaded" json:"uploaded"`
}

// main is the entry point for the application
func main() {
	log.Println("Starting server on port", portNumber)

	// Declare database client
	client := connectToDB()
	defer client.Disconnect(context.Background())

	// Declare the app
	app := App{
		collection: client.Database("GolangImageTest").Collection("images"),
	}

	// Declare the server
	srv := &http.Server{
		Addr:    portNumber,
		Handler: app.routes(),
	}

	// Start the server
	err := srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}

// connectToDB connects to the MongoDB database and returns the collection
func connectToDB() *mongo.Client {
	log.Println("Connecting to MongoDB...")

    clientOptions := options.Client().ApplyURI("mongodb://root:rootpassword@mongo:27017/")
	// clientOptions.SetAuth(options.Credential{
	// 	Username: "admin",
	// 	Password: "password",
	// })

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	// client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://127.0.0.1:27017/"))
	// defer client.Disconnect(ctx)

	if err != nil {
		log.Fatal(err)
	}

    // Check the connection
    err = client.Ping(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }
    log.Println("Connected to MongoDB!")

	// collection := client.Database("GolangImageTest").Collection("images")

	return client
}
