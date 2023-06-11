const todos = require("../../data/db.json");

exports.handler = async (event, context) => {
    const { httpMethod, body } = event;
  
    if (httpMethod === 'GET') {
      // Handle GET request
      return {
        statusCode: 200,
        body: JSON.stringify(todos),
      };
    } else if (httpMethod === 'POST') {
      // Handle POST request
      const newTodo = JSON.parse(body);
      // Assuming each new todo has a unique ID
      todos.notes.push(newTodo);
      return {
        statusCode: 201,
        body: JSON.stringify(newTodo),
      };
    }else if (httpMethod === 'DELETE') {
        // Handle DELETE request
        const todoId = JSON.parse(body).id; // Assuming each todo has an 'id' field
        const todoIndex = todos.notes.findIndex((todo) => todo.id === todoId);
    
        if (todoIndex === -1) {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Todo not found' }),
          };
        }
    
        // Remove the todo from the array
        const deletedTodo = todos.notes.splice(todoIndex, 1)[0];
    
        return {
          statusCode: 200,
          body: JSON.stringify(deletedTodo),
        };
      } else if (httpMethod === 'PATCH' || httpMethod === 'PUT') {
      // Handle PATCH or PUT request
      const updatedTodo = JSON.parse(body);
      const todoId = updatedTodo.id; // Assuming each todo has an 'id' field
      const existingTodo = todos.notes.find((todo) => todo.id === todoId);
  
      if (!existingTodo) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Todo not found' }),
        };
      }
  
      // Update the existing todo with the new data
      Object.assign(existingTodo, updatedTodo);
  
      return {
        statusCode: 200,
        body: JSON.stringify(existingTodo),
      };
    } else {
      // Handle unsupported HTTP methods
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
    }
  };