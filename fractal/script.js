var minVal = -2.5;
var maxVal = 2.5;
var max_iteration = 1000;
var inRange;

var clickC = 0;

//var minSlider;
//var maxSlider;

var dZoom;
var dClick;

function setup(){

    dZoom = document.getElementById("zoom");
    dClick = document.getElementById("click");

    var cnv = createCanvas(360, 360);
    cnv.parent("fr-container");
    pixelDensity(1);
    noLoop(); 
    inRange = maxVal - minVal;
    drawFractal();

    var resetBtn = document.querySelector(".btn");
    resetBtn.addEventListener("click", resetZoom);
    //minSlider = createSlider(-2.5, 0, -2.5, 0.1);
    //maxSlider = createSlider(0, 2.5, 2.5, 0.1);
}

function draw(){
}

function drawFractal(){

    loadPixels();
    for(var x = 0; x<width; x++){
        for(var y=0; y<height; y++){

            var a = map(x, 0, width, minVal, maxVal);
            var b = map(y, 0, height, maxVal, minVal);

            var ca = a;
            var cb = b;

            var n =0;
            var z = 0;

            while(n < max_iteration){
                var aa = a*a - b*b;
                var bb = 2 * a * b;

                a = aa + ca;
                b = bb + cb;

                if(a*a + b*b > 16){
                    break;
                }
                n++;
            }

            var bright = map(n, 0, max_iteration, 0, 1);
            bright = map(sqrt(bright), 0, 1, 0, 255);
            //var bright = floor(n*16)%255;
            //var bright = 200;

            if(n == max_iteration){
                bright = 0;
            }

            var pix = (x+y*width)*4;
            pixels[pix+0] = bright;
            pixels[pix+1] = bright;
            pixels[pix+2] = bright;
            pixels[pix+3] = 255;
        }
    }
    updatePixels();
}

function mousePressed(){
    if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
        var mouseXC = map(mouseX, 0, width, minVal, maxVal);
        var mouseYC = map(mouseY, 0, height, maxVal, minVal);

        var range = maxVal - minVal;
        var newRange = range*0.5;

        minVal = mouseXC - newRange / 2;
        maxVal = mouseXC + newRange / 2;

        var zoom = inRange / newRange;
        console.log(zoom);
        clickC ++;
        dZoom.textContent = "Zoom: " + zoom;
        dClick.textContent = "Click count: " + clickC
        drawFractal();
    }
}

function resetZoom(){
    minVal = -2.5;
    maxVal = 2.5;
    clickC = 0;

    dZoom.textContent = "Zoom: 1";
    dClick.textContent = "Click count: 0";
    drawFractal();
}