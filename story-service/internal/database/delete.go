package database

import (
	"context"
	"log"
	"story-service/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// DeleteStory deletes a story from the database based on the id
func (db *Database) DeleteStory(id primitive.ObjectID) (*models.Story, error) {
	var story models.Story

	err := db.database.FindOneAndDelete(context.Background(), bson.D{primitive.E{Key: "_id", Value: id}}).Decode(&story)
	if err != nil {
		log.Println("Error in DeleteStory")
		return nil, err
	}

	return &story, nil
}

// DropCollection drops the collection (for testing purposes)
func (db *Database) DropCollection() error {
	err := db.database.Drop(context.Background())
	if err != nil {
		log.Println("Error in DropCollection")
		return err
	}

	return nil
}
