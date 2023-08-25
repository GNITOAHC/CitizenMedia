package main

import (
	"log"
	"net/http"
)

// routes defines the routes for the application
func (a *App) routes() http.Handler {
	// Declare a new router
	mux := http.NewServeMux()

	mux.HandleFunc("/", a.home)
	mux.HandleFunc("/upload", a.uploadImage)
	mux.HandleFunc("/display", a.displayImage)

	return mux
}

// Define the middlewares for the application
func (a *App) middlewares(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Print("Executing middleware")

		//Allow CORS here By * or specific origin
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		next.ServeHTTP(w, r)
		// log.Print("Executing middlewareTwo again")
	})
}

// home is the handler for the home page
func (a *App) home(w http.ResponseWriter, r *http.Request) {
	log.Println("Home page accessed")
	w.Write([]byte("Hello from a HandleFunc #1"))
}
