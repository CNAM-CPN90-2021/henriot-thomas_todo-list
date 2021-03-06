import { IonList, IonText } from "@ionic/react"
import React, { Fragment } from "react"
import { Todo } from "../hooks/useTodos"
import { TodoItem } from "./TodoItem"

export const TodoList = ({
  todos,
  toggleTodo,
  updateTodo,
  removeTodo,
}: {
  todos: Todo[]
  toggleTodo: Function
  updateTodo: Function
  removeTodo: Function
}) => {
  if (todos.length === 0)
    return (
      <IonText>
        <span>Bravo, vous n'avez rien à faire !</span>
      </IonText>
    )
  return (
    <Fragment>
      <IonList>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
          />
        ))}
      </IonList>
    </Fragment>
  )
}
