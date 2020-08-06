var studentList = [
  { name: 'Student1', id: 1, age: 10},
  { name: 'Student2', id: 2, age: 10},
  { name: 'Student3', id: 3, age: 10},
  { name: 'Student4', id: 4, age: 9},
  { name: 'Student5', id: 5, age: 11},
  { name: 'Student6', id: 6, age: 10},
  { name: 'Student7', id: 7, age: 9},];

var getStudents = function() {
   return studentList;
}

var saveStudent = function(student) {
   if (student) {
     student.id = studentList.length + 1;
     studentList.push(student);
     return true;
   }
   else return false;
}

var updateStudent = function(student) {
  var message = '';
  if (student) {
    for(var index= 0; index < studentList.length; index++) {
      if (studentList[index].id == student.id) {
         studentList[index].name = student.name;
         studentList[index].age = student.age;
         message = 'Data saved successfully';
         break;
      }
    } 
  }
  if (!message) {
    message = 'Unable to update the student data';
  }
  return message;
}

var deleteStudent = function(id) {
  var result = false;
  for(var index= 0; index < studentList.length; index++) {
      if (studentList[index].id == id) {
         studentList.splice(index,1);
         result = true;
         break;
      }
    }
  return result;
}

module.exports =  {
  getStudents: getStudents,
  saveStudent: saveStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent
};