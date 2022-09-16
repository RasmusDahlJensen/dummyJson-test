const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry) =>{
        if (entry.isIntersecting) {
            entry.target.classList.add('animStart')
            
        } else{
            entry.target.classList.remove('animStart')
            entry.target.style.animationName = "none";

            requestAnimationFrame(() => {
                setTimeout(() => {
                    entry.target.style.animationName = ""
                }, 0);
            });

        }
    });

});


const hiddenElements = document.querySelectorAll('.animElement');
hiddenElements.forEach((el)=>observer.observe(el));
