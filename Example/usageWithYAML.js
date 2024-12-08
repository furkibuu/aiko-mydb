const YAMLDB = require('./YAMLDB');

(async () => {
  const db = new YAMLDB('./database.yaml'); // YAML dosyası için yol

  try {
    // Yeni veri ekleme
    await db.add('user1', { name: 'Furkan', age: 19 });
    console.log('User added:', db.get('user1'));

    // Veri güncelleme veya oluşturma
    await db.set('user2', { name: 'Ayşe', age: 21 });
    console.log('User updated:', db.get('user2'));

    // Array'e veri ekleme
    await db.push('tasks', 'Learn YAML');
    await db.push('tasks', 'Build a YAML-based project');
    console.log('Tasks:', db.get('tasks'));

    // Anahtar kontrolü
    console.log('Has user1:', db.get('user1') !== undefined); // true

    // Filtreleme
    const adults = Object.entries(db.all()).filter(([key, value]) => value.age >= 18);
    console.log('Adults:', adults);

    // Yedekten geri yükleme
    const restored = await db.restoreFromBackup();
    if (restored) {
      console.log('Data restored from backup:', db.all());
    }

    // Veri silme
    await db.delete('user1');
    console.log('User1 deleted.');

    // Tüm verileri alma
    console.log('All data:', db.all());

    // Tüm verileri silme
    await db.deleteAll();
    console.log('Database cleared.');

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
