const TaskController = require('../../controllers/TaskController');
module.exports = (app) => {
  app.get('/tasks', TaskController.getTasks);
  app.post('/tasks', TaskController.createTask);
  app.patch('/tasks', TaskController.updateTask);
  app.delete('/tasks', TaskController.deleteTask);
  app.post('/tasks/move', TaskController.moveTask);
};
