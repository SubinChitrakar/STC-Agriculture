import * as tenderDetails from "../model/tenderDetails.js";
import {getFertilizerFromFertilizerId} from "./fertilizerService";

export function addTenderDetails(newTenderDetails) {
    return tenderDetails.addTenderDetails(newTenderDetails);
}

export function readAll() {
    return tenderDetails.readAllTenderDetails();
}

export function getDetailsFromFertilizerId(fertilizerId){
    return tenderDetails.getDetailsFromFertilizerId(fertilizerId);
}

export function readTenderDetailFromTenderId(tenderId){
    return tenderDetails.readTenderDetailFromTenderId(tenderId)
    .then(tenderDetails=>{
        return generateTenderDetails(tenderDetails);
    })
}

export function readOneTenderDetail(tenderDetailId){
    return tenderDetails.readOneTenderDetail(tenderDetailId);
}

export function generateTenderDetails(tenderDetailsList) {
    let promises = [];
    for(let i =0; i<tenderDetailsList.length; i++)
    {
        promises.push(getComponentsForTenderDetails(tenderDetailsList[i]));
    }
    return Promise.all(promises);
}

export function getComponentsForTenderDetails(tenderDetails) {
    return new Promise((resolve, reject) => {
        return getFertilizerFromFertilizerId(tenderDetails.FertilizerId)
            .then(fertilizer=>{
                tenderDetails.fertilizerName = fertilizer.Name;
                resolve(tenderDetails);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function updateTenderDetails(updatedTenderDetails) {
    return tenderDetails.updateTenderDetails(updatedTenderDetails);
}

export function deleteTender(tenderDetailId) {
    return tenderDetails.deleteTenderDetails(tenderDetailId);
}
