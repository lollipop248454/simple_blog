
window.onload = function () {
    document.querySelector('#login').onclick = function () {
        var account = document.querySelector('#account').value
        var password = document.querySelector('#password').value
        var user = {
            "account": account,
            "password": password
        }
        if(account.length==0||password.length==0) {
            tempAlert("账号或密码为空",1000);
            return
        }
        myAjaxSend('POST', pre_url + 'api/v1/login', JSON.stringify(user), (res) => {
            var js = JSON.parse(res)
            if (js.code != 200) {
                tempAlert("账号或密码错误", 1000)
                return
            }
            token = js.data.token
            localStorage.setItem("token", token)
            console.log(token)
            location.href = 'test.html'
        })
    }
}
