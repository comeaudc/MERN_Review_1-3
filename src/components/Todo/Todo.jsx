import styles from './Todo.module.scss'

const Todo = ({ todo, buttonAction, buttonText }) => {
  return (
    <div className={styles.todo}>
      {todo.title}{' '}
      <button className={styles.button} onClick={() => buttonAction(todo._id)}>{buttonText}</button>
    </div>
  );
};

export default Todo;
