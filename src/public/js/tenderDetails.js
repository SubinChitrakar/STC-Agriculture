var counterElement = document.getElementById('details');
function addItem(count) {
    var counter = counterElement.getAttribute('value');
    counter++;
    counterElement.setAttribute('value',counter);

    var table = document.getElementById('tableData');

    var newRow = document.createElement('tr');
    newRow.setAttribute('id','row'+counter);

    //drop down list of fertilizer
    var columnFertilizer = document.createElement('td');
    var selectDropDown = document.createElement("select");
    selectDropDown.classList.add("form-control");
    selectDropDown.name = "fertilizer";
    selectDropDown.id="fertilizer";
    selectDropDown.required = true;
    var options = document.getElementsByClassName('fertilizers');
    var fertilizers = {};
    for(var i = 0; i<options.length; i++)
    {
        fertilizers[options[i].value]=options[i].name;
    }
    for(index in fertilizers) {
        selectDropDown.options[selectDropDown.options.length] = new Option(fertilizers[index], index);
    }
    columnFertilizer.appendChild(selectDropDown);
    newRow.appendChild(columnFertilizer);

    //input for import price
    var columnImportPrice = document.createElement('td');
    var importPrice = document.createElement("input");
    importPrice.setAttribute('type', 'number');
    importPrice.classList.add("form-control");
    importPrice.name ="importPrice";
    importPrice.setAttribute('min', '1');
    importPrice.required = true;
    columnImportPrice.appendChild(importPrice);
    newRow.appendChild(columnImportPrice);


    //input for selling price
    var columnSellingPrice = document.createElement('td');
    var sellingPrice = document.createElement("input");
    sellingPrice.setAttribute('type', 'number');
    sellingPrice.classList.add("form-control");
    sellingPrice.name ="sellingPrice";
    sellingPrice.setAttribute('min', '1');
    sellingPrice.required = true;
    columnSellingPrice.appendChild(sellingPrice);
    newRow.appendChild(columnSellingPrice);

    //quantity
    var columnQuantity = document.createElement('td');
    var quantity = document.createElement("input");
    quantity.setAttribute('type', 'number');
    quantity.classList.add("form-control");
    quantity.name ="quantity";
    quantity.setAttribute('min', '1');
    quantity.required = true;
    columnQuantity.appendChild(quantity);
    newRow.appendChild(columnQuantity);

    //input for remarks
    var columnRemarks = document.createElement('td');
    var remarks = document.createElement("textarea");
    remarks.setAttribute('rows', '3');
    remarks.classList.add("form-control");
    remarks.name ="remarks";
    columnRemarks.appendChild(remarks);
    newRow.appendChild(columnRemarks);

    //delete button
    var columnDelete = document.createElement('td');
    var deleteButton = document.createElement("input");
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('value', 'x');
    deleteButton.setAttribute('name', 'delete'+counter);
    deleteButton.classList.add("btn");
    deleteButton.classList.add("pull-right");
    deleteButton.classList.add("btn-danger");
    deleteButton.onclick = function(){
        deleteItem(this);
    };
    columnDelete.appendChild(deleteButton);
    newRow.appendChild(columnDelete);

    table.appendChild(newRow);
}

function deleteItem(event) {
    var buttonName = event.name;
    var value = buttonName.replace("delete","");
    var element = document.getElementById("row"+value);
    element.parentNode.removeChild(element);
    var counter = counterElement.getAttribute('value');
    counter--;
    counterElement.setAttribute('value',counter);

}
