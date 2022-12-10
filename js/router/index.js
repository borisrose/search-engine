import Header from '../components/header/index.js'
import ErrorPage from '../pages/404/index.js'
import { findComponentByPath } from '../utils/findComponentByPath/index.js'

console.log('into router index.js');

const routes = [

    {
        path: "/",
        component: Header

    }


]


const parseLocation = () => location.hash.slice(1).toLocaleLowerCase() || '/'



export const router = async () => {
    
    console.log('into router function')


    document.querySelector('#root').innerHTML = await Header.render()
   


}