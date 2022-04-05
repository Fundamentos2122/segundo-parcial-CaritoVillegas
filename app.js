const formRec = document.getElementById("form-recipe");
const recetList = document.getElementById("view");
const keyList = "recetList";

document.addEventListener("DOMContentLoaded", function() {
    //Agregar evento al formulario
    formRec.addEventListener("submit", submitRecipe);
    formRec.addEventListener("button", submitIngredient);
    paintRecipes();
});

function submitIngredient(e){
    

}

function submitRecipe(e) {
    e.preventDefault();
    e.stopPropagation();

    let receta = {
        id: Date.now(),
        title: formRec["title"].value,
        description: formRec["description"].value,
        img_url: formRec["img_url"].value,
    };

    let list = getRecipes();

    list.push(receta);

    localStorage.setItem(keyList, JSON.stringify(list));

    paintRecipes();
}

function getRecipes() {
    let list = JSON.parse(localStorage.getItem(keyList));

    if (list === null) {
        return [];
    }
    else {
        return list;
    }
}

function paintRecipes() {
    let list = getRecipes();

    let html = '';

    for(var i = 0; i < list.length; i++) {
        html += 
            ` <div class="[ row ] [ flex ]" data-state="wrap">
                <div class="[ col ]">
                    <div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" id="${list[i].id}">
                        <img src="${list[i].img_url}" alt="">
                        <div class="[ flow ]">
                            <h5>${list[i].title}</h5>
                            <div class="[ flex ]" data-state="justify-between">
                                <button class="[ btn ]" data-state="white" onclick="getRecipe(${list[i].id})">Ver</button>
                                <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${list[i].id})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    recetList.innerHTML = html;
}

function deleteRecipe(id) {
    let list = getRecipes();
    list = list.filter(i => i.id !== id);
    localStorage.setItem(keyList, JSON.stringify(list));
    let recipe = document.getElementById(id);
    //console.log(id);
    recipe.className += ' [ hide ]';
    recipe.remove();
    
}

function getRecipe(id){

}