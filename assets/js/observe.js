const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry) =>{
        if (entry.isIntersecting) {
            entry.target.classList.toggle('slideRight')
            entry.target.classList.toggle('slideLeft')
            
        } else{
            entry.target.classList.toggle('slideRight')
            entry.target.classList.toggle('slideLeft')
        }
    });

});


const hiddenElements = document.querySelectorAll('.animElement');
hiddenElements.forEach((el)=>observer.observe(el));