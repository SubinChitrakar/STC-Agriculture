import * as distributorFunctionality from "../model/distributor";

export function addDistributor(newDistributor) {
    newDistributor.PAN = newDistributor.PAN != undefined;
    newDistributor.citizenship = newDistributor.citizenship != undefined;

    newDistributor.status = !!(newDistributor.PAN && newDistributor.citizenship);


    return distributorFunctionality.addDistributor(newDistributor);
}

export function readAll() {
    return distributorFunctionality.readAllDistributor();
}

export function deleteDistributor(id) {
    return distributorFunctionality.deleteDistributor(id);
}