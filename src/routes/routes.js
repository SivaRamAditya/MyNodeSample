var studentsMock = require("../mock-response/mockstudents");
var router = function (app) {
  app.get("/", function (req, res) {
    var students = studentsMock.getStudents();
    res.send(students);
  });

  app.get("/students", function (req, res) {
    var students = studentsMock.getStudents();
    res.send(students);
  });

  app.get("/students/:id", function (req, res) {
    var students = studentsMock.getStudents();
    var temp = {};
    for (var index = 0; index < students.length; index++) {
      if (students[index].id === req.params.id) {
        temp = students[index];
        break;
      }
    }
    res.send(temp);
  });

  app.post("/students", function (req, res) {
    var result = studentsMock.saveStudent(req.body);
    if (result) {
      res.send("Saved Successfully");
    } else {
      res.send("Unable to save");
    }
  });

  app.delete("/students", function (req, res) {
    var result = studentsMock.deleteStudent(req.query.id);
    if (result) {
      res.send("Deleted Successfully");
    } else {
      res.send("Unable to delete");
    }
  });

  app.put("/students", function (req, res) {
    var result = studentsMock.updateStudent(req.body);
    res.send(result);
  });
};

module.exports = router;
