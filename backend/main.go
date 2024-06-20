package main

import (
	"fmt"
	"log"
	"main/controller"
	"net"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func getLocalIP() (string, error) {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "", err
	}

	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String(), nil
			}
		}
	}
	return "", fmt.Errorf("cannot find local IP address")
}

func main() {
	ip, err := getLocalIP()
	if err != nil {
		log.Fatalf("Error fetching local IP address: %v", err)
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8081"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	r.GET("/get-server-ip", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ip": ip})
	})

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
		carts.GET("/get-cart/:id", controller.GetCart)
		carts.DELETE("/remove", controller.RemoveFromCart)
	}

	wishlists := r.Group("/wishlists")
	{
		wishlists.POST("/add-to-wishlist", controller.AddToWishlist)
		wishlists.GET("/:userID", controller.GetWishlist)
		wishlists.DELETE("/remove", controller.RemoveFromWishlist)
	}

	requests := r.Group("/requests")
	{
		requests.POST("/create", controller.CreateUserRequest)
	}

	r.POST("/payment", controller.ProcessPayment)

	orders := r.Group(("/orders"))
	{
		orders.POST("/create", controller.CreateProductOrder)
	}

	r.Run(":8000")
}
