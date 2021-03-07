let bd = {
    mock1: {
        "id": "01",
        "headline": "佛山地铁工程活动房",
        "text": "根据客户需求和环境条件量身订制的集装箱产品，同时适用于商业类和住宿类需求。",
        "img": "./imges/mock/1.jpg"
    },
    mock2: {
        "id": "02",
        "headline": "我是标题000002",
        "text": "根据用户的个人需求，设计定制！",
        "img": "./imges/mock/2.jpg"
    },
    mock3: {
        "id": "03",
        "headline": "我是标题00003",
        "text": "简略......",
        "img": "./imges/mock/3.jpg"            
    }
};



let oHeadline = document.getElementById('dynamic-display-left-bottom-headline');
let oText = document.getElementsByClassName('dynamic-display-left-bottom-text')[0];
let oId = document.getElementById('dynamicId');
let oImg = document.getElementById('dynamic-display-img');

let oPrev = document.getElementById('prev');
let oNext = document.getElementById('next');



let count=1;
oNext.onclick = function() {

    if( count < 3) {
        count++;
    } else {
        count = 1
    }
    oId.innerHTML = "0" + count;


    if(oId.innerHTML == '01') {
        oHeadline.innerHTML = bd.mock1.headline;
        oText.innerHTML = bd.mock1.text;
        oImg.src = bd.mock1.img
    }
    if(oId.innerHTML == '02') {
        oHeadline.innerHTML = bd.mock2.headline;
        oText.innerHTML = bd.mock2.text;
        oImg.src = bd.mock2.img
    }
    if(oId.innerHTML == '03') {
        oHeadline.innerHTML = bd.mock3.headline;
        oText.innerHTML = bd.mock3.text;
        oImg.src = bd.mock3.img
    }
}


oPrev.onclick = function() {

    if( count == 1) {
        count = 3;
    } else {
        count--;
    }
    oId.innerHTML = "0" + count;

    if(oId.innerHTML == '01') {
        oHeadline.innerHTML = bd.mock1.headline;
        oText.innerHTML = bd.mock1.text;
        oImg.src = bd.mock1.img
    }
    if(oId.innerHTML == '02') {
        oHeadline.innerHTML = bd.mock2.headline;
        oText.innerHTML = bd.mock2.text;
        oImg.src = bd.mock2.img
    }
    if(oId.innerHTML == '03') {
        oHeadline.innerHTML = bd.mock3.headline;
        oText.innerHTML = bd.mock3.text;
        oImg.src = bd.mock3.img
    }
}

