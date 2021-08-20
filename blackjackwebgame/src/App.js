import './App.scss';
import React, { useEffect, useState } from 'react'
import Club from './Assets/club.png'
import Diamond from './Assets/diamond.png'
import Hearth from './Assets/hearth.png'
import Spades from './Assets/spades.png'
import CardFaceDown from './Assets/cardFaceDown.png'
import Button from './Components/Button/Button'


// go to https://cors-anywhere.herokuapp.com/corsdemo   
// request temporary acces
// install cors-everywhere on mozilla and enable it on localhost


function App() {

  const [sessionId, setSessionId] = useState("");
  const [availableBets, setAvailableBets] = useState([]);
  const [bet, setBet] = useState(0);
  const [hasChosenBet, setHasChosenBet] = useState(false)
  const [balance, setBalance] = useState(999);

  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([])
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerScore, setDealerScore] = useState(0)


  const [resultSit, setResultSit] = useState()
  const [resultDeal, setResultDeal] = useState()
  const [resultTurn, setResultTurn] = useState()
  const [resultStand, setResultStand] = useState()

  const [lostRound, setLostRound] = useState(false)
  const [drawRound, setDrawRound] = useState(false)
  const [wonRound, setWonRound] = useState(false)
  const [isBlackjack, setIsBlackJack] = useState(false)

  const [roundEnded, setRoundEnded] = useState(false)
  const [winAmount, setWinAmount] = useState(0)
  const [roundsPlayed, setRoundsPlayed] = useState(0)

  const [gameHasStarted, setGameHasStarted] = useState(false)
  const [gameHasStopped, setGameHasStopped] = useState(false)
   
  /////////SIT
  useEffect(() => {
    /// set available bets and sesId after SIT ACTION
    if (resultSit !== undefined) {
      
      setAvailableBets(resultSit.availableBetOptions);
      setSessionId(resultSit.sessionId);

      console.log("RESULT SIT", resultSit)
    }

  }, [resultSit])


  /////////DEAL
  useEffect(() => {
    //// Set player and dealer cards after DEAL ACTION
    if (resultDeal !== undefined) {

      setPlayerCards(resultDeal.playerCards)
      setDealerCards(resultDeal.dealerCards)


      ////game hasn't stopped => update roundEnded state
      if (resultDeal.roundEnded === false) {
        setRoundEnded(resultDeal.roundEnded)


      }
      ///game has stopped => 
      else {
        setBalance(resultDeal.currentBalance)
        setRoundEnded(resultDeal.roundEnded)
        setWinAmount(resultDeal.winAmount)

        if (resultDeal.winAmount < 0) {
          setDrawRound(false)
          setWonRound(false)
          setLostRound(true)


        }
        else if (resultDeal.winAmount === 0) {
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
      console.log("CARDS SETED", playerCards, dealerCards)
    }
  }, [resultDeal])




  /////////TURN
  useEffect(() => {
    //// Set player new Card
    if (resultTurn !== undefined) {
      console.log("RES TURN: ", resultTurn)

      if (resultTurn.playerCard !== null || resultTurn.playerCard !== undefined) {
        console.log("NEW CARD: ", resultTurn.playerCard)
        let newArr = [];
        newArr = [...playerCards]
        newArr.push(resultTurn.playerCard)
        setPlayerCards(newArr)

      }

      if (resultTurn.roundEnded && (resultTurn.dealerCards !== null || resultTurn.dealerCards !== undefined)) {
        console.log("NEW d CARD: ", resultTurn.dealerCards)
        setDealerCards(resultTurn.dealerCards)
      }

      ////game hasn't stopped => update roundEnded state
      if (resultTurn.roundEnded === false) {
        setRoundEnded(resultTurn.roundEnded)


      }
      ///game has stopped => 
      else {
        setBalance(resultTurn.currentBalance)
        setRoundEnded(resultTurn.roundEnded)
        setWinAmount(resultTurn.winAmount)

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


  }, [resultTurn])


  // reset current bet && setWinAmount and rounds played
  useEffect(() => {
    if (resultStand !== undefined) {
      console.log("STAND", resultStand);

      setBet(0);
      setWinAmount(resultStand.winAmount);
      setRoundsPlayed(resultStand.roundsPlayed)
      setGameHasStarted(false)
      setGameHasStopped(true);
      setBalance(999)
    
    }
  }, [resultStand])




  ///// set Player s Cards   set Dealer s Cards
  useEffect(() => {

    console.log("Players Cards ", playerCards)

    if (playerCards.length > 0 && playerCards !== undefined) {

      let tempScore = 0
      playerCards.forEach((element, index) => {

        if (element !== null && element !== undefined) {

          if (element.rank === "J" || element.rank === "Q" || element.rank === "K") {
            tempScore += 10;
          } else if (element.rank === "A") {
            if (tempScore <= 21) {
              tempScore += 11
            }
            else {
              tempScore += 1
            }
          }
          else {
            tempScore += Number(element.rank)
          }

          setPlayerScore(tempScore);
        }

      })
    }


  }, [playerCards])


  useEffect(() => {

    console.log("DealersCards ", dealerCards)

    if (dealerCards.length > 0 && dealerCards !== undefined) {
      let tempScore = 0
      dealerCards.forEach((element, index) => {

        if (element !== null && element !== undefined) {

          if (element.rank === "J" || element.rank === "Q" || element.rank === "K") {
            tempScore += 10;
          } else if (element.rank === "A") {
            if (tempScore <= 21) {
              tempScore += 11
            }
            else {
              tempScore += 1
            }
          }
          else {
            tempScore += Number(element.rank)
          }

          setDealerScore(tempScore);
        }

      })

    }

  }, [dealerCards])




  //check if round ended
  useEffect(() => {

    //when the round ended, reset game state
    if (roundEnded) {
      setTimeout(() => {
        setPlayerCards([]);
        setDealerCards([]);
        setPlayerScore(0);
        setDealerScore(0);
        setWonRound(false);
        setDrawRound(false);
        setLostRound(false);
        setIsBlackJack(false);
       
       

      }, 3000)

    }

  }, [roundEnded, winAmount])


  useEffect(() => {

    if (balance < 1)
    {
      handleStand();
      setBalance(999)
    }
  },[balance])

  const handleSit = () => {

    setGameHasStarted(true);
    
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


  // after choosing a bet, deal the cards
  const handleDeal = () => {
    if (bet === 0) {
      setHasChosenBet(false);
    }


    if (resultDeal !== null && bet !== 0) {
      setRoundEnded(false);
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

  }


  // stay with the current cards and wait for the result
  const handleStay = () => {

    if (playerCards.length > 0) {
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
          console.log("TURN", result);
          setResultTurn(result);
          return { type: "SUCCESS", result };
        })
        .catch((error) => {
          return { type: "ERR", error };
        });
    }

  }

  // ask for another card
  const handleHit = () => {
    if (playerCards.length > 0) {
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
          setResultTurn(result);
          return { type: "SUCCESS", result };
        })
        .catch((error) => {
          return { type: "ERR", error };
        });

    }
  }


  // stand / end game
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
        setResultStand(result)
        return { type: "SUCCESS", result };
      })
      .catch((error) => {
        return { type: "ERR", error };
      });

    


  }



  // choose current bet from the available bets 
  const handleChooseBet = (event) => {
    if (event && event.target && event.target.innerText) {
      setBet(event.target.innerText)
      setHasChosenBet(true);
    }
  }


  // create available bets 
  const AvailableBets = () => {
    return <div className={"betTokensContainer"}>
      {availableBets.map((element, index) => {

        return <div key={index} className={"betToken"} onClick={(event) => handleChooseBet(event)}>
          <p className={"betText"}>{element} </p>
        </div>

      })}

    </div>
  }


  // create player cards
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
          return <div className={"card"} key={index}>
            <p className={"card-rank"}>{element.rank}</p>
            <div className={"card-suite-container"}>
              <img className={"card-suite-image"} src={imgSrc} alt={"SUITE"} />
            </div>
          </div>
        }
      })}
    </div>
  }

  // create dealer cards
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
          return <div className={"card"} key={index}>
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
      </header>
      {(!gameHasStarted) ?
        <div>
         
          <div className={"sit-container"}>
            <Button
              width="400"
              height="120"
              backgroundColor="yellow"
              bottomRightCorner={false}
              topRightCorner={true}
              topLeftCorner={false}
              bottomLeftCorner={true}
              cutLenght="40"
              margin="8"
              borderColor="red"
              handleOnClick={handleSit}
            >
              <div>
                <p className={"sit-text"}>PLAY</p>
              </div>
            </Button>
          </div>
          {gameHasStopped &&
            <div>
              <div className={"rounds-container"}><p className={"rounds-text"}>Rounds played: {roundsPlayed} </p></div>
              <div className={"win-container"}><p className={"win-text"}>Win amount: {winAmount} </p></div>
            </div>
          }
        </div>
        :

        <div>
          <div className={"deal-container"}>
            <Button

              width="150"
              height="70"
              backgroundColor="yellow"
              bottomRightCorner={true}
              topRightCorner={true}
              topLeftCorner={true}
              bottomLeftCorner={true}
              cutLenght="10"
              margin="6"
              borderColor="red"
              handleOnClick={handleDeal}
            >
              <div >
                <p className={"button-text"}>DEAL</p>
              </div>
            </Button>
          </div>
          <div className={"hit-container"}>
            <Button

              width="150"
              height="70"
              backgroundColor="yellow"
              bottomRightCorner={true}
              topRightCorner={true}
              topLeftCorner={false}
              bottomLeftCorner={false}
              cutLenght="10"
              margin="10"
              borderColor="red"
              handleOnClick={handleHit}
            >
              <div >
                <p className={"button-text"}>HIT</p>
              </div>
            </Button>
          </div>
          <div className={"stay-container"}>
            <Button

              width="150"
              height="70"
              backgroundColor="yellow"
              bottomRightCorner={false}
              topRightCorner={false}
              topLeftCorner={true}
              bottomLeftCorner={true}
              cutLenght="10"
              margin="10"
              borderColor="red"
              handleOnClick={handleStay}
            >
              <div >
                <p className={"button-text"}>STAY</p>
              </div>
            </Button>
          </div>
          <div className={roundEnded ? "stand-container" : "stand-container-inactive"}>
            <Button

              width="150"
              height="70"
              backgroundColor="yellow"
              bottomRightCorner={true}
              topRightCorner={true}
              topLeftCorner={true}
              bottomLeftCorner={true}
              cutLenght="5"
              margin="12"
              borderColor="red"
              handleOnClick={handleStand}
            >
              <div >
                <p className={"button-text"}>STAND</p>
              </div>
            </Button>
          </div>

          <div className={"balance-container"}><p className={"balance-text"}>BALANCE: {balance} $</p></div>
          {bet !== 0 &&
            <div className={"bet-container"}><div className={"betToken"} >
              <p className={"betText"}>{bet} $</p>
            </div></div>
          }

          <div className={"player-score-container"}><p className={"score-text"}>Player's Score: {playerScore} </p></div>
          <div className={"dealer-score-container"}><p className={"score-text"}>Dealer's Score: {dealerScore} </p></div>


          {!hasChosenBet && <div className={"choose-bet-container"}><h1 className={"choose-bet-text"}>PLEASE CHOOSE A BET!</h1></div>}

         

          {wonRound && <div className={"choose-bet-container"}><h1 className={"choose-bet-text"}>YOU WON !</h1></div>}
          {drawRound && <div className={"choose-bet-container"}><h1 className={"choose-bet-text"}>DRAW !</h1></div>}
          {lostRound && <div className={"choose-bet-container"}><h1 className={"choose-bet-text"}>YOU LOST !</h1></div>}
          {isBlackjack && <div><h1>BLACKJACK!</h1></div>}

          {(dealerCards.length > 0 && dealerCards !== undefined) && <DealerCards />}
          {(dealerCards.length > 0) && <div className={roundEnded ? "card-face-down-inactive" : "card-face-down-container"}><img className={"card-face-down-image"} src={CardFaceDown} /></div>}

          <AvailableBets />


          {(playerCards.length > 0 && playerCards !== undefined) && <PlayerCards />}

        </div>}


    </div>
  );
}

export default App;
