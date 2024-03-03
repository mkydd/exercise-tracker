const request = require('request');
const fs = require('node:fs');

const options = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises',
  qs: {limit: '2000'},
  headers: {
    'X-RapidAPI-Key': 'cea507f5e2mshd2949d5e1e89ef5p1eca22jsnb48171ef3c56',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);
  const data = body;

  fs.writeFile('./data.txt', data, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data Written Successfully')
    }
  });
  
});