package controller

import (
	"log"
	"net/http"
	"main/database"
	models "main/models"

	"github.com/gin-gonic/gin"
)

type PaymentRequest struct {
	UserID       uint  
	TotalAmount  int    
	PromoCode    string
	PaymentMethod string
}

type PaymentResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func ProcessPayment(c *gin.Context) {
	db := database.GetInstance()

	var paymentRequest PaymentRequest
	if err := c.ShouldBindJSON(&paymentRequest); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Printf("Received payment request: %+v", paymentRequest)

	var user models.User
	if db.Where("id = ?", paymentRequest.UserID).First(&user).RowsAffected == 0 {
		log.Printf("User not found: %d", paymentRequest.UserID)
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	log.Printf("User found: %+v", user)

	if user.Money < paymentRequest.TotalAmount {
		log.Printf("Insufficient balance: User balance %d, Total amount %d", user.Money, paymentRequest.TotalAmount)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Insufficient balance to complete the payment"})
		return
	}

	tx := db.Begin()

	user.Money -= paymentRequest.TotalAmount

	if err := tx.Save(&user).Error; err != nil {
		tx.Rollback()
		log.Printf("Failed to update user balance: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user balance"})
		return
	}

	var userPromo models.UserPromo
	if err := tx.Where("promo_code = ? AND user_id = ?", paymentRequest.PromoCode, paymentRequest.UserID).First(&userPromo).Error; err != nil {
		tx.Rollback()
		log.Printf("Failed to query user promo: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query user promo"})
		return
	}

	log.Printf("User promo found: %+v", userPromo)

	if userPromo.Quantity > 0 {
		userPromo.Quantity--
		if err := tx.Save(&userPromo).Error; err != nil {
			tx.Rollback()
			log.Printf("Failed to update promo code quantity: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update promo code quantity"})
			return
		}
	} else {
		tx.Rollback()
		log.Printf("Coupon quantity is already zero for promo code: %s", paymentRequest.PromoCode)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Coupon quantity is already zero"})
		return
	}

	tx.Commit()

	log.Printf("Payment processed successfully for user: %d", paymentRequest.UserID)

	c.JSON(http.StatusOK, PaymentResponse{Success: true, Message: "Payment processed successfully"})
}
