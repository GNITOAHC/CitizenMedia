package database

import (
	"context"
	"log"
	"time"

	"story-service/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func (db *Database) UpdateComment(id primitive.ObjectID, data models.Comment) (*mongo.UpdateResult, error) {
	// Set default values before saving
	data.Date = primitive.DateTime(time.Now().UnixNano() / int64(time.Millisecond))
	data.Id = primitive.NewObjectID()

	// Update the story
	filter := bson.M{"_id": id}
	update := bson.D{
		primitive.E{
			Key: "$push", Value: bson.D{primitive.E{Key: "comments", Value: data}},
		},
	}
	result, err := db.database.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Println("Error in CreateComment")
		return nil, err
	}

	return result, nil
}
