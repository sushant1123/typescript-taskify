import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../models/models";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(todos.map((td) => (td.id === id ? { ...td, isDone: !td.isDone } : td)));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((td) => td.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit((prev) => !prev);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon">
              <AiFillDelete onClick={() => handleDelete(todo.id)} />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
