package main

import (
	"main/controller"
	// model "main/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// model.Migrate()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8081"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	r.POST("/register", controller.Register)
	r.POST("/login", controller.LoginHandler)
	r.POST("/update-profile", controller.UpdateProfile)
	r.GET("/validate", controller.GetUserFromJWT)
	r.GET("/logout", controller.LogoutHandler)

	product := r.Group("/products")
	{
		product.GET("/get-all", controller.GetAllProduct)
	}

	tailor := r.Group("/tailors")
	{
		tailor.GET("/get-all", controller.GetAllTailor)
	}

	coupon := r.Group("/coupons")
	{
		coupon.POST("/redeem", controller.RedeemCoupon) 
		coupon.GET("/code", controller.GetUserCoupons)
	}

	r.Run(":8000")
}
