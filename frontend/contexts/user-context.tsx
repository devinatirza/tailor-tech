import { createContext, useContext, useState } from "react";
import { IUser } from "../interfaces/user-interfaces";
import axios from "axios";

const userContext = createContext({} as any)

type ContentLayout = {
    children: JSX.Element
}

export function UserProvider({children}: ContentLayout){
    const [user, setUser] = useState<IUser|null>(null)

    async function login(email: string, pass: string){
        try{
            const response = await axios.post("http://localhost:8000/login", {
                email: email,
                pass: pass
            })

            if(response.status === 200){
                setUser(response.data)
                return ''
            }
            else{
                return 'An error occured.'
            }
        } catch(error){
            return error.response?.data.error
        }
    }

    const data = {user, login}

    return <userContext.Provider value={data}>{children}</userContext.Provider>
}

export function useUser(){
    return useContext(userContext)
}