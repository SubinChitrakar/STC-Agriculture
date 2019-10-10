import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addDistributor(addDistributor) {
    return new Promise((resolve, reject) => {
        knex('distributor').insert({
            CompanyName: addDistributor.companyName,
            ProprietorName: addDistributor.proprietorName,
            ContactNo: addDistributor.contactNo,
            Email:addDistributor.email,
            Longitude: addDistributor.longitude,
            Latitude: addDistributor.latitude,
            PAN: addDistributor.PAN,
            Citizenship:addDistributor.citizenship,
            Status: addDistributor.status
        }).returning('*')
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readAllDistributor() {
    return new Promise((resolve, reject) => {
        knex('distributor').select('*').orderBy('Status')
            .then(distributorList => {
                resolve(distributorList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteDistributor(id) {
    return new Promise((resolve, reject) => {
        knex('distributor').where({id: id}).del()
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}