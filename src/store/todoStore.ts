import {makeAutoObservable} from "mobx";

interface ITodoItem {
  title: string;
  isDone: boolean
}

export class TodoStore{
  todos: ITodoItem[] = [{title: "mobx learn", isDone: false}, {title: 'umi4 learn', isDone: false}]
  constructor() {
    makeAutoObservable(this)
  }
  addTodo(item: ITodoItem){
    this.todos.push(item)
  }
}

export default new TodoStore();