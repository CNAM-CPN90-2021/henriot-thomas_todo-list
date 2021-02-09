import {
  IonBadge,
  IonFabButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  IonFab,
} from "@ionic/react"
import { addOutline } from "ionicons/icons"
import React, { useState, useRef } from "react"
import { TodoList } from "../components/TodoList"
import { TODOS_TYPE } from "../constants"
import { Todo } from "../hooks/useTodos"
import "./Home.css"

const Home = ({
  todos,
}: {
  todos: {
    list: Todo[]
    add: Function
    remove: Function
    toggle: Function
    update: Function
  }
}) => {
  const [currentPage, setCurrentPage] = useState(TODOS_TYPE.UNCOMPLETED)
  const [text, setText] = useState("")

  const completedTodos = todos.list.filter((todo: Todo) => todo.completed)
  const uncompletedTodos = todos.list.filter((todo: Todo) => !todo.completed)
  const allTodos = todos.list

  const todoInput = useRef<HTMLIonInputElement>(null)

  const pages = [
    { value: TODOS_TYPE.ALL, label: "Tous" },
    { value: TODOS_TYPE.UNCOMPLETED, label: "A Faire" },
    { value: TODOS_TYPE.COMPLETED, label: "Fait" },
  ]

  const handleChange = function (e: CustomEvent) {
    setText(e.detail.value)
  }

  const handleClick = function () {
    if (text.length > 0) {
      todos.add(text)
      if (todoInput.current !== null) todoInput.current.value = ""
    }
  }

  const handleChangePage = function (e: CustomEvent) {
    setCurrentPage(e.detail.value)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSegment value={currentPage} onIonChange={handleChangePage}>
            {pages.map(page => (
              <IonSegmentButton
                value={page.value}
                key={page.value}
                layout="icon-start"
              >
                <IonLabel>{page.label}</IonLabel>
                <IonBadge>
                  {page.value === TODOS_TYPE.ALL
                    ? allTodos.length
                    : page.value === TODOS_TYPE.COMPLETED
                    ? completedTodos.length
                    : uncompletedTodos.length}
                </IonBadge>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <TodoList
          todos={
            currentPage === TODOS_TYPE.ALL
              ? allTodos
              : currentPage === TODOS_TYPE.COMPLETED
              ? completedTodos
              : uncompletedTodos
          }
          toggleTodo={todos.toggle}
          updateTodo={todos.update}
          removeTodo={todos.remove}
        />
        <IonFab slot="fixed" vertical="bottom" horizontal="end" edge={true}>
          <IonFabButton onClick={handleClick} disabled={text.length === 0}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>

      <IonFooter>
        <IonInput
          ref={todoInput}
          type="text"
          placeholder="Avez-vous quelque chose à faire ?"
          onIonChange={handleChange}
        />
      </IonFooter>
    </IonPage>
  )
}

export default Home
