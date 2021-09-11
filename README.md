# Test Case React: Application for manage tabular Transactions Data

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

###### Technologies being used during development process:

- TypeScript
- React
- Redux Toolkit
- Redux Saga
- Axios
- Axios Mock Adapter
- React Bootstrap
- FileSaver.js
- React Final Form
- Normalizr
- Papaparse
- React Redux
- React Select
- Reselect
- Eslint and Prettier as Helpers

By the next Link you can [test Live example of the application](https://inikolas.github.io/test-case-react/). Please take into account that you need properly filled csv file with Transactions to correctly use application. You can [download CSV file](https://drive.google.com/file/d/1_lndTZvhEtHZfbbEzgJDWdsJjqBX7fWR/view?usp=sharing) by this Link.

###### Authorization data:

- Login: test
- Password: 666666

## Description

Application can parse csv files according to the provided pattern. Can filter tabular data, modify and delete entries and then save file back to the disc. By the next Link you can find [all corresponded with the technical task data](https://drive.google.com/drive/folders/1nc5kzYOpRK1Qg647t7rZ0sZ6WGdbzeDs?usp=sharing)

#### Main features:

- press "Import" button to start work with \*.csv file from your local storage;
- press "Export" button to save modified Transactions Table back to the local storage;
- you can filter displayed data in few different ways (Transaction Status and Transaction Type filters). At the table will be displayed only data that conforms all active filters.
- all entries at the table can be Deleted from the table or transaction Status can be changed, for this use Edit and Delete buttons respectively at the last field of each entry;
- special List Field at the rightmost sight of the application window consistently contain history of the names of the all Imported files during working session.
