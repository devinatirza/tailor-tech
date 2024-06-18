package main

import (
	// model "main/models"
	"main/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// model.Migrate()
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8081"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	r.POST("/register", controller.Register)

	login := r.Group("/login")
	{
		login.POST("/user", controller.LoginHandler)
		login.POST("/tailor", controller.TailorLoginHandler)
	}
	r.POST("/update-profile", controller.UpdateProfile)
	r.GET("/validate", controller.GetUserFromJWT)
	r.GET("/logout", controller.LogoutHandler)

	product := r.Group("/products")
	{
		product.GET("/get-all", controller.GetAllProduct)
		product.GET("/get-tailor-active", controller.GetTailorProducts)
		product.GET("/get-tailor-inactive", controller.GetInactiveTailorProducts)
		product.DELETE("/delete/:id", controller.RemoveProduct)
		product.PUT("/activate/:id", controller.ActivateProduct)
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

	measurements := r.Group("/measurements")
	{
		measurements.POST("/tops", controller.CreateTopMeasurement)
		measurements.POST("/bottoms", controller.CreateBottomMeasurement)
		measurements.POST("/dresses", controller.CreateDressMeasurement)
		measurements.POST("/suits", controller.CreateSuitMeasurement)
		measurements.POST("/totebags", controller.CreateToteBagMeasurement)
	}

	carts := r.Group("/carts")
	{
		carts.POST("/add-to-cart", controller.AddToCart)
	}

	wishlists := r.Group("/wishlists")
	{
		wishlists.POST("/add-to-wishlist", controller.AddToWishlist)
		wishlists.GET("/:userID", controller.GetWishlist)
		wishlists.DELETE("/remove", controller.RemoveFromWishlist)
	}
	requests := r.Group("/requests")
	{
		requests.POST("/add-request", controller.CreateUserRequest)
	}

	r.Run(":8000")
}
