token = localStorage.getItem("token")

var suf_url = '?token=' + token

let find = document.querySelector('#tag')
myAjax('GET', pre_url + 'api/v1/tags' + suf_url, (res) => {
    var js = JSON.parse(res).data
    var tot = js.total
    for (var i = 0; i < tot; i++) {
        let option = document.createElement('option')
        option.innerHTML = js.lists[i].name
        option.value = js.lists[i].name
        find.appendChild(option)
    }
})


// 删除所有文章
document.querySelector('#delete_all').onclick = function () {
    myAjax('GET', 'http://127.0.0.1:8088/api/api/v1/delete_articles' + suf_url, (res) => {
        let find = document.querySelector('ul');
        find.innerHTML = ""
        tempAlert("delete success", 1000);
    })
}

// 查看文章
document.querySelector('#read').onclick = function () {
    // 这里直接使用上面封装的 myAjax() 方法即可
    myAjax('GET', 'http://127.0.0.1:8088/api/api/v1/articles' + suf_url, (res) => {
        console.log(res);
        console.log('数据返回成功');
        // 显示在页面上

        const z = JSON.parse(res)
        let find = document.querySelector('ul');
        find.innerHTML = ""
        console.log(z)
        for (var i = 0; i < z.data.total; i++) {
            let div = document.createElement('li');
            div.innerHTML = z["data"]["lists"][i].content;
            find.appendChild(div);
            // var s = '<li>' + z["data"]["lists"][i].content + '</li><br/>'
            // console.log(s)
            //document.querySelector('ul').innerHTML = s;
            //document.querySelector('ul').insertAdjacentHTML = s
        }
        //let result = document.querySelector('p').innerHTML = z["data"]["lists"][0]
        //console.log(result)
        //console.log(a["value"])
        // alert(xhr.responseText);
    });
};

// 提交文章
document.querySelector('#write').onclick = function () {
    let tag = document.querySelector('#tag').value;
    let tle = document.querySelector('#tle').value;
    let desc = document.querySelector('#desc').value;
    let content = document.querySelector('#content').value;
    let author = document.querySelector('#author').value;
    var atl = {
        "tag_id": parseInt(tag),
        "title": tle,
        "desc": desc,
        "content": content,
        "created_by": author
    };
    console.log(atl)
    myAjaxSend('POST', 'http://127.0.0.1:8088/api/api/v1/articles' + suf_url, JSON.stringify(atl), (res) => {
        console.log("success");
    })
}