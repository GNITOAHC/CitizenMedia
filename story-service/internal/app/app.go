package app

import "story-service/internal/database"

// App is the application struct
type App struct {
	database *database.Database
}

// New creates a new App instance
func New() *App {
	db := database.New()
	return &App{
		database: db,
	}
}
