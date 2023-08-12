import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationAdd, notificationRemove } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(notificationAdd(`Anecdote added: ${content}`))
        setTimeout(() => {
            dispatch(notificationRemove())
        }, 5000)
    }

    return (
        <div>
            <h2>Create Anecdote</h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote'/>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
