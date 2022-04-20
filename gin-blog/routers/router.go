package routers

import (
	"gin-blog/middleware/jwt"
	"github.com/gin-gonic/gin"

	"gin-blog/pkg/setting"
	"gin-blog/routers/api"
	"gin-blog/routers/api/v1"
)

func InitRouter() *gin.Engine {
	r := gin.New()

	r.Use(gin.Logger())

	r.Use(gin.Recovery())

	gin.SetMode(setting.RunMode)

	apiv1 := r.Group("/api/v1")

	apiv1.POST("/login", api.GetAuth)

	//注册用户
	apiv1.POST("/register", v1.Register)

	apiv1.Use(jwt.JWT())
	{
		//获取文章列表
		apiv1.GET("/articles", v1.GetArticles)
		//获取指定文章
		apiv1.GET("/articles/:id", v1.GetArticle)
		//新建文章
		apiv1.POST("/articles", v1.AddArticle)
		//更新指定文章
		apiv1.PUT("/articles/:id", v1.EditArticle)
		//删除指定文章
		apiv1.DELETE("/articles/:id", v1.DeleteArticle)
		//清空文章
		apiv1.GET("/delete_articles", v1.DeleteArticles)
		//获取标签列表
		apiv1.GET("/tags", v1.GetTags)
	}

	return r
}
