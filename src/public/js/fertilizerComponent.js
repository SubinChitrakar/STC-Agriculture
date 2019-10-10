var counterElement = document.getElementById('componentId');
function addItem(counter) {
    counter++;
    counterElement.setAttribute('value',counter);
    var element = document.getElementById("components");
    var mainDiv = document.createElement("div");

    mainDiv.classList.add("form-group");
    mainDiv.classList.add("col-xs-12");
    mainDiv.classList.add("component-menu");
    mainDiv.setAttribute('id','index'+counter);

    var innerDiv3 = document.createElement("div");
    innerDiv3.classList.add("col-xs-3");
    mainDiv.appendChild(innerDiv3);

    var innerDiv8 = document.createElement("div");
    innerDiv8.classList.add("col-xs-8");

    var dropDownDiv = document.createElement("div");
    dropDownDiv.classList.add("col-xs-5");

    var inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    var addon = document.createElement("span");
    addon.classList.add("input-group-addon");
    inputGroup.appendChild(addon);

    var selectDropDown = document.createElement("select");
    selectDropDown.classList.add("form-control");
    selectDropDown.name = "component";
    selectDropDown.id="component";
    selectDropDown.required = true;

    var componentList = {
        "Select" : 'Select a Component',
        "Nitrogen" : 'Nitrogen',
        "Phosphorus": 'Phosphorus',
        "Potassium":'Potassium'
    };
    for(index in componentList) {
        selectDropDown.options[selectDropDown.options.length] = new Option(componentList[index], index);
    }
    inputGroup.appendChild(selectDropDown);
    dropDownDiv.appendChild(inputGroup);
    innerDiv8.appendChild(dropDownDiv);

    var percentageDiv = document.createElement("div");
    percentageDiv.classList.add("col-xs-4");

    var percentageInputGroup = document.createElement("div");
    percentageInputGroup.classList.add("input-group");

    var percentageAddOn = document.createElement("span");
    percentageAddOn.classList.add("input-group-addon");

    var icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add("fa-percentage");
    percentageAddOn.appendChild(icon);

    percentageInputGroup.appendChild(percentageAddOn);

    var txtPercentage = document.createElement("input");
    txtPercentage.setAttribute('type', 'number');
    txtPercentage.classList.add("form-control");
    txtPercentage.name ="percentage";
    txtPercentage.setAttribute('min', '1');
    txtPercentage.placeholder = "Percentage";
    txtPercentage.required = true;
    percentageInputGroup.appendChild(txtPercentage);
    percentageDiv.appendChild(percentageInputGroup);
    innerDiv8.appendChild(percentageDiv);

    var deleteDiv = document.createElement("div");
    deleteDiv.classList.add("col-xs-2");

    var deleteButton = document.createElement("input");
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('value', 'x');
    deleteButton.setAttribute('name', 'delete'+counter);
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");

    deleteDiv.appendChild(deleteButton);

    innerDiv8.appendChild(deleteDiv);
    mainDiv.appendChild(innerDiv8);
    element.appendChild(mainDiv);

    deleteButton.onclick = function(){
        deleteItem(this);
    };
}

function deleteItem(event) {
    var buttonName = event.name;
    var value = buttonName.replace("delete","");
    var element = document.getElementById("index"+value);
    element.parentNode.removeChild(element);

    var counter = counterElement.getAttribute('value');
    counter--;
    counterElement.setAttribute('value',counter);
}