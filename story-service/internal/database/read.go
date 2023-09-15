package database

import (
	"context"
	"log"
	"time"

	"story-service/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetAll retrieves all stories from the database
func (db *Database) ReadAll() ([]*models.Story, error) {
	// Set a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	// Retrieve all stories
	cursor, err := db.database.Find(context.TODO(), bson.D{{}})
	if err != nil {
		log.Println("Error in GetAll")
		return nil, err
	}
	defer cursor.Close(ctx)

	var stories []*models.Story
	for cursor.Next(ctx) {
		var item models.Story

		err := cursor.Decode(&item)
		if err != nil {
			log.Print("Error decoding log into slice:", err)
			return nil, err
		} else {
			stories = append(stories, &item)
		}

	}

	return stories, nil
}

// GetOne retrieves one story from the database based on the id
func (db *Database) ReadOne(id primitive.ObjectID) (*models.Story, error) {
	// Retrieve one story
	var story models.Story
	err := db.database.FindOne(context.Background(), bson.D{primitive.E{Key: "_id", Value: id}}).Decode(&story)
	if err != nil {
		log.Println("Error in GetOne")
		return nil, err
	}

	return &story, nil
}
