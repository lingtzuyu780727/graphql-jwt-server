import fs from 'fs';

// fetch data from data.json
const data = fs.readFileSync('../../data/data.json', 'utf-8');
const dataJSON = JSON.parse(data);

// 1. use bcrypt to hash password

// 2. push the data to dataJSON.users

// 3. write back the data to data.json

const newData = JSON.stringify(dataJSON, null, 2);

fs.writeFileSync('../../data/data.json', newData, 'utf-8');
