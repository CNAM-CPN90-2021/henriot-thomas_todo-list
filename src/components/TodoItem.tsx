import {
  IonInput,
  IonCheckbox,
  IonItem,
  IonButton,
  IonIcon,
  IonButtons,
} from "@ionic/react"
import { pencil, checkmark, removeCircle } from "ionicons/icons"
import React, { useRef, useState } from "react"
import { Todo } from "../hooks/useTodos"

export const TodoItem = ({
  todo,
  toggleTodo,
  updateTodo,
  removeTodo,
}: {
  todo: Todo
  toggleTodo: Function
  updateTodo: Function
  removeTodo: Function
}) => {
  const [text, setText] = useState(todo.label)
  const [edition, setEdition] = useState(false)
  const todoInput = useRef<HTMLIonInputElement>(null)

  const handleClick = async function () {
    const input = await todoInput.current?.getInputElement()
    if (edition) {
      if (text.length > 0) {
        updateTodo(todo.id, { label: text })
        setEdition(false)
        todoInput.current?.blur()
      }
    } else {
      setEdition(true)
      input?.focus()
      input?.select()
    }
  }

  const handleFocus = function () {
    if (!edition) {
      toggleTodo(todo.id)
      todoInput.current?.setBlur()
    }
  }

  const handleChange = function (e: CustomEvent) {
    setText(e.detail.value)
  }

  return (
    <IonItem>
      <IonCheckbox
        checked={todo.completed}
        slot="start"
        onIonChange={e => toggleTodo(todo.id)}
      />
      <IonInput
        ref={todoInput}
        type="text"
        inputMode="text"
        value={text}
        readonly={!edition}
        onIonChange={handleChange}
        /*
          attention on ne veut pas forcément preventDefault() ici
          ex: appui sur tab, flèches, etc.
        */
        onKeyUp={e => (e.key === "Enter" ? handleClick() : e.preventDefault())}
        onFocus={handleFocus}
      />
      <IonButtons slot="end">
        <IonButton fill="clear" size="large" onClick={handleClick}>
          <IonIcon
            icon={edition ? checkmark : pencil}
            color="primary"
            slot="icon-only"
          />
        </IonButton>
        <IonButton
          fill="clear"
          size="large"
          onClick={() => removeTodo(todo.id)}
        >
          <IonIcon icon={removeCircle} color="danger" slot="icon-only" />
        </IonButton>
      </IonButtons>
    </IonItem>
  )
}
