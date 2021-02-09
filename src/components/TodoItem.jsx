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

export const TodoItem = ({ todo, toggleTodo, updateTodo, removeTodo }) => {
  const [text, setText] = useState(todo.label)
  const [edition, setEdition] = useState(false)
  const todoInput = useRef(`todo-input-${todo.id}`)

  const handleClick = async function () {
    const input = await todoInput.current.getInputElement()
    if (edition) {
      if (text.length > 0) {
        updateTodo(todo.id, { label: text })
        setEdition(false)
        todoInput.current.blur()
      }
    } else {
      setEdition(true)
      input.focus()
      input.select()
    }
  }

  const handleFocus = function (e) {
    if (!edition) {
      toggleTodo(todo.id)
      todoInput.current.setBlur()
    }
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
        onIonChange={e => setText(e.detail.value)}
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
