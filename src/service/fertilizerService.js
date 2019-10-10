import * as fertilizerFunctionality from "../model/fertilizer.js";
import * as fertilizerComponentFunctionality from '../model/fertilizerComponents';
import * as tenderDetailsFunctionality from '../model/tenderDetails'

export function addFertilizer(newFertilizer) {
    return fertilizerFunctionality.addFertilizer(newFertilizer)
        .then(addedFertilizer => {
            let newComponent = {};
            if (newFertilizer.counter == 1) {
                newComponent.FertilizerID = addedFertilizer[0].id;
                newComponent.ChemicalComponent = newFertilizer.component;
                newComponent.Percentage = newFertilizer.percentage;
                fertilizerComponentFunctionality.addFertilizerComponent(newComponent);
            } else {
                for (let i = 0; i < newFertilizer.percentage.length; i++) {
                    newComponent.FertilizerID = addedFertilizer[0].id;
                    newComponent.ChemicalComponent = newFertilizer.component[i];
                    newComponent.Percentage = newFertilizer.percentage[i];
                    fertilizerComponentFunctionality.addFertilizerComponent(newComponent);
                }
            }


        })
}

export function readAllFertilizer(){
    return fertilizerFunctionality.readAllFertilizer();
}

export function getOnlyFertilizer(id){
    return fertilizerFunctionality.getFertilizerFromId(id);
}

export function readAll() {
    return fertilizerFunctionality.readAllFertilizer()
        .then(fertilizerList=>{
            return generateList(fertilizerList);
        })
}

export function generateList(fertilizerList) {
    let promises = [];
    for(let i =0; i<fertilizerList.length; i++)
    {
        promises.push(getComponentsForFertilizer(fertilizerList[i]));
    }
    return Promise.all(promises);
}


export function getComponentsForFertilizer(fertilizer) {
    return fertilizerComponentFunctionality.readFertilizerComponentFromFertilizerId(fertilizer);
}

export function getFertilizerFromFertilizerId(fertilizerId) {
    return fertilizerFunctionality.getFertilizerFromId(fertilizerId);
}

export function getFertilizerFromId(fertilizerId) {
    return fertilizerFunctionality.getFertilizerFromId(fertilizerId)
        .then(response=>{
            return getComponentsForFertilizer(response);
        });
}

export function updateFertilizer(updatedFertilizer) {
    return fertilizerFunctionality.updateFertilizer(updatedFertilizer)
        .then(newlyUpdatedFertilizer=>{
            return fertilizerComponentFunctionality.deleteFertilizerComponentFertilizerId(updatedFertilizer.id);
        })
        .then(fertilizerId=>{
            let newComponent = {};
            if(updatedFertilizer.count == 1)
            {
                newComponent.FertilizerID = updatedFertilizer.id;
                newComponent.ChemicalComponent = updatedFertilizer.component;
                newComponent.Percentage = updatedFertilizer.percentage;
                fertilizerComponentFunctionality.addFertilizerComponent(newComponent);
            }
            else{
                for (let i = 0; i < updatedFertilizer.count; i++) {
                    newComponent.FertilizerID = updatedFertilizer.id;
                    newComponent.ChemicalComponent = updatedFertilizer.component[i];
                    newComponent.Percentage = updatedFertilizer.percentage[i];
                    fertilizerComponentFunctionality.addFertilizerComponent(newComponent);
                }
            }
        })
}

export function deleteFertilizer(fertilizerId) {
    return tenderDetailsFunctionality.getDetailsFromFertilizerId(fertilizerId)
        .then(tenderDetailsList=>{
        if (tenderDetailsList.length > 0)
        {
            throw 'Cannot be Deleted';
        }
        else{
            return fertilizerComponentFunctionality.deleteFertilizerComponentFertilizerId(fertilizerId)
                .then(response =>{
                    return fertilizerFunctionality.deleteFertilizer(fertilizerId);
                });
        }
    })

}