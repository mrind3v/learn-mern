There are three important concepts in React redux toolkit

1. *Store* - manages the global state of our app - stores all the states accross all compnts. Store is made up of slices -> These refer to states belonging to a certain domain --> eg - user slice stores user related states and counter slice will store counter related states
```js
interface CounterState {
    value : number // state itself : type of the state
}

interface UserState {
    isSignedIn : boolean
}
```

2. *Actions* - actions define what kind of changes are to be made to states --> characterized by name of the action called "type" and the payload (how much to change) 
```js
// reducer will use action to change a state by payload amount -> say inc counter by 10 (here)
const incByAmt = {type: 'increment', payload: 10} 
const decrement = {type : 'decrement' , payload: 10}
```

3. *Reducer* - Reducer takes the action and actually makes the change defined by an action. Note that reducers never directly modify a state. It first copies the state --> make changes to the copy --> write back changed state back

After reading this note --> go make a store in the state directory