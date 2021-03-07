window.onload = function () {
  let swiper1 = new Swiper('#swiper1', {
    autoplay: true,  //自动播放
    loop: true,
    navigation: {
      nextEl: '#swiper1-button-next',
      prevEl: '#swiper1-button-prev',
    },
  })

  let swiper2 = new Swiper('#swiper2', {
    loop: true,
    //前进后退按钮
    navigation: {
      nextEl: '#swiper2-button-next',
      prevEl: '#swiper2-button-prev',
    },
  })


  //弹出层
  let oAddress = document.getElementsByClassName('address')[0];
  let oProvinces = document.getElementById('provinces'); //省
  let oCitys = document.getElementById('citys'); //城市
  let oChooses = document.getElementById('chooses'); //选择类型
  let oVerlay = document.getElementsByClassName('overlay')[0];
  let oClose = document.getElementById('address-close');

  oProvinces.onclick = function () {
    oVerlay.style.display = 'block';
    oAddress.style.display = 'block'
  };
  oCitys.onclick = function () {
    oVerlay.style.display = 'block';
    oAddress.style.display = 'block'
  };
  oChooses.onclick = function () {
    oVerlay.style.display = 'block';
    oAddress.style.display = 'block'
  };
  oClose.onclick = function () {
    oVerlay.style.display = 'none';
    oAddress.style.display = 'none'
  }

  //video
  let oVideo = document.getElementsByClassName('video')[0];
  let oYaodaVideo = document.getElementById('yaoda-video');
  let oVideoClose = document.getElementById('video-close');

  oVideo.onclick = function () {
    oVideo.style.display = 'none';
    oYaodaVideo.style.display = 'inline-block';
  }
  oVideoClose.onclick = function () {
    oVideo.style.display = 'block';
    oYaodaVideo.style.display = 'none';

    // 关闭的时候，视频也自动暂停
    if (oYaodaVideo.paused) {
      oYaodaVideo.pause();
    } else {
      oYaodaVideo.pause();
    }
  }

  //导航栏
  $('.nav-content li').mouseover(function () {
    $(this).addClass('nav-active').siblings().removeClass('nav-active');
  })
  $('.introduce-bottom a').mouseover(function () {
    $(this).addClass('introduce-bottom-active').siblings().removeClass('introduce-bottom-active');
  })

  // 返回顶部
  $(window).scroll(function () {
    // console.log($(window).scrollTop());
    if ($(this).scrollTop() > 1218) {
      $('.actGotop').fadeIn(800);/* 淡入淡出效果来显示，从隐藏到可见 */
    } else {
      $('.actGotop').fadeOut(800);  /* 淡入淡出效果来隐藏 */
    }

    //实现点击滚动回到顶部
    $('.actGotop').click(function () {
      $('html, body').stop().animate({
        scrollTop: 0
      }, 1000)
    });

  })


  // 移动端导航栏
  $('.icon-list').click(function () {
    if ($('#nav-mt-active').css('display') == 'none') {
      $('#nav-mt-active').slideDown(800); /* 列表滑下出现 */
    } else {
      $('#nav-mt-active').slideUp(800);
    }
  })


};

//jq初始化 $(function(){})

// $(function () {  
//     $('.nav-content li').mouseover(function() {
//         $(this).addClass('nav-active').siblings().removeClass('nav-active');
//     })
// })



//rem 布局
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (clientWidth < 768) {
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  recalc()
})(document, window)





