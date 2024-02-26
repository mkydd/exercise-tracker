const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
  params: {limit: '10'},
  headers: {
    'X-RapidAPI-Key': 'cea507f5e2mshd2949d5e1e89ef5p1eca22jsnb48171ef3c56',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

async function getData(bodyPart) {
  options.url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + bodyPart
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
getData('lower legs')
module.exports = { getData }