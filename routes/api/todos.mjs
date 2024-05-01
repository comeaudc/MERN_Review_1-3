import express from 'express';
const router = express.Router();
import todoCTRL from '../../controllers/api/todos.mjs';

//Index /api/todos
router.get('/', todoCTRL.indexNotComplete, todoCTRL.jsonTodos);
//Index /api/todos/completed
router.get('/completed', todoCTRL.indexComplete, todoCTRL.jsonTodos);
//Delete /api/todos/:id
router.delete('/:id', todoCTRL.destroy, todoCTRL.jsonTodo);
//Update /api/todos/:id
router.put('/:id', todoCTRL.update, todoCTRL.jsonTodo);
//Create /api/todos
router.post('/', todoCTRL.create, todoCTRL.jsonTodo);
//Show /api/todos/:id
router.get('/:id', todoCTRL.show, todoCTRL.jsonTodo);

export default router;
