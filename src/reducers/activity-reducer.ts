import { Activity } from "../types"

export type ActivityActions = 
    { type: 'save-activity', payload: {newActivity: Activity} } |
    { type: 'set-activeId', payload: {id: Activity['id']} } |
    { type: 'delete-active', payload: {id: Activity['id']} } |
    { type: 'restart-app' } 


export type activityState = {
    activities: Activity[],
    activeID: Activity['id']
}

const localStorageActivites = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : activityState = {
    activities: localStorageActivites(),
    activeID: ''
}

export const activityReducer = (
    state: activityState = initialState,
    action: ActivityActions
    ) => {
        if(action.type === 'save-activity') {
            let updatedActivities : Activity[] = []
            if (state.activeID) {
                updatedActivities = state.activities.map(activity => activity.id === state.activeID ? action.payload.newActivity : activity )
            } else {
                updatedActivities = [...state.activities, action.payload.newActivity]
            }
            return {
                ...state,
                activities: updatedActivities,
                activeID: ''
            }
        }
    if(action.type === 'set-activeId') {
        return {
            ...state,
            activeID: action.payload.id,
        }
    }
    if(action.type === 'delete-active') {
        return{
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }
    if(action.type === 'restart-app') {
        return{
            activities: [],
            activeID: ''
        }
    }
    return state
}