const partners = 'https://fooddelievery-93b4b-default-rtdb.firebaseio.com/db/partners';

const renderItems = (data) => {
   data.forEach(element => {
      console.log(element);
   });
}

fetch(`${partners}.json`)
   .then((response) => response.json())
   .then((data) => renderItems(data))
   .catch((error) => console.log.error);