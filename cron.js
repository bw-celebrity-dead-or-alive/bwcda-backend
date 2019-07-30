
const cron = require('node-cron');
const fs = require('fs');
const Axios = require('axios');


let writer = fs.createWriteStream('cels.js', { flags: 'a' });
let celebs = require('./celebrities');
writer.write('[');

let count = 0;

async function getImage() {
  let image = null;
  try {
    const search = await Axios.get(
      `https://api.tvmaze.com/search/people?q=${encodeURI(celebs[count].name)}`
    );
    image = search.data.filter(pi => pi.person && pi.person.image)[0].person
      .image.medium;
  } catch (error) {
    image =
      'https://adamsbooks.co.za/wp-content/uploads/2018/01/Sorry-Image-Not-Available-297.png';
  }

  const res = celebs.find(cel => cel.id === count);
  res.image_url = image;
  writer.write(JSON.stringify(res) + ',');
  count++;
  console.log(`${res.image_url} added to ${res.name}`);
  console.log('Count now at ', count);
}

let task = cron.schedule('*/10 * * * * *', () => {
  getImage();
  if (count === celebs.length - 1) {
    task.destroy();
    writer.write(']');
    writer.close();
    console.log('completed!!!!!!!');
  }
});
