import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = 'https://api.github.com/'
const GITHUB_TOKEN = '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'


export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos:[],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //get initial users (testing purposes)
    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q: text

        })

    const response = await fetch(`${'https://api.github.com/'}/search/users?${params}`,{
        headers:{
            Authorization: `token ${'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'}`
        }
    })
    const { items } = await response.json()

    dispatch({
        type: 'GET_USERS',
        payload: items,
    })
}


    const getUser = async (login) => {
        setLoading()

    const response = await fetch(`${GITHUB_URL}/search/users/${login}/repos?${'params'}`,{
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    const data = await response.json()

    dispatch({
        type: 'GET_REPOS',
        payload: data,
    })
}

//clear users
const clearUsers = () => dispatch({ type: 'CLEAR_USERS'})

//Set Loading
const setLoading = () => dispatch({ type:'SET_LOADING'})

return (
<GithubContext.Provider 
  value={{
    users: state.users,
    loading: state.loading,
    user: state.user,
    repos: state.repos,
    searchUsers,
    clearUsers,
    getUser,
    
   
}}>

    {children}
</GithubContext.Provider>)

}


export default GithubContext