function showTable(){
    var resi = document.getElementById("no-resi").value;
    //console.log(resi);
    var popup = document.getElementsByClassName("alert");
    if(resi == ""){   
        for(var i=0; i<popup.length; i++){
            popup[i].style.display = "block";
        }
        document.getElementById("no-resi").focus();
    }
    else{
        var showresi = document.getElementById("show-no-resi").innerHTML = resi;
        var tables = document.getElementById("info-table").style.display="block";
        for(var i=0; i<popup.length; i++){
            popup[i].style.display = "none"
        }
        //console.log("print table")
    }
    
}

function showLoad(){
    var load = document.getElementsByClassName("ui icon message");
    var search = document.getElementsByClassName("text-center")
    
    var resi = document.getElementById("no-resi").value;
    showLoad();
}