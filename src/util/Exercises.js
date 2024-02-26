const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cea507f5e2mshd2949d5e1e89ef5p1eca22jsnb48171ef3c56',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

async function getData(bodyPart) {
  const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + bodyPart
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

export { getData }