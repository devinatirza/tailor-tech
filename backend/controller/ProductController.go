package controller

import (
	"main/database"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetAllProduct(c *gin.Context) {
	type GetProduct struct {
		ID      int
		Product string
		Tailor  string
		Desc    string
		Price   int
		ImgUrl  string
	}
	db := database.GetInstance()

	var products []GetProduct
	query := c.Query("query")

	sql := "SELECT products.id, products.name as product, tailors.name as tailor, `desc`, products.price, products.img_url " +
		"FROM products " +
		"LEFT JOIN tailors ON products.tailor_id = tailors.id "

	if query != "" {
		sql += "WHERE LOWER(products.name) LIKE ? "
		query = "%" + strings.ToLower(query) + "%"
	}

	sql += "GROUP BY products.id"

	if query != "" {
		db.Raw(sql, query).Scan(&products)
	} else {
		db.Raw(sql).Scan(&products)
	}

	c.JSON(http.StatusOK, products)
}
