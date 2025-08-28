let count=parseInt(document.querySelector(".count").innerText);
const increment = ()=>{
    count++;
    document.querySelector(".count").innerText=count;
}
const decrement = ()=>{
    count--;
    document.querySelector(".count").innerText=count;
}