
var keyboard
var sites

// 初始化
function init(){
    keyboard = {
        "1":["q","w","e","r","t","y","u","i","o","p"],
        "2":["a","s","d","f","g","h","j","k","l"],
        "3":["z","x","c","v","b","n","m"],
        "lens": 3
    }
    sites = {
        "q":"https://qq.com",
        "p":"https://prometheus.io",
        "s":"https://sina.com",
        "g":"https://google.com",
        "a":"https://alibaba.com",
        "t":"https://taobao.com",
        "j":"https://jd.com",
        "x":"https://xiaomi.com",
    }
    // 将sites存到本地，在第二次打开的时候，若本地存在则读取本地的
    localSites = JSON.parse(localStorage.getItem("sites") || null)
    if ( localSites ){
        sites = localSites
    }else {
        localStorage.setItem("sites", JSON.stringify(sites))
    }
}

// 创建标签 
function createEle(el, attribute){
    e = document.createElement(el)
    for ( k in attribute){
        e[k] = attribute[k]
    }
    return e
}

// 创建键盘
function createKeyboard(){
    wrapper = createEle("div", {"className":"wrapper"})
    for (let i =1; i <= keyboard.lens; i++){
        raw = createEle("div", {"className":"raw"+i})
        for (let j=0; j < keyboard[i].length; j++) {
            // 显示favicon
            img = createEle("img", 
              {
                  "src": sites[keyboard[i][j]] + "/favicon.ico", 
                  "className": "favicon",
                  "onerror": function(ev){
                    ev.target.src = "./imgs/f.png"
                    ev.target.className = "efavicon"
                }
             })
            
            // 字母
            word = createEle("span",
                {
                    "textContent": keyboard[i][j],
                    "className": "key",
                }
            )

            // 编辑按钮
            btn = createEle("button",
                {
                    "textContent": "编辑",
                    "className":"edit",
                    "id":keyboard[i][j],
                    "onclick": function (ev){
                        w = prompt("请给我一个网站，绑定到" + keyboard[i][j] + "键上:")
                        if (w.indexOf("http") == -1 ){
                            w = "https://" + w
                        }
                        sites[ev.target.id] = w
                        localStorage.setItem("sites", JSON.stringify(sites))
                        ev.target.nextSibling.src = w + "/favicon.ico"
                        ev.target.nextSibling.className = "favicon"
                    }
                }
            )

            kbd = createEle("kbd")
            kbd.appendChild(word)
            kbd.appendChild(btn)
            kbd.appendChild(img)
            raw.appendChild(kbd)
        }
        wrapper.appendChild(raw)
    }
    myKeyboard.appendChild(wrapper)


}

// 捕获键盘
function PressKeyboard(){
    document.onkeypress = function (ev) {
        if ( ! sites[ev.key]) {
            alert("没有绑定哦～")
            return
        }
        window.open(sites[ev.key])
    }
}


(function main(){
    init() // 初始化数据
    createKeyboard() // 创建键盘
    PressKeyboard() // 捕获键盘
}());




