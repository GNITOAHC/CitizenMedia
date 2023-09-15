package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Story struct {
	Id        primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Author    string             `bson:"author" json:"author"`
	AuthorId  primitive.ObjectID `bson:"authorId,omitempty" json:"authorId,omitempty"`
	Content   string             `bson:"content" json:"content"`
	Title     string             `bson:"title" json:"title"`
	SubTitle  string             `bson:"subTitle" json:"subTitle"`
	CreatedAt primitive.DateTime `bson:"createdAt" json:"createdAt" default:"new Date()"`
	Comments  []Comment          `bson:"comments,omitempty" json:"comments,omitempty" default:"[]"`
	Tags      []string           `bson:"tags" json:"tags" default:"[]"`
}

type Comment struct {
	Id          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Comment     string             `bson:"comment" json:"comment"`
	Date        primitive.DateTime `bson:"date" json:"date"`
	Commenter   string             `bson:"commenter" json:"commenter"`
	CommenterId primitive.ObjectID `bson:"commenterId" json:"commenterId"`
}

type Model struct {
	Story Story
}
