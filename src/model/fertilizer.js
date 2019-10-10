import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addFertilizer(newFertilizer) {
    return new Promise((resolve, reject) => {
        knex('fertilizer').insert({
            Name: newFertilizer.fertilizerName,
            ChemicalName: newFertilizer.chemicalName,
            Image: newFertilizer.image
        }).returning('*')
            .then(addedFertilizer => {
                resolve(addedFertilizer);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export function readAllFertilizer() {
    return new Promise((resolve, reject) => {
        knex('fertilizer').select('*').orderBy('Name')
            .then(fertilizerList => {
                resolve(fertilizerList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function getFertilizerFromId(fertilizerId) {
    return new Promise((resolve, reject) => {
        knex('fertilizer').where({id: fertilizerId}).first('*')
            .then(searchedResult => {
                resolve(searchedResult);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function updateFertilizer(updatedFertilizer) {
    return new Promise((resolve, reject) => {
        knex('fertilizer').where({id: updatedFertilizer.id}).update({
            Name: updatedFertilizer.fertilizerName,
            ChemicalName: updatedFertilizer.chemicalName,
            Image: updatedFertilizer.image
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteFertilizer(fertilizerId) {
    return new Promise((resolve, reject) => {
        knex('fertilizer').where({id: fertilizerId}).del()
            .then(fertilizerId => {
                resolve(fertilizerId);
            })
            .catch(err => {
                reject(err);
            });
    });
}

