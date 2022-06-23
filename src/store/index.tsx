import count from './countStore'
import todo from './todoStore'
import type {CountStore} from './countStore'
import type {TodoStore} from './todoStore'
import {createContext} from "react";
import React from 'react'

interface IStore {
  count: CountStore;
  todo: TodoStore;
}

export const StoreContext = createContext<IStore>({} as IStore);


export const StoreProvider = ({children}:any) => {
  return <StoreContext.Provider value={{
    count,
    todo
  }}>
    {children}
  </StoreContext.Provider>
}


