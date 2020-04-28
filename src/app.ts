import { addEventListener, removeEventListener, dispatchEvent } from './event-api'


const child = document.getElementById('child')
const childListener = e => {
    console.log('child')
} 
const childListener2 = e => {
    console.log('child222')
} 

const parent = child.parentNode;
const parentListener = e => console.log('parent')



addEventListener(child, 'click', childListener2, true, 1)
addEventListener(parent, 'click', parentListener, true) //
addEventListener(child, 'click', childListener, true, 3)


dispatchEvent(child, 'click')

removeEventListener(child, 'click', childListener2, false)
dispatchEvent(child, 'click')






