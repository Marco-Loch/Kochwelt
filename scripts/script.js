async function includeHTML() {
    const includeElements = document.querySelectorAll('[w3-include-html]');

    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        const resp = await fetch(file);

        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function highlightNavLink() {
    const path = window.location.pathname;
    const queryParams = window.location.search;
    const links = document.getElementById('nav').children;

    for (let link of links) {
        if (link.pathname === path && queryParams === '') {
            link.classList.add('link-active');
        }
    }
}


function setupHamburgerMenu() {
    const menuBtn = document.getElementById('menuButton');
    const menu = document.getElementById('menu');
    const menuBg = document.getElementById('menuBg');

    for (obj of [menuBtn, menuBg]) {
        obj.addEventListener('click', (e) => {
            menu.classList.toggle('menu-open');
            menuBg.classList.toggle('visible');
        });
    }
}


function createRecipePreview(recipesArr) {
    const recipeContainer = document.getElementById('example-recipes');

    recipesArr.forEach((recipeObj, index) => {
        const container = createContainerEl();
        const anchor = createAnchorEl(recipeObj);
        const image = createImageEl(recipeObj);
        const span = createSpanEl(recipeObj);

        anchor.appendChild(image);
        container.append(anchor, span);
        recipeContainer.appendChild(container);
    });
}


function createContainerEl() {
    return document.createElement('div');
}


function createAnchorEl(recipeObj) {
    const anchor = document.createElement('a');
    anchor.href = `dailyrecipe.html?id=${recipeObj.link}`;
    return anchor;
}


function createImageEl(recipeObj) {
    const image = document.createElement('img');
    image.src = `./img/${recipeObj.picture}`;
    return image;
}


function createSpanEl(recipeObj) {
    const span = document.createElement('span');
    span.classList.add('center-span');
    span.innerHTML = `${recipeObj.title}`;
    return span;
}


function fillRecipeData(recipesArr) {
    const recipeObj = getRecipeObj(recipesArr);

    createIngredientTable(recipeObj);
    fillData(recipeObj);
}


function getRecipeObj(recipesArr) {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    let recipeObj;

    recipesArr.find((recipe) => {
        if (recipe.link === id) {
            recipeObj = recipe;
        }
    });

    return recipeObj ?? recipeOfTheDay;
}


function createIngredientTable(recipeObj) {
    const persons = +document.getElementById('persons').value;
    if (persons == '') {
        persons = 1;
    }

    document.getElementById('mylist').innerHTML = '';
    createTable(recipeObj, persons);
}


function createTable(recipeObj, persons) {
    for (let i = 0; i < recipeObj.ingredients.length; i++) {
        i % 2 ? color = 'white' : color = 'odd';
        document.getElementById('mylist').innerHTML +=
            `<tr class="trWidth ${color}">
                    <td><div>${Number(recipeObj.ingredients[i].amount) * Number(persons)}</div></td>
                    <td><div>${recipeObj.ingredients[i].unit}</div></td>
                    <td><div>${recipeObj.ingredients[i].ingredient}</div></td>
                    </tr>`;
    }
}

function fillData(recipeObj) {
    document.getElementById('title').innerHTML = recipeObj.title;
    document.getElementById('image').src = `./img/${recipeObj.picture}`;
    document.getElementById('time1').innerHTML = recipeObj.preparationTime;
    document.getElementById('difficulty').innerHTML = recipeObj.difficulty;
    document.getElementById('date').innerHTML = recipeObj.date;
    document.getElementById('time2').innerHTML = recipeObj.preparationTime;
    document.getElementById('totalTime').innerHTML = `Gesamtzeit ca. ${recipeObj.totalTime}`;
    document.getElementById('description').innerHTML = recipeObj.description;
    // document.getElementById('profilePicture').src = `./img/${}`;
    document.getElementById('createdBy').innerHTML = recipeObj.createdBy;
}


function addCalculateEventListener() {
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', () => fillRecipeData(recipes));
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function choseFunction() {
    // Rezeptauswahl in der .index.html generieren oder Rezeptdaten in die dailyrecipe.html befüllen.
    if (window.location.href.includes('index.html')) {
        createRecipePreview(shuffleArray(recipes).slice(0, 3));
    } else if (window.location.href.includes('dailyrecipe.html')) {
        fillRecipeData(recipes);
        addCalculateEventListener();
    }
}


async function onLoad() {
    await includeHTML(); // Warten bis die Templates in die HTML geladen wurden.
    highlightNavLink(); // aktuellen Menüpunkt markieren.
    setupHamburgerMenu(); // Dem Menü ein EventListener hinzufügen 
    choseFunction();
}


onLoad();