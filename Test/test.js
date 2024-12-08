const MyDB = require('../index');

const yamlDb = new MyDB('yaml', 'mydb.yml');  

async function testYAMLDB() {
  try {
    console.log('Testing YAML-based database...');
    
   
    console.log('Simulating table creation...');
    await yamlDb.add('users', { id: 1, name: 'Aiko Development' });
    console.log('Table (users) created successfully.');

    
    console.log('Inserting data...');
    await yamlDb.add('users', { id: 2, name: 'Another User' });
    console.log('Data inserted successfully: { id: 2, name: "Another User" }');

    console.log('Retrieving all users...');
    const users = await yamlDb.all('users');
    console.log('Data retrieved successfully:', users);

    
    console.log('Deleting data...');
    await yamlDb.delete('users');
    console.log('Table deleted. Current data:', await yamlDb.all('users'));

    console.log('YAML database test completed successfully!');
  } catch (error) {
    console.error('An error occurred (YAML):', error);
    console.error('If you need help, join our Discord server: https://discord.gg/AYRDhFpRXE');
  }
}

testYAMLDB();
