const tabBox = document.querySelector(".tab-box");
const allTab = document.querySelectorAll(".tab");
const arrowIcons = document.querySelectorAll(".icons i");

let isDragging = false;

const handleClickIcon = (scrollVal)=>{
    // let scrollVal = tabBox.scrollLeft;
    let maxScrollWidth = tabBox.scrollWidth - tabBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal > 0 ? "flex" : "none";
    arrowIcons[1].parentElement.style.display = maxScrollWidth - scrollVal <= 1 ? "none" : "flex";
}

arrowIcons.forEach(icon=>{
    icon.addEventListener("click",()=>{
        let scrollWidth = tabBox.scrollLeft += icon.id === "left"? -300 : 300 // if clicked icon is left then reduce 300 from the tabbox scrollleft else add 
        handleClickIcon(scrollWidth);
    });
})

allTab.forEach(tab=>{
    tab.addEventListener("click",()=>{
        tabBox.querySelector(".active").classList.remove("active");
        tab.classList.add("active");
    })
})

const dragging = (e)=>{
    if(!isDragging) return;
    tabBox.classList.add("dragging");
    // scrollLeft gets or sets the number of pixels that an elements is scrolled from its left edge
    tabBox.scrollLeft -= e.movementX // movementX provides the difference in the X coordinate of the mouse pointer of the current event and the previous event.
    handleClickIcon(tabBox.scrollLeft);
}
const dragStop = ()=>{
    isDragging = false;
    tabBox.classList.remove("dragging");
}
tabBox.addEventListener("mousedown",() => isDragging = true);
tabBox.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);