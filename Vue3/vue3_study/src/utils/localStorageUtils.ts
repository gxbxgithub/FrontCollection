import { Todo } from '../types/todo'
// 保存数据到缓存
export function saveTodos(todos: Todo[]) {
  localStorage.setItem('todos_key', JSON.stringify(todos))
}
// 缓存读取数据
export function readTodos(): Todo[] {
  return JSON.parse(localStorage.getItem('todos_key') || '[]')
}