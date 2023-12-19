'use strict'

const { response } = require('express');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);


async function handleGetNews(request, response) {
    // let companyName = 
    try{
        let news = await newsapi.v2.everything({
            // q will be company names from saved jobs
            q: 'hulu',
            serchIn: 'title',
            sortBy: 'popularity',
            language: 'en'
        })
        console.log(news)
        response.status(200).send(news.articles)
    }catch{
        response.send('error')
    }  
}

module.exports = handleGetNews