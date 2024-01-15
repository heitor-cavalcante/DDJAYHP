som = "";
function preload() {
    som = loadSound("music.mp3");
}
pulsodireito = 0;
pulsoesquerdo = 0;
pulsodireitoX = 0;
pulsodireitoY = 0;

 pulsoesquerdoX = 0;
pulsoesquerdoY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("modelLoaded!");
}
function gotPoses(results) {

    if (results.length > 0) {
        console.log(results);
        pulsodireito = results[0].pose.keypoints[10].score;
        pulsoesquerdo = results[0].pose.keypoints[9].score;
        console.log("pulsodireito=" + pulsodireito + "pulsoesquerdo=" + pulsoesquerdo);

        pulsoesquerdoX = results[0].pose.leftWrist.x;
        pulsoesquerdoY = results[0].pose.leftWrist.y;
        console.log("pulsoequerdoX=" + pulsoesquerdoX + "pulsoesquerdoY=" + pulsoesquerdoY);

        pulsodireitoX = results[0].pose.rightWrist.x;
        pulsodireitoY = results[0].pose.rightWrist.y;
        console.log("pulsodireitoX=" + pulsodireitoX + "pulsodireitoY=" + pulsodireitoY);

    }
}


function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0001");
    stroke("#FF0001");


    if (pulsodireito > 0.2) {
        circle(pulsodireitoX-200, pulsodireitoY-150, 20);
        if (pulsodireitoY > 0 && pulsodireitoY <= 100) {
            document.getElementById("velocidade").innerHTML = "velocidade=0,5";
            som.rate(0.5);
        } else if (pulsodireitoY > 100 && pulsodireitoY <= 200) {
            document.getElementById("velocidade").innerHTML = "velocidade=1";
            som.rate(1);
        } else if (pulsodireitoY > 200 && pulsodireitoY <= 300) {
            document.getElementById("velocidade").innerHTML = "velocidade=1,5";
            som.rate(1.5);
        } else if (pulsodireitoY > 300 && pulsodireitoY <= 400) {
            document.getElementById("velocidade").innerHTML = "velocidade=2";
            som.rate(2);
        } else if (pulsodireitoY > 400) {
            document.getElementById("velocidade").innerHTML = "velocidade=2,5";
            som.rate(2.5);
        }

    }

    if(pulsoesquerdo>0.1){
        circle(pulsoesquerdoX-500,pulsoesquerdoY-200,20);
        inNumberpulsoesquerdo=Number(pulsoesquerdoY);
        remove_decimals=floor(inNumberpulsoesquerdo);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        som.setVolume(volume);
 }
}
function play() {
    som.play();
    som.setVolume(1);
    som.rate(1)
}