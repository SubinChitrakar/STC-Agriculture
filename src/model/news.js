import config from '../knexfile';
import knexJs from 'knex';

let knex = knexJs(config.development);

export function addNews(newNews) {
    return new Promise((resolve, reject) => {
        knex('news').insert({
            Title:newNews.title,
            Content:newNews.content,
            Date:newNews.writtenDate
        }).returning('*')
            .then(addedNews => {
                resolve(addedNews);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readAllNews() {
    return new Promise((resolve, reject) => {
        knex.select('id','Title').table('news').orderBy('Date','desc')
            .then(newsList => {
                resolve(newsList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readAllNewsDetails() {
    return new Promise((resolve, reject) => {
        knex.table('news').select('*').orderBy('Date','desc')
            .then(newsList => {
                resolve(newsList);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function readOneNews(id) {
    return new Promise((resolve, reject) => {
        knex('news').select('*').where('id',id)
            .then(news => {
                resolve(news);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function updateNews(updateNews) {
    return new Promise((resolve, reject) => {
        knex('news').where({id: updateNews.id}).update({
            Title:updateNews.Title,
            Content:updateNews.Content,
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteNews(newsId) {
    return new Promise((resolve, reject) => {
        knex('news').where({id: newsId}).del()
            .then(id => {
                resolve(id);
            })
            .catch(err => {
                reject(err);
            });
    });
}