


window.addEventListener("load", load);

function load() {

    document.getElementById("rows").value =10;
    document.getElementById("columns").value =10;
    
    
    generateTable()
}

function generateTable() {

 var rows = document.getElementById("rows").value;

var columns = document.getElementById("columns").value;

var table = document.getElementById("multiplicationtable");


multiplicationtable.innerHTML = "";

for (var j = 1; j <= rows; j++) {
    var row = multiplicationtable.insertRow();

    for (var k =1; k <= columns; k++){
        var cell = row.insertCell();
        cell.innerHTML = (j + " x " + k + " = " + j * k);

    }
}

}