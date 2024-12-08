const path = require('path');
const dbAdapters = {
  json: require('./Datas/JSONDB'),
  yaml: require('./Datas/YAMLDB'),
};

class MyDB {
  constructor(type = 'json', dbPath = 'mydb.json') {
    this.type = type;
    this.dbPath = path.resolve(dbPath);

    if (!dbAdapters[type]) {
      this.logError(`Unsupported database type: ${type}`);
      throw new Error('Unsupported database type');
    }

    try {
      this.db = new dbAdapters[type](this.dbPath);
    } catch (error) {
      this.logError('Failed to initialize database', error);
    }
  }

  
  logError(message, error = null) {
    console.error(`[MyDB] ${message}`);
    if (error) console.error(error);
    console.info('Need help? Join our Discord: https://discord.gg/AYRDhFpRXE');
  }


  async perform(action, ...args) {
    try {
      return await this.db[action](...args);
    } catch (error) {
      this.logError(`Error during operation: ${action}`, error);
    }
  }

  async add(key, value) {
    return await this.perform('add', key, value);
  }

  async get(key) {
    return await this.perform('get', key);
  }

  async fetch(key) {
    return await this.perform('fetch', key);
  }

  async set(key, value) {
    return await this.perform('set', key, value);
  }

  async delete(key) {
    return await this.perform('delete', key);
  }

  async all() {
    return await this.perform('all');
  }

  async deleteAll() {
    return await this.perform('deleteAll');
  }

  async push(key, value) {
    return await this.perform('push', key, value);
  }

  async filter(callback) {
    return await this.perform('filter', callback);
  }

  async search(key, value) {
    return await this.perform('search', key, value);
  }

  async sort(key, order = 'asc') {
    return await this.perform('sort', key, order);
  }
}

module.exports = MyDB;
