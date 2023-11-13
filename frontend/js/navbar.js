$(document).ready(function() {
  var menuOpen = '';
  var menuClose = '';
    var btn = document.getElementById('imgSrc');
    if(screen.width <=1280){
      btn.setAttribute('src', 'frontend/assets/images/menu_FILL0_wght200_GRAD0_opsz24.png');
    }else{
      btn.setAttribute('src', 'frontend/assets/images/menu_open_FILL0_wght200_GRAD0_opsz24.png');
    }
  });
  function myFunction() {
    var btn = document.getElementById('imgSrc');
    console.log(btn.getAttribute('src'));
      if (btn.getAttribute('src') == 'frontend/assets/images/menu_FILL0_wght200_GRAD0_opsz24.png') {
        btn.setAttribute('src', 'frontend/assets/images/menu_open_FILL0_wght200_GRAD0_opsz24.png');
        document.getElementById("sidebar").style.display = "block";
        document.getElementById("sidebar").style.width = "300px";
        document.getElementById("main_content").style.marginLeft = "320px";
        document.getElementById("sidebar").setAttribute("class","px-2 py-3 mh-100 sidebar shadow-sm");
      }else{
        btn.setAttribute('src', 'frontend/assets/images/menu_FILL0_wght200_GRAD0_opsz24.png');
        document.getElementById("sidebar").style.width = "0px";
        document.getElementById("main_content").style.marginLeft = "20px";
        document.getElementById("sidebar").setAttribute("class","py-3 mh-100 sidebar shadow-sm");
      }
    }