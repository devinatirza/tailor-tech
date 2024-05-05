package controller

import (
	"main/database"
	model "main/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoginHandler(c *gin.Context){
	type UserInput struct{
		Email string
		Pass string
	}

	var input UserInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Email == ""{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please input email!"})
		return
	}

	db := database.GetInstance()

	var user model.User

	// select * from user where email = email
	if db.Where("email = ?", input.Email).Find(&user).RowsAffected == 0{
		c.JSON(http.StatusBadRequest, gin.H{"error": "You haven't registered yet!"})
		return
	}

	if input.Pass == ""{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please input password!"})
		return
	}

	if user.Password != input.Pass{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wrong password!"})
		return
	}

	c.JSON(http.StatusOK, user)

}