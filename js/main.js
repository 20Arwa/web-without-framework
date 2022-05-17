// *** Class Avtive Function ***
function active(elements, element) {
    elements.forEach(ele => ele.classList.remove("active"));
    element.classList.add("active");
}
// *** Click On Settings ***
let settings = document.querySelector(".settings");
document.querySelector(".settings .fa-gear").addEventListener("click", function() {
    settings.classList.toggle("settings-apearing")
})
// *** Change Color ***
let colors = document.querySelectorAll(".settings .colors > span");
// Check if color exsist in local storage
if (window.localStorage.getItem("color") !== null) {
    document.querySelector(":root").setAttribute("style", `--main-color:${window.localStorage.getItem("color")}`);
    colors.forEach(color => color.dataset.color == window.localStorage.getItem("color") ? color.classList.add("active"):color.classList.remove("active"))
}
colors.forEach(function(color) {
    // Set colors
    color.style.backgroundColor = `${color.dataset.color}`;
    // Change colors on click
    color.addEventListener("click" ,function(){
        document.querySelector(":root").setAttribute("style", `--main-color:${color.dataset.color}`);
        // Class avtive function
        active(colors, color)
        // Store in local storage
        window.localStorage.setItem("color", `${color.dataset.color}`);
    })
})
// *** Change Random Backgrounds ***
let backgrounds = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
// randomBackgrounds
let randomBackgrounds = true;
let backgroundIntreval;
function randomImags() {
    if (randomBackgrounds == true) {
        backgroundIntreval = setInterval(function(){
            let randomNumbers = Math.floor(Math.random() * backgrounds.length);
            document.querySelector(".landing-background").style.backgroundImage = `url("../images/0${backgrounds[randomNumbers]}")`
        }, 5000)
    } 
}
// Run and stop random backgrounds on click on Yes or No
let backOptions = document.querySelectorAll(".random-backgrounds > input");
document.querySelectorAll(".random-backgrounds > input").forEach(function(option){
    option.addEventListener("click", function(){
        // Run random backgrounds on Yes
        if (option.value == "Yes") {
            randomBackgrounds = true;
            randomImags();
            active(backOptions, option)
            window.localStorage.setItem("randomBackgrounds", "Yes")
        }
        // Stop random backgrounds on No
        else {
            randomBackgrounds = false;
            clearInterval(backgroundIntreval);
            active(backOptions, option);
            window.localStorage.setItem("randomBackgrounds", "No")
        }
    })
})
// Check local storage
if (window.localStorage.getItem("randomBackgrounds") !== null) {
    if (window.localStorage.getItem("randomBackgrounds") == "Yes") {
        randomBackgrounds = true;
        randomImags();
        let option = document.querySelector(".random-backgrounds > input:first-of-type");
        active(backOptions, option);
    }
    else {
        randomBackgrounds = false;
        clearInterval(backgroundIntreval);
        let option = document.querySelector(".random-backgrounds > input:last-of-type");
        active(backOptions, option);
    }
}
else {randomImags()}
// *** Skills ***
window.onscroll = function() {
    if (window.scrollY >= document.querySelector(".skills").offsetHeight) {
        // Make arrow to up apear
        document.querySelector(".fa-arrow-up").style.display = "unset";
        // Start progress when arrive to slills section
        document.querySelectorAll(".skills .progress .prog span").forEach(progress => progress.style.width = `${progress.dataset.width}`)
    }
    else {
        document.querySelector(".fa-arrow-up").style.display = "none";
    }
}
// *** Gullery ***
function arrowAppear(arrows, clickedArrow) {
    arrows.forEach(arrow => arrow.classList.remove("disappear"));
    clickedArrow.classList.add("disappear")
}
// Zoom img
document.querySelectorAll(".gallery .imgbox img").forEach(function(img){
    img.addEventListener("click", function(){
        document.querySelector(".gallery-zoom").style.display = "block";
        // Zoom the clicked img
        document.querySelector(".gallery-zoom .content img").setAttribute("src", `${img.getAttribute("src")}`);
        // ### Arrow next and previous in imgs
        let arrowLeft = document.querySelector(".fa-arrow-alt-circle-left");
        let arrowRight = document.querySelector(".fa-arrow-alt-circle-right");
        // Remove arrowLeft and arrowRight from all
        document.querySelectorAll(".gallery-zoom i").forEach(arrow => arrow.classList.remove("disappear"));
        // Remove arrowLeft from first img and arrowRight from the last img and add them to others
        img.getAttribute("src") == "images/01.jpg" ? arrowLeft.classList.add("disappear") :
        img.getAttribute("src") == "images/10.jpg" ? arrowRight.classList.add("disappear") :
        document.querySelectorAll(".gallery-zoom i").forEach(arrow => arrow.classList.remove("disappear"));
        // Click arrowRight to next img
        arrowRight.addEventListener("click", function(){
            let zoomedImg = arrowRight.parentElement.children[1].getAttribute("src");
            document.querySelectorAll(".gallery .imgbox img").forEach(function(img) {
                if (img.getAttribute("src") == zoomedImg) {
                    let nexImg = img.parentElement.nextElementSibling.children[0].getAttribute("src");
                    document.querySelector(".gallery-zoom .content img").setAttribute("src", `${nexImg}`)
                }
                // Remove arrowRight befor reach to the last img
                if (zoomedImg == "images/09.jpg") {arrowAppear(document.querySelectorAll(".gallery-zoom i"), arrowRight)}
            })
        })
        // Click arrowLeft to previous img
        arrowLeft.addEventListener("click", function(){
            let zoomedImg = arrowLeft.parentElement.children[1].getAttribute("src");
            document.querySelectorAll(".gallery .imgbox img").forEach(function(img) {
                if (img.getAttribute("src") == zoomedImg) {
                    let preImg = img.parentElement.previousElementSibling.children[0].getAttribute("src");
                    document.querySelector(".gallery-zoom .content img").setAttribute("src", `${preImg}`)
                }
                // Remove arrowLeft befor reach to the first img
                if (zoomedImg == "images/02.jpg") {arrowAppear(document.querySelectorAll(".gallery-zoom i"), arrowLeft)}
            })
        })
    })
})
// Close img
document.querySelector(".gallery-zoom .content h3").addEventListener("click", () => document.querySelector(".gallery-zoom").style.display = "none")
// *** Arrow To Up ***
document.querySelector(".fa-arrow-up").addEventListener("click", () =>window.scroll(0,0))
// *** Bulletes ***
let bulletsOptions = document.querySelectorAll(".bullets-show > input");
document.querySelectorAll(".settings .bullets-show > input").forEach(function(option){
    option.addEventListener("click", function(){
        // Show bullets on Yes
        if (option.value == "Yes") {
            document.querySelector(".bullets").style.display = "block";
            active(bulletsOptions, option)
            window.localStorage.setItem("bulletsShow", "Yes")
        }
        //Not show bullets on No
        else {
            document.querySelector(".bullets").style.display = "none";
            active(bulletsOptions, option)
            window.localStorage.setItem("bulletsShow", "No")
        }
    })
})
// Check local storage
if (window.localStorage.getItem("bulletsShow") !== null) {
    if (window.localStorage.getItem("bulletsShow") == "Yes") {
        document.querySelector(".bullets").style.display = "block";
        let option = document.querySelector(".bullets-show > input:first-of-type");
        active(bulletsOptions, option)
    }
    else {
        document.querySelector(".bullets").style.display = "none";
        let option = document.querySelector(".bullets-show > input:last-of-type");
        active(bulletsOptions, option)
    }
}
// *** Reset Options ***
document.querySelector(".reset").addEventListener("click", function(){
    window.localStorage.clear();
    location.reload();
})
// *** Media max-width 768px (menu) ***
document.querySelector(".landing-background nav .fa-bars").addEventListener("click", () => document.querySelector(".landing-background nav ul").classList.toggle("appearing"));
