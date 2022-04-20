var goto,acc,pwd
window.onload = function () {
    document.querySelector('#register').onclick = function () {
        goto = acc&pwd;
        var account = document.querySelector('#account').value
        var password = document.querySelector('#password').value
        var user = {
            "account": account,
            "password": password
        }
        if (goto==0||account.length==0||password.length==0) {
            alert('格式错误')
            return
        }
        myAjaxSend('POST', pre_url + 'api/v1/register', JSON.stringify(user), (res) => {
            var js = JSON.parse(res)
            if (js.code != 200) {
                tempAlert("账号已存在", 1000)
                return
            }
            alert("注册成功")
            location.href = 'login.html'
        })
    }
}

function acc_change() {
    acc  = 1
    var val = document.querySelector('#account').value.length
    if (val>=4) {
        document.querySelector('.verityWrong').style = "display:none;"
        document.querySelector('.verityRight').style = ''
    } else{
        document.querySelector('.verityWrong').style = ''
        document.querySelector('.verityRight').style = "display:none;"
        acc = 0
    }
}

function pwd_change() {
    pwd = 1
    var val = document.querySelector('#password').value.length
    if (val>=6) {
        document.querySelector('.verityWrong1').style = "display:none;"
        document.querySelector('.verityRight1').style = ''
    } else{
        document.querySelector('.verityWrong1').style = ''
        document.querySelector('.verityRight1').style = "display:none;"
        pwd = 0;
    }
}