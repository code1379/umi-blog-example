import React, {useContext} from 'react'
import {makeAutoObservable,  toJS} from "mobx";
import {StoreContext, StoreProvider} from "@/store";
import {observer} from "mobx-react";
class Todo {
  title = 'test'
  done = true
  constructor() {
    makeAutoObservable(this)
  }
}

// 子组件
const GridRow = observer(({data}: {data: Todo}) => {
  console.log("data", data);
  const store = useContext(StoreContext);
  console.log("store", store)
  return (
  <>
    <div>Grid Row</div>
    <div>title: {data.title} - {data.done ? 'done': 'not-done'}</div>
    <hr/>
    <div>{store.count.count}</div><button onClick={() => store.count.increment()}>+</button>
    <div>{JSON.stringify(store.todo.todos)}</div><button onClick={() => store.todo.addTodo({
    title: new Date().toDateString(),
    isDone: false
  })}>add Todos</button>

  </>
  )
})

const Page = ({todo}: {todo: Todo}) => {
  return <>
    <h1>Page Login</h1>
    <GridRow data={toJS(todo)}/>
    {/*<GridRow data={todo}/>*/}
  </>
}

// Main 是父组件
const Main = () => {
  return <StoreProvider>
    <Page todo={new Todo()}/>
  </StoreProvider>
}

export default  Main