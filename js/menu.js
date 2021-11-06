const foodBand = 'https://fooddelievery-93b4b-default-rtdb.firebaseio.com/db/food-band';

const renderItems = () => {
   console.log(data);
}

fetch(`${foodBand}.json`)
   .then((response) => { response.json; })
   .then((data) => { renderItems(data); })
   .catch((error) => { console.log.error });