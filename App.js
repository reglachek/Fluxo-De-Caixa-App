import { createStackNavigator, createAppContainer } from 'react-navigation'

import Home from './src/components/Home'
import Cadastro from './src/components/Cadastro'
import Login from './src/components/Login'
import Interna from './src/components/Interna'
import PreLoad from './src/components/PreLoad'
import AddReceita from './src/components/AddReceita'
import AddDespesa from './src/components/AddDespesa'

const Navigator = createStackNavigator({
    PreLoad: {
        screen: PreLoad
    },
    Interna: {
        screen: Interna
    },
    Home: {
        screen: Home
    },
    Cadastro: {
        screen: Cadastro
    },
    Login: {
        screen: Login
    },
    AddReceita: {
        screen: AddReceita
    },
    AddDespesa: {
        screen: AddDespesa
    },
})

export default createAppContainer(Navigator)
