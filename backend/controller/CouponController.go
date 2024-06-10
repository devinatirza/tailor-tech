package controller

import (
	"log"
	"main/database"
	models "main/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RedeemCoupon(c *gin.Context) {
	db := database.GetInstance()

	type RedeemCouponInput struct {
		UserID    uint   `json:"userId" binding:"required"`
		NewPoints int    `json:"newPoints" binding:"required"`
		PromoCode string `json:"promoCode" binding:"required"`
	}

	var input RedeemCouponInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if db.Where("id = ?", input.UserID).First(&user).RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	user.Points = input.NewPoints

	tx := db.Begin()

	if err := tx.Save(&user).Error; err != nil {
		tx.Rollback()
		log.Printf("Failed to update user points: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update points"})
		return
	}

	var promo models.Promo
	if tx.Where("promo_code = ?", input.PromoCode).First(&promo).RowsAffected == 0 {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"error": "Promo code not found"})
		return
	}

	var userPromo models.UserPromo
	if err := tx.Where("promo_code = ? AND user_id = ?", input.PromoCode, input.UserID).First(&userPromo).Error; err != nil {
		if err.Error() == "record not found" {
			// Create new entry if not found
			userPromo = models.UserPromo{
				PromoCode: input.PromoCode,
				UserID:    input.UserID,
				Quantity:  1,
			}
			if err := tx.Create(&userPromo).Error; err != nil {
				tx.Rollback()
				log.Printf("Failed to add promo code to user: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to redeem promo code"})
				return
			}
		} else {
			tx.Rollback()
			log.Printf("Failed to query user promo: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to redeem promo code"})
			return
		}
	} else {
		// Update quantity if found
		userPromo.Quantity++
		if err := tx.Save(&userPromo).Error; err != nil {
			tx.Rollback()
			log.Printf("Failed to update promo code quantity: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update promo code quantity"})
			return
		}
	}

	tx.Commit()

	c.JSON(http.StatusOK, gin.H{"message": "Promo code redeemed successfully!", "user": user})
}

func GetUserCoupons(c *gin.Context) {
	db := database.GetInstance()

	userID := c.Query("userId")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	var userCoupons []models.UserPromo
	if err := db.Where("user_id = ?", userID).Find(&userCoupons).Error; err != nil {
		log.Printf("Failed to fetch user coupons: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user coupons"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"coupons": userCoupons})
}
