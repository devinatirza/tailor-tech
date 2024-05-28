package controller

import (
	"fmt"
	"main/database"
	models "main/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func LoginHandler(c *gin.Context){
	type UserInput struct{
		Email string 
		Pass  string 
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

	var user models.User

	if db.Where("email = ?", input.Email).Find(&user).RowsAffected == 0{
		c.JSON(http.StatusBadRequest, gin.H{"error": "You haven't registered yet!"})
		return
	}

	if input.Pass == ""{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please input password!"})
		return
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Pass)) != nil{
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

func GetUserFromJWT(c *gin.Context){
	db := database.GetInstance()
	tokenString, err := c.Cookie(`auth`)

	if err != nil {
	c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
	return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
	}

	return "qwertyuiop", nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
	if float64(time.Now().Unix()) > claims["exp"].(float64) {
	c.AbortWithStatus(http.StatusUnauthorized)
	}

	var user models.User

	db.First(&user, claims["sub"])

	fmt.Println(user.ID)

	if user.ID == 0 {
	c.AbortWithStatus(http.StatusUnauthorized)
	}

	c.JSON(http.StatusOK, user)
	} else {
	fmt.Println(err)
	}
}

func LogoutHandler(c *gin.Context) {
    c.SetCookie("auth", "", -1, "/", "localhost", false, false)
    c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}
