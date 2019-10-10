import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);


export function addUser(newUser) {
    return new Promise((resolve, reject) => {
        knex('users').insert({
            UserName: newUser.UserName,
            Password: newUser.Password,
            DistributorId:newUser.DistributorId,
            Status: newUser.Status
        }).returning('*')
            .then(addedUser => {
                console.log(addedUser);
                resolve(addedUser);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readAllUser() {
    return new Promise((resolve, reject) => {
        knex('users').select('*')
            .then(userList => {
                resolve(userList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readAllUserPage(currentPage) {
    let limit=10;
    let count=0;
    let offset=currentPage*limit-limit;
    return new Promise((resolve, reject) => {
        knex('users').count('id').first()
            .then(response=>{
                count=response.count;
                return knex('users').select('*').limit(limit).offset(offset);
            })
            .then(userList=>{
                resolve({userList:userList, count: count});
            })
            .catch(err=>{
                reject(err);
            })
    })
}

export function searchByDistributorID(distributorId) {
    return new Promise((resolve, reject) => {
        knex('users').where({DistributorId: distributorId}).first('*')
            .then(searchedUser => {
                resolve(searchedUser);
            })
            .catch(err => {
                reject(err);
            });
    });
}


export function updateUser(updatedUser) {
    return new Promise((resolve, reject) => {
        knex('users').where({id: updatedUser.id}).update({
            UserName: updatedUser.UserName,
            Status: updatedUser.Status
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteUser(distributorId) {
    return new Promise((resolve, reject) => {
        knex('users').where({DistributorId: distributorId}).del()
            .then(userID => {
                resolve(userID);
            })
            .catch(err => {
                reject(err);
            });
    });
}


export function verifyUser(existingUser) {
    return new Promise((resolve, reject) => {
        knex('users').where({
            UserName: existingUser.UserName,
            Password: existingUser.Password
        }).select('Status').first()
            .then(res => {
                return res ? resolve(res) : resolve({Status: "Not Admin"});
            })
            .catch(err => {
                reject(err);
            });
    });
}








