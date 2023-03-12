const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

async function getPokemons() {
  // fai http req programmaticamente... 
  const { data } = await axios.get("https://limitlesstcg.com/cards/it/CRZ?display=full&show=50&sort=set");
  // usa il settore $ per estrapolare gli elementi dall html 
  const $ = cheerio.load(data);
  const collection = [];
  $('.card-page-main').each((index, element) => {
    const $element = $(element);
    const title = $element.find('.card-text-title').text();
    const name = $element.find('.card-text-name').text();
    const img_url = $element.find('.card.shadow.resp-w').attr('src');
    const price = $element.find('.card-price.eur').text();
    const attack_name = $element.find('.card-text-attack-info').text();
    const attack_info = $element.find('.card-text-attack-effect').text();
    const info = $element.find('.card-text-wrr').text();
    const card = {
      title,
      name, 
      img_url,
      price,
      attack_name, 
      attack_info, 
      info
    }
    collection.push(card);
  });
  // console.log(collection);
  return collection;
}


router.get('/', async (req, res) => {
  const cards = await getPokemons();
  res.json(cards);
});


module.exports = router;
