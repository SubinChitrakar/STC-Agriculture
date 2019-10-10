import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addTender(newTender) {
    return new Promise((resolve, reject) => {
        knex('tender').insert({
            DateOfTender:newTender.dateOfTender,
            TotalQuantity:newTender.totalQuantity,
            ManufacturedCountry:newTender.manufacturingCountry,
            PortOfImport:newTender.portOfImport
        }).returning('*')
            .then(addedTender => {
                resolve(addedTender);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readAllTender() {
    return new Promise((resolve, reject) => {
        knex('tender').select('*').orderBy('DateOfTender','desc')
            .then(tenderList => {
                resolve(tenderList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readOneTender(tenderId) {
    return new Promise((resolve, reject) => {
        knex('tender').select('*').where('id',tenderId)
            .then(tender => {
                resolve(tender);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function updateTender(updateTender) {
    return new Promise((resolve, reject) => {
        knex('tender').where({id: updateTender.tenderId}).update({
            DateOfTender:updateTender.dateOfTender,
            TotalQuantity:updateTender.totalQuantity,
            ManufacturedCountry:updateTender.manufacturingCountry,
            PortOfImport:updateTender.portOfImport
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteTender(tenderId) {
    return new Promise((resolve, reject) => {
        knex('tender').where({id: tenderId}).del()
            .then(userID => {
                resolve(userID);
            })
            .catch(err => {
                reject(err);
            });
    });
}






