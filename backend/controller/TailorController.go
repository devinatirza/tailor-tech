package controller

import (
	"main/database"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetAllTailor(c *gin.Context) {
	type GetTailor struct {
		ID      int
		Name    string
		Email   string
		Address string
		ImgUrl  string
		Rating  float32
	}
	db := database.GetInstance()

	var tailors []GetTailor
	query := c.Query("query")

	sql := "SELECT id, name, email, address, img_url, round(avg(rating), 1) as rating " +
		"FROM tailors " +
		"LEFT JOIN tailor_ratings ON tailor_ratings.tailor_id = tailors.id "

	if query != "" {
		sql += "WHERE LOWER(name) LIKE ? "
		query = "%" + strings.ToLower(query) + "%"
	}

	sql += "GROUP BY tailors.id"

	if query != "" {
		db.Raw(sql, query).Scan(&tailors)
	} else {
		db.Raw(sql).Scan(&tailors)
	}

	c.JSON(http.StatusOK, tailors)
}
