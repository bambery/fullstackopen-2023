import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { notificationAdd, notificationRemove } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const filteredAnecdotes = useSelector(state => {
        if (state.filter.length === 0) {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const increaseVote = id => {
        const anecdote = filteredAnecdotes.find(anecdote => anecdote.id === id)
        dispatch(notificationAdd(`You voted for '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(notificationRemove())
        }, 5000)
        dispatch(incrementVote(anecdote.id, anecdote.votes))
    }

    return (
        <div>
            {[...filteredAnecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <Anecdote
                    anecdote={anecdote}
                    key={anecdote.id}
                        handleClick={() => increaseVote(anecdote.id) }/>
            )}
        </div>
    )
}

export default AnecdoteList
