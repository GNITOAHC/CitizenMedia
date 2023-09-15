package main

import (
	"log"
	"net/http"
	"story-service/internal/app"
	// "story-service/internal/database"
	// "story-service/internal/handlers"
)

// Declare the port number
const portNumber = ":81"

// type App struct {
// 	database *database.Database
// 	handlers *handlers.Repository
// }

// main is the entry point for the application
func main() {
	// Declare an instance of the application
	a := app.New()

	// Declare the server
	srv := &http.Server{
		Addr:    portNumber,
		Handler: a.Routes(),
	}

	// Start the server
	err := srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
