import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"

import GlobalStyle from './globalStyle'

import { MIDIContextProvider } from './contexts/MIDIContext'

import Home from './pages/Home'
import NotesUI from './pages/NotesUI'
import Compose from './pages/Compose'

import Toolbar from "./components/toolbar/Toolbar"

const App = () => {

    return (
        <Router>
            <MIDIContextProvider>
                <Toolbar />
                
                <Switch>
                    <Route path='/notes'>
                        <NotesUI />
                    </Route>
                    <Route path='/compose'>
                        <Compose />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </MIDIContextProvider>

            <GlobalStyle />
        </Router>
    )
}

export default App
