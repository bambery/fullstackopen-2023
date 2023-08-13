import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        updateAnecdote(state, action) {
            const id = action.payload.id
            const updatedAnecdote = action.payload
            return state.map(anecdote =>
                anecdote.id !== id
                ? anecdote
                : updatedAnecdote
            )
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const incrementVote = (id, anecdoteVotes) => {
    return async dispatch => {
        const resChangedAnecdote = await anecdoteService.updateAnecdote(id, { votes: anecdoteVotes + 1 })
        dispatch(updateAnecdote(resChangedAnecdote))
    }
}

export default anecdoteSlice.reducer
