# MyDB

MyDB is a Node.js module that supports JSON and YAML database formats, providing an easy-to-use API for data storage and management.

## Features

- Supports JSON and YAML database formats.
- Key-value-based data operations.
- Add, update, delete, and filter data easily.
- Centralized error reporting system.
- Extendable structure to support new database types.

## Installation

1. Clone or download this repository:

   ```bash
   git clone https://github.com/furkibuu/mydb.git
   ```

2. Install the required dependencies:

```bash
npm install mydb
```

3. Integrate the module into your project.

## Usage

### Basic Setup

```js
const MyDB = require('./MyDB');

// Initialize MyDB
const db = new MyDB('yaml', './data/mydb.yaml');

// Add data
await db.add('user1', { name: 'Furkan', age: 18 });

// Get data
const user = await db.get('user1');
console.log(user); // { name: 'Furkan', age: 18 }

// Update data
await db.set('user1', { name: 'Sedef', age: 18 });

// List all data
const allData = await db.all();
console.log(allData);

// Delete data
await db.delete('user1');
```

### Supported Operations

| Operation   | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `add`       | Adds a new key-value pair.                                                 |
| `get`       | Retrieves the value of a specified key.                                    |
| `fetch`     | Same as `get`, added for flexibility.                                      |
| `set`       | Updates the value of a specified key.                                      |
| `delete`    | Deletes a specified key.                                                   |
| `all`       | Retrieves all stored data.                                                 |
| `deleteAll` | Deletes all stored data.                                                   |
| `push`      | Appends a value to a key that stores an array (automatically creates an array if none exists). |
| `filter`    | Filters data based on a callback condition.                                |
| `search`    | Searches for a specific key-value match.                                   |
| `sort`      | Sorts the data by a specified key in ascending (`asc`) or descending (`desc`) order. |


## Switching Between YAML and JSON

You can choose the database format by passing the type parameter during initialization: 

```js
// Using JSON
const dbJSON = new MyDB('json', './data/mydb.json');

// Using YAML
const dbYAML = new MyDB('yaml', './data/mydb.yaml');
```

## Error Handling

The module logs errors with detailed information and offers guidance for troubleshooting. If you need further support, you can join the provided Discord server:

```bash
[MyDB] Error during operation: get
Need help? Join our Discord: https://discord.gg/AYRDhFpRXE
```

## Requirements

- Node.js 14.x or higher.

- Dependencies such as YAML and fs.

## Development

- To contribute to this project, follow these steps:

1. Clone the repository.

2. Add new database adapters by defining a new class in the dbAdapters object.

3. Add new operations by implementing additional methods in the MyDB class. 

# License 

- This project is licensed under the MIT License. See the LICENSE file for more details.

# Support 

- If you encounter any issues or have suggestions, please create a GitHub issue or join our Discord server.

