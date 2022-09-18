
//Creating an observer to observe the elements.
const observer = new IntersectionObserver((entries)=>{

        //Using a forEach loop to check each of our 'entries'
    entries.forEach((entry) =>{
        //If our element is visible on page the we add the animation start class
        if (entry.isIntersecting) {
            entry.target.classList.add('animStart')
            
        } else{
            //Otherwise we remove the classList
            entry.target.classList.remove('animStart')

            //This block of code is for 'resetting' the animation to play once the elements are in view again
            //First we change the name of our animation name
            entry.target.style.animationName = "none";
            //Then we play a function to make the animation name blank - therefore forcing it to fallback to the original value from the CSS
            //There's an artificial delay set to ensure the keyframes are detached in one frame and re-attached in another to sort out any errors.
            requestAnimationFrame(() => {
                setTimeout(() => {
                    entry.target.style.animationName = ""
                }, 0);
            });

        }
    });

});


//Here we find the elements that are supposed to move with a queryselectorall
const hiddenElements = document.querySelectorAll('.animElement');

//Here we run our observer with the elements we discovered with the queryselectorall
hiddenElements.forEach((el)=>observer.observe(el));
