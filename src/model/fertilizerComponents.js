import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addFertilizerComponent(newFertilizerComponent) {
    return new Promise((resolve, reject) => {
        knex('fertilizerComponents').insert({
            FertilizerID: newFertilizerComponent.FertilizerID,
            ChemicalComponent: newFertilizerComponent.ChemicalComponent,
            Percentage : newFertilizerComponent.Percentage
        }).returning('*')
            .then(addedFertilizerComponent => {
                resolve(addedFertilizerComponent);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readAllFertilizerComponent() {
    return new Promise((resolve, reject) => {
        knex('fertilizerComponents').select('*')
            .then(addFertilizerComponentList => {
                resolve(addFertilizerComponentList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readFertilizerComponentFromFertilizerId(fertilizer){
    return new Promise((resolve, reject) => {
        knex('fertilizerComponents').where({FertilizerID: fertilizer.id})
            .then(searchedComponent => {
                fertilizer.ComponentCount = searchedComponent.length;
                fertilizer.Component = searchedComponent;
                resolve(fertilizer);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function updateFertilizerComponent(updatedFertilizerComponent) {
    return new Promise((resolve, reject) => {
        knex('fertilizerComponents').where({id: updatedFertilizerComponent.id}).update({
            FertilizerID: updatedFertilizerComponent.FertilizerID,
            ChemicalComponent: updatedFertilizerComponent.ChemicalComponent,
            Percentage : updatedFertilizerComponent.Percentage
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteFertilizerComponent(fertilizerComponentId) {
    return new Promise((resolve, reject) => {
        knex('fertilizerComponents').where({id: fertilizerComponentId}).del()
            .then(fertilizerId => {
                resolve(fertilizerId);
            })
            .catch(err => {
                reject(err);
            });
    });
}


export function deleteFertilizerComponentFertilizerId(fertilizerId) {
    return new Promise((resolve, reject) => {
        knex('fertilizerComponents').where({FertilizerID: fertilizerId}).del()
            .then(fertilizerId => {
                resolve(fertilizerId);
            })
            .catch(err => {
                reject(err);
            });
    });
}