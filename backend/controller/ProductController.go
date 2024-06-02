package controller

import (
	"main/database"
	model "main/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllProduct(c *gin.Context){
	db := database.GetInstance()
	
	var products []model.Product

	db.Find(&products)

	c.JSON(http.StatusOK, products)
}