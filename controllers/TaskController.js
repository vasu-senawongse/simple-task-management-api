const fs = require("fs");

module.exports = {
  index(req, res) {
    res.send("LOEI-A6 API V 1.0.0");
  },
  async getTasks(req, res) {
    try {
      const tasks = await sql.query(
        "SELECT * FROM tasks ORDER BY id"
      );
      const response = {
        backlog: tasks.filter(i => i.status == 'BACKLOG'),
        todo: tasks.filter(i => i.status == 'TODO'),
        doing: tasks.filter(i => i.status == 'DOING'),
        readyToTest: tasks.filter(i => i.status == 'READYTOTEST'),
        testing: tasks.filter(i => i.status == 'TESTING'),
        done: tasks.filter(i => i.status == 'DONE')
      }
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  async createTask(req, res) {
    try {
      const payload = req.body;
      await sql.query("INSERT INTO tasks (title,status) VALUES (?,?)", [payload.title, payload.status])
      res.json(true);
    } catch (error) {
      console.log(error);
    }
  },

  async updateTask(req, res) {
    try {
      const payload = req.body;
      await sql.query("UPDATE tasks SET title = ? WHERE id = ?", [payload.title, payload.id])
      res.json(true);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteTask(req, res) {
    try {
      const payload = req.body;
      await sql.query("DELETE FROM tasks WHERE id = ?", [payload.id])
      res.json(true);
    } catch (error) {
      console.log(error);
    }
  },

  async moveTask(req, res) {
    try {
      const tasks = req.body.tasks;
      await sql.query("ALTER TABLE tasks AUTO_INCREMENT 1")
      await sql.query("TRUNCATE TABLE tasks")
      if (tasks.backlog.length > 0) {
        await sql.query("INSERT INTO tasks (title,status) VALUES ?", [tasks.backlog.map(item => [item.title, 'BACKLOG'])])
      }

      if (tasks.todo.length > 0) {
        await sql.query("INSERT INTO tasks (title,status) VALUES ?", [tasks.todo.map(item => [item.title, 'TODO'])])
      }
      if (tasks.doing.length > 0) {
        await sql.query("INSERT INTO tasks (title,status) VALUES ?", [tasks.doing.map(item => [item.title, 'DOING'])])
      }
      if (tasks.readyToTest.length > 0) {
        await sql.query("INSERT INTO tasks (title,status) VALUES ?", [tasks.readyToTest.map(item => [item.title, 'READYTOTEST'])])
      }
      if (tasks.testing.length > 0) {
        await sql.query("INSERT INTO tasks (title,status) VALUES ?", [tasks.testing.map(item => [item.title, 'TESTING'])])
      }
      if (tasks.done.length > 0) {
        await sql.query("INSERT INTO tasks (title,status) VALUES ?", [tasks.done.map(item => [item.title, 'DONE'])])
      }
      res.json(true);
    } catch (error) {
      console.log(error);
    }
  },
};
