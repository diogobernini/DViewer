let Visualizador = new DViewer("#image", "#btnPlus", "#btnLess", "#btn100", "img2.jpg");

Visualizador.setHeight(50);

let img1 = false;

$("#changeImg").click(function(event) {
    if(img1){
        Visualizador.changeImage("img2.jpg");
        img1 = false;
    }
    else {
        Visualizador.changeImage("img1.jpg");
        img1 = true;
    }
});