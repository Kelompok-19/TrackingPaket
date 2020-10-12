function showTable(){
    var resi = document.getElementById("no-resi").value;
    //console.log(resi);
    var popup = document.getElementsByClassName("alert");
<<<<<<< HEAD
=======
    
>>>>>>> gabungan
    if(resi == ""){   
        for(var i=0; i<popup.length; i++){
            popup[i].style.display = "block";
        }
        document.getElementById("no-resi").focus();
    }
    else{
<<<<<<< HEAD
        var showresi = document.getElementById("show-no-resi").innerHTML = resi;
        var tables = document.getElementById("info-table").style.display="block";
        for(var i=0; i<popup.length; i++){
            popup[i].style.display = "none"
        }
        //console.log("print table")
    }
    
=======
        var load = document.getElementById("loading")
        load.style.display="block";
        for(var i=0; i<popup.length; i++){
            popup[i].style.display = "none"
        }
        data = setTimeout(showData, 3000);
    }
    
}

function showData(){  
        console.log("showData")
        var resi = document.getElementById("no-resi").value;
        var showresi = document.getElementById("show-no-resi");
        var tables = document.getElementById("info-table");

        showresi.innerHTML = resi;
        tables.style.display ="block";

        var load = document.getElementById("loading")
        load.style.display="none";

>>>>>>> gabungan
}