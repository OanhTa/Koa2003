document.querySelector('h2').classList.add('title');
document.querySelector('p').classList.remove('sub-title');
document.querySelector('p').classList.add('content');

document.querySelectorAll('div').forEach((div)=>{
    div.classList.add('box');
})