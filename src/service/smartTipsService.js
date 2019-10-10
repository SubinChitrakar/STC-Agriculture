import * as tipFunctionality from "../model/smartTips";
import moment from 'moment';

export function addTips(newTips) {
    newTips.writtenDate =moment().format();
    return tipFunctionality.addSmartTips(newTips);
}

export function readAllTips() {
    return tipFunctionality.readAllTips();
}

export function readAllTipsDetails() {
    return tipFunctionality.readAllTipDetails();
}

export function readOneTips(id)
{
    return new Promise((resolve, reject) => {
        tipFunctionality.readOneTip(id)
            .then(res=>{
                let details = res[0];
                details.Date = moment(details.Date).format('MMMM Do YYYY');
                resolve(details);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

export function updateTips(updateTips) {
    return tipFunctionality.updateTip(updateTips);
}

export function deleteTips(id) {
    return tipFunctionality.deleteTip(id);
}