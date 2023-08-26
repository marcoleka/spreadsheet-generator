const express = require('express');
const faker = require('faker');
const fs = require('fs');
const csv = require('fast-csv');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/generate', (req, res) => {

  const columnNames = req.body.columnNames;
  const columnTypes = req.body.columnTypes;
  const columnLengths = req.body.columnLengths;
  const numRows = req.body.number;

  const columns = [];
  const data = [];

  for (let i = 0; i < columnNames.length; i++) {
    columns[i] = { name: columnNames[i], type: columnTypes[i], columnLength: columnLengths[i] };
  }

  console.log(columns);

  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    const rowData = [];

    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      let column = columns[colIndex];

      let randomValue;

      switch (column['type']) {
        case 'string':
          randomValue = faker.lorem.word().substring(0, column.columnLength);
          break;
        case 'number':
          randomValue = faker.datatype.number();
          break;
        case 'date':
          randomValue = faker.date.past();
          break;
      }
      rowData.push(randomValue);
    }

    data.push(rowData);
  }

  console.log(data);

  const ws = fs.createWriteStream('generated_data.csv');
  csv.write(data, { headers: columnNames }).pipe(ws);

  res.redirect('/download');
});

app.get('/download', (req, res) => {
  res.download('generated_data.csv');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
