package database

import (
	"context"
	"log"
	"time"

	"story-service/internal/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateStory creates a new story in the database
func (db *Database) CreateStory(data models.Story) (*mongo.InsertOneResult, error) {
	// Set default values before saving
	data.CreatedAt = primitive.DateTime(time.Now().UnixNano() / int64(time.Millisecond))
	data.Comments = []models.Comment{}
	if data.Tags == nil {
		data.Tags = []string{}
	}

	result, err := db.database.InsertOne(context.Background(), data)
	if err != nil {
		log.Println("Error in CreateStory")
		return nil, err
	}

	return result, nil
}
