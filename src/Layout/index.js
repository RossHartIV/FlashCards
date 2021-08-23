import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./PageComponents/Home.js"
import Study from "./PageComponents/Study.js"
import EditDeck from "./PageComponents/EditDeck.js"
import NewDeck from "./PageComponents/NewDeck.js"
import Deck from "./PageComponents/Deck.js"
import NewCard from "./PageComponents/NewCard.js"
import EditCard from "./PageComponents/EditCard.js"
import {
  Route,
  Switch,
} from "react-router-dom";


function Layout() {
  


  return (
    <>
      <Header />
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path='/decks/new'>
          <NewDeck />
        </Route>
        <Route exact path='/decks/:deckId/cards/:cardId/edit'>
          <EditCard />
        </Route>
        <Route exact path='/decks/:deckId/cards/new'>
          <NewCard />
        </Route>
        <Route path='/decks/:deckId/study'>
          <Study />
        </Route>
        <Route path='/decks/:deckId/edit'>
          <EditDeck />
        </Route>
        <Route exact path='/decks/:deckId'>
          <Deck />
        </Route>
        <Route>
          <div className="container">
             {/* TODO: Implement the screen starting here */}
             <NotFound />
          </div>
        </Route>
      </Switch>

    </>
  );
}

export default Layout;
