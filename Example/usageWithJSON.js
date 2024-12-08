const JSONDB = require('./JSONDB');

(async () => {
  const db = new JSONDB('./database.json');

  try {
    // Yeni veri ekleme
    await db.add('user1', { name: 'Furkan', age: 19 });
    console.log('User added:', db.get('user1'));

    // Veri güncelleme veya oluşturma
    await db.set('user2', { name: 'Ayşe', age: 21 });
    console.log('User updated:', db.get('user2'));

    // Array'e veri ekleme
    await db.push('tasks', 'Learn JavaScript');
    await db.push('tasks', 'Build a project');
    console.log('Tasks:', db.get('tasks'));

    // Anahtar kontrolü
    console.log('Has user1:', db.has('user1')); // true

    // Filtreleme
    const adults = db.filter((key, value) => value.age >= 18);
    console.log('Adults:', adults);

    // Yedekten geri yükleme
    const restored = await db.restoreFromBackup();
    if (restored) {
      console.log('Data restored:', db.all());
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
