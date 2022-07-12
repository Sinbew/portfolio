/*------------ About Tabs -----------*/

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
