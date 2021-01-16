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
import { ALL_TODOS, UNCOMPLETED_TODOS } from "../constants"
import "./Home.css"

const Home = ({ todos }) => {
  const [currentPage, setCurrentPage] = useState(UNCOMPLETED_TODOS)
  const [text, setText] = useState("")

  const uncompletedTodos = todos.list.filter(todo => !todo.completed)
  const allTodos = todos.list

  const todoInput = useRef("todoInput")

  const pages = [
    { value: UNCOMPLETED_TODOS, label: "A Faire" },
    { value: ALL_TODOS, label: "Tous" },
  ]

  const handleChange = function (e) {
    setText(e.detail.value)
  }

  const handleClick = function () {
    if (text.length > 0) {
      todos.add(text)
      todoInput.current.value = ""
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSegment
            value={currentPage}
            onIonChange={e => setCurrentPage(e.detail.value)}
          >
            {pages.map(page => (
              <IonSegmentButton
                value={page.value}
                key={page.value}
                layout="icon-start"
              >
                <IonLabel>{page.label}</IonLabel>
                <IonBadge>
                  {page.value === ALL_TODOS
                    ? allTodos.length
                    : uncompletedTodos.length}
                </IonBadge>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <TodoList
          todos={currentPage === ALL_TODOS ? allTodos : uncompletedTodos}
          toggleTodo={todos.toggle}
          updateTodo={todos.update}
          removeTodo={todos.remove}
        />
        <IonFab slot="fixed" vertical="bottom" horizontal="end" edge="true">
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
