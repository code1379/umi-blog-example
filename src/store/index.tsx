import count from './countStore'
import todo from './todoStore'
import userStore from './userStore'
import type {CountStore} from './countStore'
import type {TodoStore} from './todoStore'
import type {UserStore} from './userStore';

import {createContext} from "react";
import React from 'react'

interface IStore {
  count: CountStore;
  todo: TodoStore;
  userStore: UserStore;
}

export const StoreContext = createContext<IStore>({} as IStore);


export const StoreProvider = ({children}:any) => {
  return <StoreContext.Provider value={{
    count,
    todo,
    userStore,
  }}>
    {children}
  </StoreContext.Provider>
}


