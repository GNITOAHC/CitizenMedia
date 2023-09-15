package handlers

// import "story-service/internal/app"
import (
	"encoding/json"
	"log"
	"net/http"
	"story-service/internal/database"
	"story-service/internal/models"

	"github.com/go-chi/chi/v5"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Repository struct {
	database *database.Database
}

func New(db *database.Database) *Repository {
	return &Repository{database: db}
}

func (repo *Repository) GetAllStories(w http.ResponseWriter, r *http.Request) {
	stories, err := repo.database.ReadAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	j, err := json.Marshal(stories)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(j))
	return
}

// createStories is a handler for creating a story
func (repo *Repository) CreateStories(w http.ResponseWriter, r *http.Request) {
	// Read the body as JSON
	var story models.Story
	err := json.NewDecoder(r.Body).Decode(&story)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := repo.database.CreateStory(story)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	createdStory, err := repo.database.ReadOne(result.InsertedID.(primitive.ObjectID))
	j, err := json.Marshal(createdStory)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(j))
	return
}

func (repo *Repository) AddComment(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var comment models.Comment
	err := json.NewDecoder(r.Body).Decode(&comment)
	if err != nil {
		log.Println("Error in AddComment")
		log.Print(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Convert the id to an ObjectID
	objId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("Error in AddComment (Converting id to ObjectID)")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = repo.database.UpdateComment(objId, comment)
	if err != nil {
		log.Println("Error in AddComment (CreateComment)")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("Comment added"))
	return
}

// deleteStories is a handler for deleting a story
func (repo *Repository) DeleteStories(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	objId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	deleted, err := repo.database.DeleteStory(objId)
	if err != nil {
		log.Println("Error in deleteStories")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	j, err := json.Marshal(deleted)
	if err != nil {
		log.Println("Error in deleteStories")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(j))

	return
}
