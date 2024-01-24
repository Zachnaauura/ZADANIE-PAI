import express, { Request, Response } from 'express'

const todosRouter = express.Router()

type Todo = {
  id: string
  title: string
  isCompleted: boolean
  userId: string
  createdAt: string
}

const todos: Todo[] = [
  {
    id: '1',
    title: 'Learn TS',
    createdAt: '2021-10-01',
    isCompleted: false,
    userId: '1'
  },
  {
    id: '3',
    title: 'Learn Node',
    createdAt: '2022-10-01',
    isCompleted: true,
    userId: '1'
  },
  {
    id: '2',
    title: 'Learn JS',
    createdAt: '2022-10-01',
    isCompleted: true,
    userId: '1'
  }
]

todosRouter.get('/', (request: Request, response: Response) => {
  const sort = request.query.sort

  if (sort) {
    if (sort === 'DESC' || sort === 'ASC') {
      const sortedTodos = todos.sort((a, b) => {
        if (a.id < b.id) {
          return sort === 'DESC' ? 1 : -1
        } else if (a.id > b.id) {
          return sort === 'DESC' ? -1 : 1
        } else {
          return 0
        }
      })
      return response.send(sortedTodos)
    }

    return response.status(400).send({ message: 'Invalid sort value' })
  }

  return response.send(todos)
})

todosRouter.get('/:id', (request: Request, response: Response) => {
  const { id } = request.params

  const todo = todos.find((todo) => todo.id === id)

  if (!todo) {
    return response.status(404).send({ message: 'Todo not found' })
  }

  return response.send(todo)
})

export { todosRouter }