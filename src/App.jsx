import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import { useEffect } from "react";
import api from "./Components/DataProvider/Api";

function App() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function loadCards() {
      try {
        const data = await api.getAllcards();
        setCards(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCards();
  }, []);

  async function handleUpdateCard(card) {
    try {
      const likeinvertido = !card.like;
      console.log(likeinvertido);
      await api.updateCard(card._id, likeinvertido);
      const temp = {...card, like: likeinvertido };
      console.log(temp);

      setCards((prev) =>
        prev.map((element) => {
          return element._id === temp._id ? temp : element;
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
  async function handleDeleteCard(card) {
    await api.deleteCard(card._id);

    setCards((cards) => cards.filter((c) => c._id !== card._id));
    try {
    } catch (error) {
      console.error(error);
    }
  }
  async function handleCreateCard(newCard) {
    try {
      const createCard = await api.createCard(newCard);
      setCards((card) => [createCard, ...card]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <Header />
        <Main
          cards={cards}
          onUpdateCard={handleUpdateCard}
          onCreateCard={handleCreateCard}
          onDeleteCard={handleDeleteCard}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
