package app

import (
	// "encoding/json"
	// "log"
	"net/http"
	// "story-service/internal/models"

	"story-service/internal/handlers"

	"github.com/go-chi/chi/v5"
	// "go.mongodb.org/mongo-driver/bson/primitive"
)

// Routes handle all the routes for the application
func (a *App) Routes() http.Handler {
	// Declare a router
	mux := chi.NewRouter()

	// Create handlers for the routes
	handlers := handlers.New(a.database)

	// Declare the routes
	mux.Get("/", handlers.GetAllStories)

	mux.Route("/retrieve", func(r chi.Router) {
		r.Get("/by-list-id", a.tmpHandler)
		r.Get("/by-tags", a.tmpHandler)
	})

	mux.Post("/create", handlers.CreateStories)

	mux.Patch("/update/{id}", a.tmpHandler)

	mux.Post("/comment/{id}", handlers.AddComment)

	mux.Delete("/delete/{id}", handlers.DeleteStories)
	mux.Delete("/delete/{id}/comment/{commentId}", func(w http.ResponseWriter, r *http.Request) { w.Write([]byte("This is a delete comment handler")) })

	mux.Delete("/drop-collection", a.dropCollection) // For testing purposes

	return mux
}

// tmpHandler is a temporary handler for testing purposes
func (a *App) tmpHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("This is a tmpHandler"))
	return
}

// dropCollection is a handler for dropping the collection (for testing purposes)
func (a *App) dropCollection(w http.ResponseWriter, r *http.Request) {
	err := a.database.DropCollection()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Collection dropped"))
	return
}
