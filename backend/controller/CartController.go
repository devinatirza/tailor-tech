package controller

import (
    "main/database"
    // "main/models"
    "net/http"

    "github.com/gin-gonic/gin"
)

func AddToCart(c *gin.Context){
    db := database.GetInstance()

    type Cart struct{
        UserID int
        ProductID int
    }

    var input Cart

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db.Create(&input)
}
