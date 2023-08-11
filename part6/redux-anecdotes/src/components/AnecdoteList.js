import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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

    return (
        <div>
            {filteredAnecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <Anecdote
                    anecdote={anecdote}
                    key={anecdote.id}
                    handleClick={() =>
                        dispatch(addVote(anecdote.id))
                    }/>
            )}
        </div>
    )
}

export default AnecdoteList
