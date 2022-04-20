package v1

import (
	"gin-blog/models"
	"gin-blog/pkg/e"
	"github.com/gin-gonic/gin"
	"net/http"
)

type User struct {
	Account  string `json:"account"`
	Password string `json:"password"`
}

func Register(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	maps := make(map[string]string)
	maps["username"] = user.Account
	maps["password"] = user.Password
	code := e.SUCCESS
	if exist := models.Register(maps); !exist {
		code = e.ERROR_AUTH
	}
	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": make(map[string]interface{}),
	})
}

func CheckLogin(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	maps := make(map[string]interface{})
	maps["username"] = user.Account
	maps["password"] = user.Password
	code := e.SUCCESS
	if exist := models.CheckLogin(maps); !exist {
		code = e.ERROR_AUTH
	}
	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": make(map[string]interface{}),
	})
}
