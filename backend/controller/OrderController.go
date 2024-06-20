package controller

import (
	"fmt"
	"main/database"
	model "main/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type CreateProductOrderInput struct {
	UserID     uint   
	Name       string 
	ProductIDs []uint 
	Status     string 
	TotalPrice uint  
}

func CreateProductOrder(c *gin.Context) {
	db := database.GetInstance()
	var input CreateProductOrderInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println("Error binding JSON:", err)
		return
	}

	var products []model.Product
	if err := db.Where("id IN ?", input.ProductIDs).Find(&products).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Products not found"})
		return
	}

	transactions := make(map[uint]*model.Transaction)
	for _, product := range products {
		if transaction, ok := transactions[product.TailorID]; ok {
			transaction.Products = append(transaction.Products, product)
		} else {
			transactions[product.TailorID] = &model.Transaction{
				TransactionDate: time.Now(),
				UserID:          input.UserID,
				TailorID:        product.TailorID,
				Products:        []model.Product{product},
				Status:          input.Status,
				TotalPrice:      input.TotalPrice,
			}
		}
	}

	for _, transaction := range transactions {
		if err := db.Create(transaction).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Orders created successfully"})
}
