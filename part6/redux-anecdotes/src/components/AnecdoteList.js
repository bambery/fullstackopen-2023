import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div key={anecdote.id}>
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
    const sortedAnecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    return (
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                anecdote={anecdote}
                handleClick={() =>
                    dispatch(addVote(anecdote.id))
                }/>
            )}
        </div>
    )
}

export default AnecdoteList
