import Todo from '../Todo/Todo';
import styles from './TodoList.module.scss'

const TodoList = ({
  newTodo,
  createTodo,
  setNewTodo,
  todos,
  completedTodos,
  moveToCompleted,
  deleteTodo,
}) => {
  return (
    <div className={styles.todoList}>
      Add New Todo:
      <input
      className={styles.input}
        type='text'
        value={newTodo.title}
        onChange={(e) => {
          setNewTodo({ ...newTodo, title: e.target.value });
        }}
        onKeyDown={(e) => {
          e.key === 'Enter' && createTodo();
        }}
      />
      <h3>Todos</h3>
      {todos.map((el) => {
        return (
          <Todo
            key={el._id}
            todo={el}
            buttonAction={moveToCompleted}
            buttonText={'Complete'}
          />
        );
      })}
      <h3>Completed Todos:</h3>
      {completedTodos.map((el) => {
        return (
          <Todo
            key={el._id}
            todo={el}
            buttonAction={deleteTodo}
            buttonText={'Delete'}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
