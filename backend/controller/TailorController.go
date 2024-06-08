package controller

import (
	"main/database"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetAllTailor(c *gin.Context) {
	type Speciality struct {
		Category string
		Price    int
	}

	type GetTailor struct {
		ID      int
		Name    string
		Email   string
		Address string
		ImgUrl  string
		Rating  float32
	}

	type GetTailorFinal struct {
		ID         int
		Name       string
		Email      string
		Address    string
		ImgUrl     string
		Rating     float32
		Speciality []Speciality
	}

	db := database.GetInstance()

	var tailors []GetTailor
	var tailorFinal []GetTailorFinal
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

	for _, tailor := range tailors {
		var specialities []Speciality
		sql = "SELECT o.category, tp.price " +
			"FROM tailor_prices tp " +
			"JOIN outfits o ON o.id = tp.outfit_id " +
			"WHERE tp.tailor_id = ?"
		db.Raw(sql, tailor.ID).Scan(&specialities)
	
		tailorFinal = append(tailorFinal, GetTailorFinal{
			ID:         tailor.ID,
			Name:       tailor.Name,
			Address:    tailor.Address,
			Email:      tailor.Email,
			ImgUrl:     tailor.ImgUrl,
			Rating:     tailor.Rating,
			Speciality: specialities,
		}) 
	}

	c.JSON(http.StatusOK, tailorFinal)
}

func GetTailorDetails(c *gin.Context) {
	type Speciality struct {
		Category string
		Price    int
	}

	type GetTailor struct {
		ID      int
		Name    string
		Email   string
		Address string
		ImgUrl  string
		Rating  float32
	}

	type GetTailorFinal struct {
		ID         int
		Name       string
		Email      string
		Address    string
		ImgUrl     string
		Rating     float32
		Speciality []Speciality
	}

	db := database.GetInstance()

	tailorIdStr := c.Query("tailorId")
	if tailorIdStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "tailorId is required"})
		return
	}

	tailorId, err := strconv.Atoi(tailorIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid tailorId"})
		return
	}

	var tailor GetTailor
	sql := "SELECT id, name, email, address, img_url, round(avg(rating), 1) as rating " +
		"FROM tailors " +
		"LEFT JOIN tailor_ratings ON tailor_ratings.tailor_id = tailors.id " +
		"WHERE tailors.id = ? " +
		"GROUP BY tailors.id"

	db.Raw(sql, tailorId).Scan(&tailor)

	var specialities []Speciality
	sql = "SELECT o.category, tp.price " +
		"FROM tailor_prices tp " +
		"JOIN outfits o ON o.id = tp.outfit_id " +
		"WHERE tp.tailor_id = ?"
	db.Raw(sql, tailorId).Scan(&specialities)

	tailorFinal := GetTailorFinal{
		ID:         tailor.ID,
		Name:       tailor.Name,
		Address:    tailor.Address,
		Email:      tailor.Email,
		ImgUrl:     tailor.ImgUrl,
		Rating:     tailor.Rating,
		Speciality: specialities,
	}

	c.JSON(http.StatusOK, tailorFinal)
}
