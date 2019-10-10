import * as userFunctionalities from "../model/user.js";
import * as generator from 'generate-password';

export function addUser(newUser) {
    return userFunctionalities.addUser(newUser);
}

export function createUser(distributorId, distributorEmail) {
    let createdUser = {};
    createdUser.UserName = distributorEmail;

    createdUser.Password = generator.generate({
        length: 10,
        numbers: true
    });

    createdUser.DistributorId = distributorId;
    createdUser.Status = 'Distributor';
    return addUser(createdUser);
}

export function readAll() {
    return userFunctionalities.readAllUser();
}

export function searchByDistributorId(distributorId) {
    return userFunctionalities.searchByDistributorID(distributorId);
}

export function updateUser(updatedUser) {
    return userFunctionalities.updateUser(updatedUser);
}

export function deleteUser(distributorId) {
    return userFunctionalities.deleteUser(distributorId);
}

export function verifyUser(checkUser) {
    return userFunctionalities.verifyUser(checkUser);
}