import './App.scss';
import React, { useEffect, useState } from 'react'
import Club from './Assets/club.jpg'
import Diamond from './Assets/diamond.jpg'
import Hearth from './Assets/hearth.png'
import Spades from './Assets/spades.svg'


// go to https://dev.to/andypotts/avoiding-cors-errors-on-localhost-in-2020-4mfn
// -- da find dupa  3. Use a proxy to avoid CORS errors
// basically poti sa folosesti asta: https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/sit

function App() {

  // const [balance, setBalance] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const [availableBets, setAvailableBets] = useState([]);
  const [bet, setBet] = useState(0);
  const [hasChosenBet, setHasChosenBet] = useState(false)
  const [balance, setBalance] = useState(999);

  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([])

  const [cardRank, setCardRank] = useState('');
  const [cardSuite, setCardSuite] = useState('');

  // useEffect(() => {
  //   console.log(sessionId)
  // }, [sessionId])


  const [resultSit, setResultSit] = useState()
  const [resultTurn, setResultTurn] = useState()
  const [resultDeal, setResultDeal] = useState()

  const [lostRound, setLostRound] = useState(false)
  const [drawRound, setDrawRound] = useState(false)
  const [wonRound, setWonRound] = useState(false)

  const [roundEnded, setRoundEnded] = useState(false)

  ////MAIN UPDATE FUNC
  useEffect(() => {


    /// set available bets and sesId after SIT ACTION
    if (resultSit !== undefined) {
      setAvailableBets(resultSit.availableBetOptions);
      setSessionId(resultSit.sessionId);

      console.log("RESULT SIT", resultSit)
    }


    //// Set player and dealer cards after DEAL ACTION
    if (resultDeal !== undefined) {


      setPlayerCards(resultDeal.playerCards)
      setDealerCards(resultDeal.dealerCards)

      // resultDeal.playerCards.forEach(element => {
      //   setCard({ rank: element.rank, suite: element.suite })
      // })

      console.log("CARDS SETED", playerCards, dealerCards)
    }



    //// Set player new Card
    if (resultTurn !== undefined) {
      console.log("RES TURN: ", resultTurn)
      setBalance(resultTurn.currentBalance)
      if (resultTurn.roundEnded === false) {

        if (resultTurn.playerCard !== null || resultTurn.playerCard !== undefined) {
          console.log("NEW CARD: ", resultTurn.playerCard)
          let newArr = [];
          newArr = [...playerCards]
          newArr.push(resultTurn.playerCard)
          setPlayerCards(newArr)

        }

        if (resultTurn.dealerCard !== null || resultTurn.dealerCard !== undefined) {
          let newArr = [];
          newArr = [...dealerCards]
          newArr.push(resultTurn.dealerCard)
          setDealerCards(newArr)
        }
      }
      else {
        setRoundEnded(resultTurn.roundEnded)

        if (resultTurn.winAmount < 0) {
          setDrawRound(false)
          setWonRound(false)
          setLostRound(true)


        }
        else if (resultTurn.winAmount === 0) {
          setWonRound(false)
          setLostRound(false)
          setDrawRound(true)


        }
        else {
          setLostRound(false)
          setDrawRound(false)
          setWonRound(true)


        }
      }
    }


  }, [resultSit, resultDeal, resultTurn])

  /////Set BET and SessionId
  useEffect(() => {
    console.log("SesId: ", sessionId)

    if (sessionId !== undefined) {
      setSessionId(sessionId)
    }

  }, [sessionId])


  ///// set Player s Cards   set Dealer s Cards
  useEffect(() => {

    console.log("Players Cards ", playerCards)
    console.log("DealersCards ", dealerCards)

  }, [playerCards, dealerCards])





  //check if round ended
  useEffect(() => {
    let newArr = []
    setPlayerCards(newArr);
    setDealerCards(newArr)

    setWonRound(false);
    setDrawRound(false);
    setLostRound(false)

  }, [roundEnded])

  const handleSit = () => {

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    headers.append('Access-Control-Allow-Credentials', true);
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "balance": balance
      }),
      redirect: "follow",
    };


    return fetch(`https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/sit`, requestOptions)
      .then((response) => response.json())
      .then((result) => {

        console.log("SIT", result);
        setResultSit(result);
        return { type: "SUCCESS", result };
      })
      .catch((error) => {
        return { type: "ERR", error };
      });

  }

  const handleDeal = () => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    headers.append('Access-Control-Allow-Credentials', true);
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "bet": bet,
        "sessionId": sessionId
      }),
      redirect: "follow",
    };



    return fetch(`https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/deal`, requestOptions)
      .then((response) => response.json())
      .then((result) => {

        console.log("DEAL", result);
        setResultDeal(result)
        return { type: "SUCCESS", result };
      })
      .catch((error) => {
        return { type: "ERR", error };
      });


  }

  const handleStay = () => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    headers.append('Access-Control-Allow-Credentials', true);
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "action": "stay",
        "sessionId": sessionId
      }),
      redirect: "follow",
    };


    return fetch(`https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/turn`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // setSessionId(result.sessionId);
        // JSON.stringify(result);
        console.log("TURN", result);
        setResultTurn(result);
        return { type: "SUCCESS", result };
      })
      .catch((error) => {
        return { type: "ERR", error };
      });


  }

  const handleHit = () => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    headers.append('Access-Control-Allow-Credentials', true);
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "action": "hit",
        "sessionId": sessionId
      }),
      redirect: "follow",
    };


    return fetch(`https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/turn`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // setSessionId(result.sessionId);
        // JSON.stringify(result);
        console.log("TURN", result);
        setResultTurn(result);
        return { type: "SUCCESS", result };
      })
      .catch((error) => {
        return { type: "ERR", error };
      });


  }


  const handleStand = () => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    headers.append('Access-Control-Allow-Credentials', true);
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "sessionId": sessionId
      }),
      redirect: "follow",
    };


    return fetch(`https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/stand`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // setSessionId(result.sessionId);
        // JSON.stringify(result);
        console.log("STAND", result);
        // setResultSit(result);
        return { type: "SUCCESS", result };
      })
      .catch((error) => {
        return { type: "ERR", error };
      });

  }




  const handleChooseBet = (event) => {
    if (event && event.target && event.target.innerText) {
      setBet(event.target.innerText)
      setHasChosenBet(true);
    }
  }


  const AvailableBets = () => {

    return <div className={"betTokensContainer"}>
      {availableBets.map((element, index) => {

        return <div className={"betToken"} onClick={(event) => handleChooseBet(event)}>
          <p className={"betText"}>{element} </p>
        </div>

      })}

    </div>
  }

  const PlayerCards = () => {


    return <div className={"player-cards-container"}>

      {playerCards.map((element, index) => {
        if (element !== null && element !== undefined) {
          let imgSrc = '';
          switch (element.suite) {
            case 'Clubs': imgSrc = Club;
              break;
            case 'Diamonds': imgSrc = Diamond;
              break;
            case 'Spades': imgSrc = Spades;
              break;
            case 'Hearts': imgSrc = Hearth;
              break;
            default: imgSrc = Hearth

          }
          return <div className={"card"}>
            <p className={"card-rank"}>{element.rank}</p>
            <div className={"card-suite-container"}>
              <img className={"card-suite-image"} src={imgSrc} alt={"SUITE"} />
            </div>
          </div>
        }
      })}
    </div>
  }

  const DealerCards = () => {
    return <div className={"dealer-cards-container"}>
      {dealerCards.map((element, index) => {
        if (element !== null && element !== undefined) {
          let imgSrc = '';
          switch (element.suite) {
            case 'Clubs': imgSrc = Club;
              break;
            case 'Diamonds': imgSrc = Diamond;
              break;
            case 'Spades': imgSrc = Spades;
              break;
            case 'Hearts': imgSrc = Hearth;
              break;
            default: imgSrc = Hearth

          }
          return <div className={"card"}>
            <p className={"card-rank"}>{element.rank}</p>
            <div className={"card-suite-container"}>
              <img className={"card-suite-image"} src={imgSrc} alt={"SUITE"} />
            </div>
          </div>
        }
      })}
    </div>
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Blackjack Gambling Game</h1>
        <div className={"actions-container"}>
          <button onClick={handleSit}>SIT</button>
          <button onClick={handleDeal}>DEAL</button>
          <button onClick={handleHit}>HIT</button>
          <button onClick={handleStay}>STAY</button>
          <button onClick={handleStand}>STAND</button>
        </div>
        <div className={"balance-container"}><p className={"balance-text"}>BALANCE: {balance} $</p></div>
        <div className={"bet-container"}><p className={"bet-text"}>Your Bet: {bet} $</p></div>


        {wonRound && <div><h1>YOU WON</h1></div>}
        {drawRound && <div><h1>DRAW</h1></div>}
        {lostRound && <div><h1>YOU LOST</h1></div>}


        {(dealerCards !== null && dealerCards !== undefined) && <DealerCards />}

        <AvailableBets />


        {(playerCards !== null && playerCards !== undefined) && <PlayerCards />}



      </header>
    </div>
  );
}

export default App;
