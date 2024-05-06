package controller

import (
	"main/database"
	model "main/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
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

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 15).Unix(),
	})

	tokenString, err := token.SignedString([]byte("qwertyuiop"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("auth", tokenString, 3600*24*15, "/", "localhost", false, false)


	c.JSON(http.StatusOK, user)

}