window.addEventListener("load", () => {
  document.querySelector(".main").classList.remove("hidden");
  document.querySelector(".home-section").classList.add("active");

  //Page loader

  document.querySelector(".page-loader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".page-loader").style.display = "none";
  }, 600);
});

//------ Toggle navbar ------//
const navToggler = document.querySelector(".nav-toggler");

navToggler.addEventListener("click", () => {
  hideSection();
  toggleNavbar();

  document.body.classList.toggle("hide-scrolling");
});

function hideSection() {
  document.querySelector("section.active").classList.toggle("fade-out");
}

function toggleNavbar() {
  document.querySelector(".header").classList.toggle("active");
}

//---------- Active Section ---------//
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-item") && event.target.hash !== "") {
    //activate the overlay to prevent multiplie clicks

    document.querySelector(".overlay").classList.add("active");
    navToggler.classList.add("hide");
    if (event.target.classList.contains("nav-item")) {
      toggleNavbar();
    } else {
      hideSection();
      document.body.classList.add("hide-scrolling");
    }
    setTimeout(() => {
      document.querySelector("section.active").classList.remove("active", "fade-out");
      document.querySelector(event.target.hash).classList.add("active");
      window.scrollTo(0, 0);
      document.body.classList.remove("hide-scrolling");
      navToggler.classList.remove("hide");
      document.querySelector(".overlay").classList.remove("active");
    }, 500);
  }
});
//------------ About Tabs -----------//

const tabsContainer = document.querySelector(".about-tabs");
const aboutSection = document.querySelector(".about-section");

tabsContainer.addEventListener("click", OnTabClick);

function OnTabClick(event) {
  if (event.target.classList.contains("tab-item") && !event.target.classList.contains("acitve")) {
    tabsContainer.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");

    const target = event.target.getAttribute("data-target");
    aboutSection.querySelector(".tab-content.active").classList.remove("active");
    aboutSection.querySelector(target).classList.add("active");
  }
}

/*-------------- Portfolio Item Details Popup ---------------*/

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-project-btn")) {
    togglePortfolioPopup();
    document.querySelector(".portfolio-popup").scrollTo(0, 0);
    portfolioItemDetails(e.target.parentElement);
  }
});

function togglePortfolioPopup() {
  document.querySelector(".portfolio-popup").classList.toggle("open");
  document.body.classList.toggle("hide-scrolling");

  document.querySelector(".main").classList.toggle("fade-out");
}

document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

// Прячем Pop-up при клике вне и по нажатию на ESC

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("pp-inner")) {
    togglePortfolioPopup();
  }

  document.addEventListener("keydown", onEscape);

  function onEscape(event) {
    if (event.keyCode === 27) {
      document.querySelector(".portfolio-popup").classList.remove("open");
      document.querySelector(".main").classList.remove("fade-out");
      document.body.classList.remove("hide-scrolling");
      document.removeEventListener("keydown", onEscape);
      return;
    }
  }
});

// Прячем Pop-up при клике вне и по нажатию на ESC

function portfolioItemDetails(portfolioItem) {
  document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

  document.querySelector(".pp-header h3").innerHTML = portfolioItem.querySelector(".portfolio-item-title").innerHTML;

  document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}
//

const form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("my-form-status");
  const data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        setTimeout(() => {
          status.innerHTML = "";
        }, 3000);

        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"].map((error) => error["message"]).join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);
