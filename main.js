prediction_1=""
prediction_2=""

Webcam.set({
    height:300,
    width:300,
    image_format:'jpeg',
    jpeg_quality:100
});
Webcam.attach("#webcam");

function take_snapshot(){
    Webcam.snap(function(data_uri){
document.getElementById("snapshot").innerHTML='<img id="output" src="'+data_uri+'">'
    })
}


console.log('ml5version',ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/3nJTc27AY/model.json",loaded);
 function loaded(){
    console.log("Model is loaded");

 }
 function check(){
    img=document.getElementById("output")
    classifier.classify(img,got_result)
 }
 function got_result(error,result){
    if(error){
        console.log(error);
    }else{
        console.log(result);
        document.getElementById("gesture1name").innerHTML=result[0].label;
        document.getElementById("gesture2name").innerHTML=result[1].label;
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        speak()
        if(result[0].label=="Perfect"){
            document.getElementById("gesture1emoje").innerHTML="&#128076;"
        }
        if(result[0].label=="Hi"){
            document.getElementById("gesture1emoje").innerHTML="&#128075"
        }
        if(result[0].label=="Thumbs up"){
            document.getElementById("gesture1emoje").innerHTML="&#128077;"
        
        }
        if(result[0].label=="Pointing"){
            document.getElementById("gesture1emoje").innerHTML="&#9757;"
        }
        if(result[1].label=="Hi"){
            document.getElementById("gesture2emoje").innerHTML="&#128075;"
        }
        if(result[1].label=="Thumbs up"){
            document.getElementById("gesture2emoje").innerHTML="&#128077;"
        
        }
        if(result[1].label=="Pointing"){
            document.getElementById("gesture2emoje").innerHTML="&#9757;"
        }
        if(result[1].label=="Perfect"){
            document.getElementById("gesture2emoje").innerHTML="&#128076;"
        }
        
        
    }
 }
 function speak(){
    var synth= window.speechSynthesis;
    speak1="The first prediction is "+prediction_1;
    speak2="And the second prediction is"+prediction_2;
    var utter_this=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utter_this);
 }