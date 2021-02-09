import { useEffect, useState } from "react"
import { useStorage } from "@ionic/react-hooks/storage"
import { TODOS_TYPE } from "../constants"

const TODOS_STORAGE = "todos"

export const useTodos = function () {
  const { get, set } = useStorage()
  const [list, setList] = useState<Todo[]>([])

  useEffect(() => {
    const loadSaved = async () => {
      const todosString = await get(TODOS_STORAGE)
      const todos = (todosString ? JSON.parse(todosString) : []) as Todo[]
      setList(todos)
    }
    loadSaved()
  }, [get, set])

  const add = function (label: string) {
    let id = -1
    if (list.length > 0) {
      const ids = list.map(({ id }) => id)
      id = Math.max(...ids)
    }
    const newTodos = [...list, { id: id + 1, label, completed: false }]

    setList(newTodos)
    set(TODOS_STORAGE, JSON.stringify(newTodos))
  }

  const remove = function (id: number) {
    const newTodos = list.filter(todo => todo.id !== id)

    setList(newTodos)
    set(TODOS_STORAGE, JSON.stringify(newTodos))
  }

  const update = function (
    id: number,
    update: { label?: string; completed?: boolean }
  ) {
    const newTodos = list.map(todo => {
      if (id === todo.id) return { ...todo, ...update }
      return todo
    })

    setList(newTodos)
    set(TODOS_STORAGE, JSON.stringify(newTodos))
  }

  const toggle = function (id: number) {
    const todo = list.find(todo => todo.id === id)
    if (typeof todo != "undefined") {
      update(id, { completed: !todo.completed })
    }
  }

  const clear = function (type: string = TODOS_TYPE.ALL) {
    let newTodos: Todo[] = []
    switch (type) {
      case TODOS_TYPE.COMPLETED:
        newTodos = list.filter(todo => !todo.completed)
        break
      case TODOS_TYPE.UNCOMPLETED:
        newTodos = list.filter(todo => todo.completed)
        break
      case TODOS_TYPE.ALL:
      default:
        newTodos = []
        break
    }
    setList(newTodos)
    set(TODOS_STORAGE, JSON.stringify(newTodos))
  }

  return { list, add, remove, update, toggle, clear }
}

export interface Todo {
  id: number
  label: string
  completed?: boolean
}
