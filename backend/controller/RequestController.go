package controller

import (
	"fmt"
	"main/database"
	model "main/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type CreateRequestInput struct {
	UserID      uint
	Name        string
	Desc        string
	Price       int
	RequestType string
	TailorID    uint
	Status      string
}

func CreateUserRequest(c *gin.Context) {
	db := database.GetInstance()
	var input CreateRequestInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println("Error binding JSON:", err)
		return
	}

	var reqID uint
	db.Raw("select id from outfits where upper(category) like ?", input.RequestType).Scan(&reqID)

	request := model.Request{
		Name:        input.Name,
		Desc:        input.Desc,
		Price:       input.Price,
		RequestType: reqID,
		TailorID:    input.TailorID,
	}

	if err := db.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	transaction := model.Transaction{
		TransactionDate: time.Now(),
		UserID:          input.UserID,
		TailorID:        input.TailorID,
		Requests:        []model.Request{request},
		Status:          input.Status,
	}

	if err := db.Create(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"ID": request.ID})
}
