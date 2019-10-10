import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addSmartTips(newTip) {
    return new Promise((resolve, reject) => {
        knex('smartTips').insert({
            Title:newTip.title,
            Content:newTip.content,
            Date:newTip.writtenDate
        }).returning('*')
            .then(addedTip => {
                resolve(addedTip);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readAllTips() {
    return new Promise((resolve, reject) => {
        knex.select('id','Title').table('smartTips').orderBy('Date','desc')
            .then(tipList => {
                resolve(tipList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readAllTipDetails() {
    return new Promise((resolve, reject) => {
        knex.table('smartTips').select('*').orderBy('Date','desc')
            .then(tipList => {
                resolve(tipList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readOneTip(id) {
    return new Promise((resolve, reject) => {
        knex('smartTips').select('*').where('id',id)
            .then(tip => {
                resolve(tip);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function updateTip(updateTip) {
    return new Promise((resolve, reject) => {
        knex('smartTips').where({id: updateTip.id}).update({
            Title:updateTip.Title,
            Content:updateTip.Content,
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteTip(tipId) {
    return new Promise((resolve, reject) => {
        knex('smartTips').where({id: tipId}).del()
            .then(id => {
                resolve(id);
            })
            .catch(err => {
                reject(err);
            });
    });
}