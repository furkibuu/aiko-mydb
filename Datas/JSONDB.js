const fs = require('fs').promises;
const path = require('path');

class JSONDB {
  constructor(dbPath = 'data.json') {
    this.dbPath = dbPath;
    this.backupPath = `${dbPath}.backup`;
    this.data = {};
    this._load();
  }


  logError(message, error) {
    console.error(`[JSONDB Error] ${message}`);
    if (error) console.error(error);
  }


  async _fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }


  async _load() {
    try {
      if (await this._fileExists(this.dbPath)) {
        const fileContent = await fs.readFile(this.dbPath, 'utf8');
        this.data = JSON.parse(fileContent) || {};
      } else {
        await this._save(); 
      }
    } catch (error) {
      this.logError('Error loading database. Resetting data.', error);
      this.data = {};
      await this._save();
    }
  }


  async _save() {
    try {

      await fs.writeFile(this.backupPath, JSON.stringify(this.data, null, 2));
    
      await fs.writeFile(this.dbPath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      this.logError('Error saving database file', error);
    }
  }


  async add(key, value) {
    if (this.data[key] !== undefined) {
      throw new Error(`Key "${key}" already exists.`);
    }
    this.data[key] = value;
    await this._save();
    return this.data[key];
  }

  get(key) {
    return this.data[key];
  }

  async set(key, value) {
    this.data[key] = value;
    await this._save();
    return this.data[key];
  }

  
  async delete(key) {
    if (!this.data[key]) {
      throw new Error(`Key "${key}" does not exist.`);
    }
    delete this.data[key];
    await this._save();
    return true;
  }

  
  all() {
    return { ...this.data }; // Güvenlik için kopya döndür
  }

  async deleteAll() {
    this.data = {};
    await this._save();
  }

  async push(key, value) {
    if (!this.data[key]) {
      this.data[key] = [];
    }
    if (!Array.isArray(this.data[key])) {
      throw new TypeError(`Value at key "${key}" is not an array.`);
    }
    this.data[key].push(value);
    await this._save();
    return this.data[key];
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }

  filter(callback) {
    return Object.entries(this.data).filter(([key, value]) => callback(key, value));
  }


  async restoreFromBackup() {
    try {
      if (await this._fileExists(this.backupPath)) {
        const backupContent = await fs.readFile(this.backupPath, 'utf8');
        this.data = JSON.parse(backupContent) || {};
        await this._save();
        console.log('Database restored from backup.');
        return true;
      } else {
        console.warn('No backup file found.');
        return false;
      }
    } catch (error) {
      this.logError('Failed to restore from backup', error);
      return false;
    }
  }
}

module.exports = JSONDB;
