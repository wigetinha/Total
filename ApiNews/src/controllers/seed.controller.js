const { Profile, State, User, Category } = require('../models');

async function seed(req, res) {
  // perfiles
  const [admin] = await Profile.findOrCreate({ where: { nombre: 'Administrador' } });
  await Profile.findOrCreate({ where: { nombre: 'Contribuidor' } });

  // estados (ejemplo rápido)
  const now = new Date('1990-01-01T00:00:00Z');
  await State.findOrCreate({
    where: { nombre: 'Yucatán' },
    defaults: {
      abreviacion: 'YUC',
      activo: true,
      UserAlta: 'Admin', FechaAlta: now,
      UserMod: '', FechaMod: now,
      UserBaja: '', FechaBaja: now
    }
  });

  // categoría
  await Category.findOrCreate({
    where: { nombre: 'Salud Médica' },
    defaults: {
      descripcion: 'Noticias de salud',
      activo: true,
      UserAlta: 'Admin', FechaAlta: now,
      UserMod: '', FechaMod: now,
      UserBaja: '', FechaBaja: now
    }
  });

  // usuario admin de prueba
  await User.findOrCreate({
    where: { correo: 'admin@gmail.com' },
    defaults: {
      perfil_id: admin.id,
      nombre: 'Administrador',
      apellidos: 'General',
      nick: 'Admin',
      password: 'cursoexpressjs',
      activo: true,
      UserAlta: 'Admin', FechaAlta: now,
      UserMod: '', FechaMod: now,
      UserBaja: '', FechaBaja: now
    }
  });

  res.json({ message: 'Seed OK' });
}

module.exports = { seed };
