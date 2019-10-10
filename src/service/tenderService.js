import * as tenderFunctionality from "../model/tender.js";
import * as tenderDetailsFunctionality from "../model/tenderDetails";
import moment from 'moment';

export function addTender(newTender) {
    let totalQuantity = 0;
    if (newTender.counter == 1) {
        totalQuantity = parseInt(newTender.quantity);
    } else {
        for (let i = 0; i < newTender.counter; i++) {
            totalQuantity += parseInt(newTender.quantity[i]);
        }
    }
    newTender.totalQuantity = totalQuantity;
    return tenderFunctionality.addTender(newTender)
        .then(addedTender => {
            let newTenderDetail = {};
            if (newTender.counter == 1) {
                newTenderDetail.tenderId = addedTender[0].id;
                newTenderDetail.fertilizerId = newTender.fertilizer;
                newTenderDetail.importPrice = newTender.importPrice;
                newTenderDetail.sellingPrice = newTender.sellingPrice;
                newTenderDetail.quantity = newTender.quantity;
                newTenderDetail.remarks = newTender.remarks;
                tenderDetailsFunctionality.addTenderDetails(newTenderDetail)
            } else {
                for (let i = 0; i < newTender.fertilizer.length; i++) {
                    newTenderDetail.tenderId = addedTender[0].id;
                    newTenderDetail.fertilizerId = newTender.fertilizer[i];
                    newTenderDetail.importPrice = newTender.importPrice[i];
                    newTenderDetail.sellingPrice = newTender.sellingPrice[i];
                    newTenderDetail.quantity = newTender.quantity[i];
                    newTenderDetail.remarks = newTender.remarks[i];
                    tenderDetailsFunctionality.addTenderDetails(newTenderDetail)
                }
            }
        })

}

export function readAll() {
    return new Promise((resolve, reject) => {
        tenderFunctionality.readAllTender()
            .then(res => {
                for (let obj of res) {
                    obj.DateOfTender = moment(obj.DateOfTender).format('YYYY-MM-DD');
                }
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function readOneTender(tenderId) {
    return new Promise((resolve, reject) => {
        return tenderFunctionality.readOneTender(tenderId)
            .then(res => {
                res[0].DateOfTender = moment(res[0].DateOfTender).format('YYYY-MM-DD');
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function updateTender(updatedTender) {
    let totalQuantity = 0;
    if (updatedTender.counter == 1) {
        totalQuantity = parseInt(updatedTender.quantity);
    } else {
        for (let i = 0; i < updatedTender.counter; i++) {
            totalQuantity += parseInt(updatedTender.quantity[i]);
        }
    }
    updatedTender.totalQuantity = totalQuantity;
    return tenderFunctionality.updateTender(updatedTender)
        .then(newlyUpdatedFertilizer=>{
            return tenderDetailsFunctionality.deleteTenderDetailsFromTenderId(updatedTender.tenderId)
        })
        .then(fertilizerId=>{
            let newTenderDetail = {};
            if (updatedTender.counter == 1) {
                newTenderDetail.tenderId = updatedTender.tenderId;
                newTenderDetail.fertilizerId = updatedTender.fertilizer;
                newTenderDetail.importPrice = updatedTender.importPrice;
                newTenderDetail.sellingPrice = updatedTender.sellingPrice;
                newTenderDetail.quantity = updatedTender.quantity;
                newTenderDetail.remarks = updatedTender.remarks;
                tenderDetailsFunctionality.addTenderDetails(newTenderDetail);
            } else {
                for (let i = 0; i < updatedTender.fertilizer.length; i++) {
                    newTenderDetail.tenderId = updatedTender.tenderId;
                    newTenderDetail.fertilizerId = updatedTender.fertilizer[i];
                    newTenderDetail.importPrice = updatedTender.importPrice[i];
                    newTenderDetail.sellingPrice = updatedTender.sellingPrice[i];
                    newTenderDetail.quantity = updatedTender.quantity[i];
                    newTenderDetail.remarks = updatedTender.remarks[i];
                    tenderDetailsFunctionality.addTenderDetails(newTenderDetail);
                }
            }
        })
}

export function deleteTender(tenderId) {
    return tenderDetailsFunctionality.deleteTenderDetailsFromTenderId(tenderId)
        .then(response =>{
            return tenderFunctionality.deleteTender(tenderId);
        });

}
