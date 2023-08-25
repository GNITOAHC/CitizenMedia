package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// uploadImage is the handler for the upload route
func (a *App) uploadImage(w http.ResponseWriter, r *http.Request) {
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
	fmt.Println(storedImage)

	// Respond with success message
	w.Write([]byte("Image uploaded successfully"))

	return
}

func (a *App) displayImage(w http.ResponseWriter, r *http.Request) {
	// Parse the query string parameter _id
	queryValues := r.URL.Query()
	id := queryValues.Get("_id")

	// Convert the _id to an ObjectID
	docId, err := primitive.ObjectIDFromHex(id)
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
