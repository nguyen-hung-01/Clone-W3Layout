// Slider
let listSlide = document.querySelector(".list-slide");
let slides = document.querySelectorAll(".slide-item");
let index = 0;

setInterval(
  (nextSlide = () => {
    if (index == slides.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    showSlider(index);
  }),
  4000
);

prevSlide = () => {
  if (index < 0) {
    index = slides.length - 1;
  } else {
    index -= 1;
  }
  showSlider(index);
};

function showSlider(index) {
  let widthImg = slides[index].offsetWidth * index;
  listSlide.style.left = -widthImg + "px";
}

// Change theme
const changeTheme = document.getElementById("theme__icon");
const themeLight = document.getElementById("theme-dark");
changeTheme.onclick = function () {
  changeTheme.classList.toggle("icon__light");
  themeLight.classList.toggle("theme-light");
};

// Scroll event
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $("header").addClass("sticky");
      $(".backtotop").fadeIn();
      $(".coutdown").fadeIn();
    } else {
      $("header").removeClass("sticky");
      $(".backtotop").fadeOut();
      $(".coutdown").fadeOut();
    }
  });
  $(".backtotop").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );
  });
});

// Update Email
var email = document.getElementById("updateemail");
document.getElementById("update").onclick = () => {
  checkEmail(email);
};

// Check email
checkEmail = (emai) => {
  var filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!filter.test(email.value)) {
    alert("Email không hợp lệ.\nExample@gmail.com");
  } else {
    alert("Cập nhật thành công.");
    email.value = "";
  }
};

// Open form
const formLogin = document.getElementById("form");
function showFormLogin() {
  formLogin.style.visibility = "visible";
}

// Close form
function hiddenFormLogin() {
  formLogin.style.visibility = "hidden";
}

// Check form
function login(event) {
  event.preventDefault();
  let userName = document.getElementById("name").value;
  let numberPhone = document.getElementById("numberPhone").value;
  let email = document.getElementById("email").value;
  var filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let regex = /^\d{10,11}$/;

  let errorUserName = "";
  let errorPhone = "";
  let errorEmail = "";
  let errorValidation = 0;

  if (userName.length == 0) {
    errorUserName = "Tên đăng nhập không được bỏ trống !";
    errorValidation++;
  }

  if (numberPhone.length == 0) {
    errorPhone = "Số điện thoại không được bỏ trống !";
    errorValidation++;
  } else {
    if (!regex.test(numberPhone)) {
      errorPhone = "Số điện thoại không hợp lệ !";
      errorValidation++;
    }
  }

  if (email.length == 0) {
    errorEmail = "Email không được bỏ trống !";
    errorValidation++;
  } else {
    if (!filter.test(email)) {
      errorEmail = "Email không hợp lệ !";
      errorValidation++;
    }
  }

  if (errorValidation == 0) {
    alert("Đăng kí thành công.");
    clear();
  } else {
    document.getElementById("errorUserName").innerHTML = errorUserName;
    document.getElementById("errorPhone").innerHTML = errorPhone;
    document.getElementById("errorEmail").innerHTML = errorEmail;
  }
}

clear = () => {
  document.getElementById("name").value = "";
  document.getElementById("numberPhone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("errorUserName").innerHTML = "";
  document.getElementById("errorPhone").innerHTML = "";
  document.getElementById("errorEmail").innerHTML = "";
  document.querySelectorAll('.inp input').forEach(function(input) {
    input.nextElementSibling.style.opacity = '0.5'; 
  });
};

// Onmouse product
let listItems = document.querySelectorAll(".product__item");

listItems.forEach((item) => {
  let img = item.querySelector("img");

  item.addEventListener("mouseover", () => {
    img.style.transform = "scale(1.3)";
  });

  item.addEventListener("mouseout", () => {
    img.style.transform = "scale(1)";
  });
});

// Onmouse event
showContent = ()=> {
  document.querySelector(".coutdown-content").style.display = "block";
}
hiddenContent = ()=> {
  document.querySelector(".coutdown-content").style.display = "none";
}

// Lable form
document.querySelectorAll('.inp input').forEach(function(input) {
  input.addEventListener('input', function() {
    if (this.value.trim() !== '') {
      this.nextElementSibling.style.opacity = '0';
    } else {
      this.nextElementSibling.style.opacity = '0.5';
    }
  });
});

// Video modal
let video = document.getElementById("video");
let changeIcon = document.getElementById("icon");
let initialVolume = video.volume;
let volumeRange = document.getElementById("volumeRange");
let videoDuration = document.getElementById("seekBar");

forWard = () => {
  video.currentTime -= 5;
};

backWard = () => {
  video.currentTime += 5;
};

PlayPause = () => {
  if (video.paused) {
    video.play();
    changeIcon.classList.remove("fa-play");
    changeIcon.classList.add("fa-pause");
  } else {
    video.pause();
    changeIcon.classList.remove("fa-pause");
    changeIcon.classList.add("fa-play");
  }
};

video.addEventListener("ended", function() {
  changeIcon.classList.remove("fa-pause");
    changeIcon.classList.add("fa-play");
});

reduceVolume = () => {
  if (video.volume >= 0) {
    video.volume -= 0.1;
  }
  volumeRange.value = video.volume;
};
increaseVolume = () => {
  if (video.volume <= 1) {
    video.volume += 0.1;
  }
  volumeRange.value = video.volume;
};

volumeRange.addEventListener("input", () => {
  let volumeValue = volumeRange.value;
  video.volume = volumeValue;
  document.getElementById("volumeValue").innerText =
    Math.round(volumeValue * 100) + "%";
});

reload = () => {
  video.load();
  video.play();
  changeIcon.classList.remove("fa-play");
  changeIcon.classList.add("fa-pause");
};

video.addEventListener("timeupdate", () => {
  let currentTime = video.currentTime;
  let duration = video.duration;
  seekBar.value = (currentTime / duration) * 100;
});

seekBar.addEventListener("input", () => {
  let seekTime = video.duration * (seekBar.value / 100);
  video.currentTime = seekTime;
});

let isMinVolume = false;
soundOff = () => {
  if (!isMinVolume) {
    initialVolume = video.volume;
    video.volume = 0;
    volumeRange.value = 0;

    isMinVolume = true;
  } else {
    video.volume = initialVolume;
    volumeRange.value = initialVolume;
    isMinVolume = false;
  }
};

document.getElementById("open-video").addEventListener("click", ()=> {
  document.querySelector(".vd-modal").style.visibility = "visible";
  video.autoplay = true;
  video.load();
})

document.getElementById("close-video").addEventListener("click", () => {
  document.querySelector(".vd-modal").style.visibility = "hidden";
  video.pause();
})

//  Geolocation
$(document).ready(function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
    
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude)
    
          const newMapUrl = `https://www.google.com/maps/place/@${latitude},${longitude},19.27z/data=!4m6!3m5!1s0x31421916873a3edd:0x8b138f3fe01043a!8m2!3d16.0519996!4d108.1696778!16s%2Fg%2F11rwwgmkgq?entry=ttu`;
    
          document.getElementById("myLocation").href = newMapUrl;
          document.querySelector(".coordinates").innerHTML = 
          `Latitude: ${latitude}<br/>
          Longitude: ${longitude}`;
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    };
    
  });

// Countdown
const endTime = new Date("2030-01-01T23:59:59").getTime();

const countdownTimer = setInterval(function() {
  const now = new Date().getTime();
  const distance = endTime - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown-time").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(countdownTimer);
    document.getElementById("countdown-time").innerHTML = "Happy FPT 2030";
  }
}, 1000);

// Event scroll
const showContentOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in');

  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top >= 0 && rect.top <= windowHeight) {
      element.classList.add('show');
    }
  });
};
window.addEventListener('scroll', showContentOnScroll);