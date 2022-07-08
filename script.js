function generateQR(){
    document.getElementById("qr-image").style.display="block";
    let QRtext=document.getElementById("text").value;
  
    if(QRtext.trim().length==0){
        document.getElementById("qr-image .error").innerHTML="Please enter text";
        document.getElementById("img").style.display="none";
    }
    else{
        document.getElementById("img").style.display="block";
        document.getElementById("qr-image .error").innerHTML="";
        document.getElementById("img").src="https://api.qrserver.com/v1/create-qr-code/?size=240*240&data="+QRtext;
    }
}
