let allabouts = document.getElementsByClassName("all-about");
let aboutcontaints = document.getElementsByClassName("about-containts");

function opentab(tabname) {
    for (allabout of allabouts) {
        allabout.classList.remove("showabout");
    }
    for (aboutcontaint of aboutcontaints) {
        aboutcontaint.classList.remove("showcontaints");
    }
    document.getElementById(tabname).classList.add("showcontaints");
}
allabouts.addEventListner("click", opentab(tabname));

let sidemenu = document.getElementById("menu");
function openmenu() {
    menu.style.right = "0";
}
function closemenu() {
    menu.style.right = "-200px";
}