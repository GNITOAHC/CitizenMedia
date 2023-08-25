package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Response struct {
	Message string `json:"message"`
	Id      string `json:"id"`
}

// uploadImage is the handler for the upload route
func (a *App) uploadImage(w http.ResponseWriter, r *http.Request) {
	// Check if the request is a POST request
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Check if the request is a multipart formdata
	if r.Header.Get("Content-Type") != "multipart/form-data" {
		http.Error(w, "Unsupported media type", http.StatusUnsupportedMediaType)
		return
	}

	// Parse our multipart form, 10 << 20 specifies a maximum upload of 10 MB files.
	r.ParseMultipartForm(10 << 20)

	// Get the file from the formdata
	file, handler, err := r.FormFile("image")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
	}
	defer file.Close()

	// Read the image data & type
	imageData, err := io.ReadAll(file)
	if err != nil {
		fmt.Println("Error Reading the File")
		fmt.Println(err)
	}
	imageType := http.DetectContentType(imageData)
	log.Println(imageType)

	// Construct the new image
	image := MongoFields{
		Name:     handler.Filename,
		Data:     imageData,
		Type:     imageType,
		Uploaded: time.Now(),
	}

	// Insert the image into the database
	storedImage, err := a.collection.InsertOne(context.Background(), image)
	if err != nil {
		http.Error(w, "Error inserting image data into MongoDB", http.StatusInternalServerError)
		return
	}
	primitiveId := storedImage.InsertedID.(primitive.ObjectID)

	// Respond with success message
	// w.Write([]byte("Image uploaded successfully"))
	res := Response{
		Message: "Image uploaded successfully",
		Id:      primitiveId.Hex(),
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)

	return
}

// displayImage is the handler for the display route
func (a *App) displayImage(w http.ResponseWriter, r *http.Request) {
	// Check if the request is a GET request
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse the query string parameter _id
	queryValues := r.URL.Query()
	targetId := queryValues.Get("_id")

	// Convert the _id to an ObjectID
	docId, err := primitive.ObjectIDFromHex(targetId)
	if err != nil {
		log.Print(err)
		http.Error(w, "Error converting _id to ObjectID", http.StatusInternalServerError)
		return
	}
	log.Println(`bson.M{"_id": docID}:`, bson.M{"_id": docId})

	// Retrieve the image from MongoDB by _id
	var result MongoFields
	err = a.collection.FindOne(context.Background(), bson.M{"_id": docId}).Decode(&result)
	if err != nil {
		log.Print(err)
		http.Error(w, "Error retrieving image from MongoDB", http.StatusInternalServerError)
		return
	}

	// Set appropriate headers
	w.Header().Set("Content-Type", result.Type)
	w.Header().Set("Content-Disposition", "inline; filename="+result.Name)

	// Write the image binary data directly to the response
	imageData := result.Data
	_, err = w.Write(imageData)
	if err != nil {
		http.Error(w, "Error writing image data to response", http.StatusInternalServerError)
	}
}

// deleteImage is the handler for the delete route
func (a *App) deleteImage(w http.ResponseWriter, r *http.Request) {
	// Check if the request is a DELETE request
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Read request to get the target id
	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		log.Print(err)
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}
	targetId := strings.Trim(string(reqBody), "id=")

	// Convert the _id to an ObjectID
	docId, err := primitive.ObjectIDFromHex(targetId)
	if err != nil {
		log.Print(err)
		http.Error(w, "Error converting _id to ObjectID", http.StatusInternalServerError)
		return
	}

	result, err := a.collection.DeleteOne(context.Background(), bson.M{"_id": docId})
	if err != nil {
		log.Print(err)
		http.Error(w, "Error deleting image from MongoDB", http.StatusInternalServerError)
		return
	}
	log.Println("Deleted", result.DeletedCount, "documents")

	// Respond with success Message
	res := Response{
		Message: "Image deleted successfully",
		Id:      targetId,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}
