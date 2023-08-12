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
export default notificationSlice.reducer
