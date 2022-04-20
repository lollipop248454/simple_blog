package models

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func CheckLogin(maps interface{}) bool {
	count := 0
	db.Table("blog_auth").Where(maps).Count(&count)
	return count > 0
}

func Register(maps map[string]string) bool {
	count := 0
	db.Table("blog_auth").Where("username = ?", maps["username"]).Count(&count)
	if count > 0 {
		return false
	}
	db.Table("blog_auth").Create(&User{
		Username: maps["username"],
		Password: maps["password"],
	})
	return true
}
