const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware untuk parsing body JSON

// Data dummy orang
let orang = [
  { id: 1, name: 'Budi', age: 25 },
  { id: 2, name: 'Ani', age: 30 }
];

// GET semua orang
app.get('/api/orang', (req, res) => {
  res.status(200).json(orang);
});

// GET orang berdasarkan ID
app.get('/api/orang/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = orang.find(o => o.id === id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: 'Orang tidak ditemukan' });
  }
});

// POST tambah orang baru
app.post('/api/orang', (req, res) => {
  const { name, age } = req.body;
  if (!name || age === undefined) {
    return res.status(400).json({ message: 'Data tidak lengkap. Name dan age harus diisi.' });
  }

  const id = orang.length > 0 ? orang[orang.length - 1].id + 1 : 1;
  const newPerson = { id, name, age };
  orang.push(newPerson);

  res.status(201).json(newPerson);
});

// PUT ubah seluruh data orang
app.put('/api/orang/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = orang.findIndex(o => o.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Orang tidak ditemukan' });
  }

  const { name, age } = req.body;
  if (!name || age === undefined) {
    return res.status(400).json({ message: 'Name dan age harus diisi.' });
  }

  orang[index] = { id, name, age };
  res.status(200).json(orang[index]);
});

// PATCH ubah sebagian data orang
app.patch('/api/orang/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = orang.find(o => o.id === id);
  if (!person) {
    return res.status(404).json({ message: 'Orang tidak ditemukan' });
  }

  const { name, age } = req.body;
  if (name !== undefined) person.name = name;
  if (age !== undefined) person.age = age;

  res.status(200).json(person);
});

// DELETE hapus data orang
app.delete('/api/orang/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = orang.findIndex(o => o.id === id);
  if (index !== -1) {
    const removed = orang.splice(index, 1)[0];
    res.status(200).json({ message: 'Data orang berhasil dihapus', data: removed });
  } else {
    res.status(404).json({ message: 'Orang tidak ditemukan' });
  }
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan server' });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
