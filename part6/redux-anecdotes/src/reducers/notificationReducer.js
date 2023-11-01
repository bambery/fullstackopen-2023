import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationAdd(state, action) {
            return action.payload
        },
        notificationRemove(state, action) {
            return ''
        }
    }
})

export const { notificationAdd, notificationRemove } = notificationSlice.actions

export const setNotification = (content, timeToDisplay = 5) => {
    return async dispatch => {
        dispatch(notificationAdd(content))
        setTimeout(() => {
            dispatch(notificationRemove())
        }, timeToDisplay * 1000)
    }
}

export default notificationSlice.reducer
