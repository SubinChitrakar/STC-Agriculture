import * as newsFunctionality from "../model/news";
import moment from 'moment';

export function addNews(newNews) {
    newNews.writtenDate =moment().format();
    return newsFunctionality.addNews(newNews);
}

export function readAllNews() {
    return newsFunctionality.readAllNews();
}

export function readAllNewsDetails() {
    return newsFunctionality.readAllNewsDetails();
}

export function readOneNews(id)
{
    return new Promise((resolve, reject) => {
        newsFunctionality.readOneNews(id)
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

export function updateNews(updateNews) {
    return newsFunctionality.updateNews(updateNews);
}

export function deleteNews(id) {
   return newsFunctionality.deleteNews(id);
}