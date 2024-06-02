package controller

import (
	"main/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllTailor(c *gin.Context){

	type GetTailor struct{
		ID int
		Name  string
		Email string
		Address string
		ImgUrl string
		Rating float32
	}
	db := database.GetInstance()
	
	var tailors []GetTailor

	db.Raw(
		"SELECT id, name, email, address, img_url, round(avg(rating), 1) as rating " +
		"FROM tailors " +
		"JOIN tailor_ratings ON tailor_ratings.tailor_id = tailors.id " + 
		"GROUP BY tailors.id").Scan(&tailors)
	

	c.JSON(http.StatusOK, tailors)
}