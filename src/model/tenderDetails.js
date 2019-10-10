import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addTenderDetails(newTenderDetails) {
    return new Promise((resolve, reject) => {
        knex('tenderDetails').insert({
            TenderId:newTenderDetails.tenderId,
            FertilizerId:newTenderDetails.fertilizerId,
            ImportPrice:newTenderDetails.importPrice,
            SellingPrice:newTenderDetails.sellingPrice,
            Quantity:newTenderDetails.quantity,
            Remarks:newTenderDetails.remarks
        }).returning('*')
            .then(addedTender => {
                resolve(addedTender);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function getDetailsFromFertilizerId(fertilizerId){
    return new Promise((resolve, reject) => {
        knex('tenderDetails').where({FertilizerId: fertilizerId})
            .then(searchedComponent => {
                resolve(searchedComponent);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function readAllTenderDetails() {
    return new Promise((resolve, reject) => {
        knex('tenderDetails').select('*')
            .then(tenderList => {
                resolve(tenderList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readTenderDetailFromTenderId(tenderId) {
    return new Promise((resolve, reject) => {
        knex('tenderDetails').select('*').where('TenderId',tenderId)
            .then(tenderDetails => {
                resolve(tenderDetails);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readOneTenderDetail(tenderDetailsId) {
    return new Promise((resolve, reject) => {
        knex('tenderDetails').select('*').where('id',tenderDetailsId)
            .then(tender => {
                resolve(tender);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function updateTenderDetails(updateTenderDetails) {
    return new Promise((resolve, reject) => {
        knex('tenderDetails').where({id: updateTenderDetails.id}).update({
            TenderId:updateTenderDetails.tenderId,
            FertilizerId:updateTenderDetails.fertilizerId,
            ImportPrice:updateTenderDetails.importPrice,
            SellingPrice:updateTenderDetails.sellingPrice,
            Quantity:updateTenderDetails.quantity,
            Remarks:updateTenderDetails.remarks
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteTenderDetails(tenderDetailsId) {
    return new Promise((resolve, reject) => {
        knex('tenderDetails').where({id: tenderDetailsId}).del()
            .then(userID => {
                resolve(userID);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteTenderDetailsFromTenderId(tenderId) {
    return new Promise((resolve, reject) => {
        knex('tenderDetails').where({TenderId: tenderId}).del()
            .then(userID => {
                resolve(userID);
            })
            .catch(err => {
                reject(err);
            });
    });
}





