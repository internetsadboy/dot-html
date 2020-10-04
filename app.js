
window.onresize = handleResize;
window.onload = handleLoad;

// todo: create clojure + get/set state for global access
let STATE = initState();

function initState() {
  return {
    isMobile: isMobile(),
    showNav: false,
  };
}

function handleLoad(e) {
  console.log('info: window loaded');

  if (isMobile()) {
    setResponsiveUI();
  } else {
    console.log('info: desktop');
  }
}

function setResponsiveUI() {
  console.log('info: mobile');
  let body = document.getElementsByTagName('body')[0];
  let menu = document.getElementById('btn-menu');
  let nav_home = document.getElementById('nav_home');
  let nav_right = document.getElementById('nav_right');
  let nav_left = document.getElementById('nav_left');
  let nav_li = document.getElementsByClassName('nav-li');
  let a = document.getElementsByTagName('a');

  // ui: display mobile menu
  body.style.margin = '0px';
  menu.style.padding = '10px';
  menu.style.border = '1px solid black';
  nav_home.style.display = 'block';
  nav_right.style.display = 'none';
  nav_left.style.display = 'none';

  // ui: menu click handler
  menu.onclick = function(e) {
    console.log('info: menu clicked');
    let showNav = STATE.showNav;
    if (!showNav) {
      nav_right.style.display = 'block';
      nav_right.style.paddingLeft = 0;
      nav_right.style.float = 'none';
      nav_right.style.width = '85%';
      nav_right.style.margin = '15px auto';

      for (let i = 0; i < nav_li.length; i++) {

        let temp_li = nav_li[i];
        let temp_a = a[i];

        temp_li.style.float = 'none';
        temp_li.style.padding = '15px';
        temp_li.style.height = 30;
        temp_li.style.backgroundColor = 'black';
        temp_li.style.textAlign = 'center';
        temp_li.style.margin = '10px';

        temp_a.style.display = 'block';
        temp_a.style.fontSize = '16px';
      }
    } else {
      nav_right.style.display = 'none';
    }
    STATE.showNav = !showNav;
  }

  document
    .getElementById('icon-home')
    .addEventListener('click', function(e) {
      const routes = [
        /biography/,
        /photography/,
        /projects/,
        /the-blog/
      ];

      let rootPath = 'index.html';
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].test(window.location.href)) {
          rootPath = '../' + rootPath;
          break;
        }
      }

      window.location = rootPath;
    });
}

function isMobile() {
  const isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  return isMobile.any() || window.innerWidth <= 634; // width which breaks main nav
}

function handleResize() {
  console.log('info: window resize');

  if (isMobile()) setResponsiveUI();
}
