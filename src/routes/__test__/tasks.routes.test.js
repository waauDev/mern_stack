// src/routes/__test__/tasks.routes.test.js
import { jest } from '@jest/globals'

// 🔹 Mockear middleware de autenticación
jest.unstable_mockModule('../../middlewares/validateToken.js', () => ({
  authRequired: (req, res, next) => next()
}));

// 🔹 Mockear controladores
jest.unstable_mockModule('../../controllers/task.controller.js', () => ({
  getTasks: (req, res) => res.status(200).json([]),
  createTask: (req, res) => res.status(400).json({ error: 'faltan datos' }),
  getTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTask: jest.fn()
}));

// 🔹 Importar dependencias después del mock
const request = (await import('supertest')).default;
const app = (await import('../../app.js')).default;

describe('Rutas de /task', () => {
  it('GET /tasks debe responder con 200', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // []
  });

  it('POST /task sin datos debe fallar', async () => {
  const res = await request(app)
    .post('/api/task')
    .send({});

  expect(res.statusCode).toBe(400);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});
});
