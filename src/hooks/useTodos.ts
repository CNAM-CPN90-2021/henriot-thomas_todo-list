import { useEffect, useState } from "react"
import { useStorage } from "@ionic/react-hooks/storage"
import { ALL_TODOS, COMPLETED_TODOS, UNCOMPLETED_TODOS } from "../constants"

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
    const id = Math.max(...list.map(todo => todo.id)) + 1 ?? 1
    const newTodos = [...list, { id, label, completed: false }]

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
    const { completed = true } = list.find(todo => todo.id === id)
    update(id, { completed: !completed })
  }

  const clear = function (type: string = ALL_TODOS) {
    let newTodos = []
    switch (type) {
      case COMPLETED_TODOS:
        newTodos = list.filter(todo => !todo.completed)
        break
      case UNCOMPLETED_TODOS:
        newTodos = list.filter(todo => todo.completed)
        break
      case ALL_TODOS:
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
