const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
  params: {muscle: 'biceps'},
  headers: {
    'X-RapidAPI-Key': 'cea507f5e2mshd2949d5e1e89ef5p1eca22jsnb48171ef3c56',
    'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
  }
};

async function getData() {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export { getData }