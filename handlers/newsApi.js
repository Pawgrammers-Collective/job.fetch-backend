'use strict'

const { response } = require('express');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);


async function handleGetNews(request, response) {
    let companyName = request.query.company;
    console.log(request.query);
    try{
        let news = await newsapi.v2.everything({
            // q will be company names from saved jobs
            q: companyName,
            serchIn: 'title',
            sortBy: 'popularity',
            language: 'en'
        })
        console.log(news);
        // response.status(200).send(news.articles);
        response.send(news)
    }catch{
        response.send('error')
    }  
}

module.exports = handleGetNews