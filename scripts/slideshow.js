const indicator = document.getElementsByClassName('indicator');
indicator[0].classList.add('active');

const slides = document.getElementsByClassName('slide');
slides[0].classList.add('active');

let activeIndex = 0;
let lastToggle = new Date();

function toggleIndex(count) {
    let newIndex = activeIndex + count;

    if (newIndex < 0) {
        newIndex = slides.length - 1;
    }

    if (newIndex > slides.length - 1) {
        newIndex = 0;
    }

    chooseIndex(newIndex);
}

function chooseIndex(newIndex) {
    indicator[activeIndex].classList.remove('active');
    slides[activeIndex].classList.remove('active');

    indicator[newIndex].classList.add('active');
    slides[newIndex].classList.add('active');

    activeIndex = newIndex;
    lastToggle = new Date();
}

function autoToggle() {
    const togglePastTime = new Date() - lastToggle;

    if (togglePastTime >= 5000) {
        toggleIndex(1);
    }
}

setInterval(autoToggle, 500);

function chooseRecipe() {
    for(let i = 0; i < indicator.length; i++) {
        if (indicator[i].classList.contains('active')) {
            switch (i) {
                case (0):
                    window.location.href = 'https://gruppe-286.developerakademie.net/kochwelt_group/dailyrecipe.html?id=croissant';
                    break;
                case (1):
                    window.location.href = 'https://gruppe-286.developerakademie.net/kochwelt_group/dailyrecipe.html?id=salat';
                    break;
                case (2):
                    window.location.href = 'https://gruppe-286.developerakademie.net/kochwelt_group/dailyrecipe.html?id=tomatemozarella';
                    break;
            }  
        }
    }
}




