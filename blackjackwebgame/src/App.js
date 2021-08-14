import './App.scss';
import React, { useEffect, useState } from 'react'



// go to https://dev.to/andypotts/avoiding-cors-errors-on-localhost-in-2020-4mfn
// -- da find dupa  3. Use a proxy to avoid CORS errors
// basically poti sa folosesti asta: https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/sit

function App() {

  // const [balance, setBalance] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const [availableBets, setAvailableBets] = useState([]);
  const [bet, setBet] = useState(0);
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

  const [card, setCard] = useState({ rank: 'A', suite: 'Diamonds' })



  useEffect(() => {

    if (resultSit !== undefined) {



      setAvailableBets(resultSit.availableBetOptions);
      setSessionId(resultSit.sessionId);

      console.log("RESULT SIT", resultSit)
    }

    if (resultDeal !== undefined) {



      setPlayerCards(resultDeal.playerCards)
      setDealerCards(resultDeal.dealerCards)

      resultDeal.playerCards.forEach(element => {
        setCard({ rank: element.rank, suite: element.suite })
      })

      console.log("CARDS SETED")
    }


  }, [resultSit, resultDeal, resultTurn])

  /////Set BET and SessionId
  useEffect(() => {
    console.log("SesId: ", sessionId)
    console.log("AvBets: ", availableBets)


    if (availableBets !== undefined && sessionId !== undefined) {
      setBet(availableBets[1]);
      setSessionId(sessionId)
    }

  }, [sessionId, availableBets])


  const createCard = (element) => {
    // if (element !== undefined) {
    //   console.log("Card Created: ", element)



    //   return <div className={"card"}>
    //     <div>
    //       <p>"rank"</p>
    //       <p>
    //         {element.rank}
    //       </p>
    //     </div>

    //     <div>
    //       <p>"SUite:</p>
    //       <p>{element.suite}</p>
    //     </div>
    //   </div>

    // }
  }
  ///// set Player s Cards   set Dealer s Cards
  useEffect(() => {

    console.log("Players Cards ", playerCards)
    console.log("DealersCards ", dealerCards)


    if (playerCards) {
      playerCards.forEach(element => {
        // setCard({rank: element.})

        console.log("rank: ", element.rank)
        console.log("suite: ", element.suite)

        setCardRank(element.rank);
        setCardSuite(element.suite);


        // createCard();



      });
    }
    dealerCards.forEach(element => {
      console.log("rank: ", element.rank)
      console.log("suite: ", element.suite)
    })


  }, [playerCards, dealerCards])


  useEffect(() => {
    // playerCards.forEach(element => {
    //     createCard(element);
    //     console.log("Card created");
    // });


  }, [cardRank, cardSuite])


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
        // setSessionId(result.sessionId);
        // JSON.stringify(result);
        console.log("DEAL", result);
        setResultDeal(result)
        // setResultSit(result);
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
        // setResultSit(result);
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
        // setResultSit(result);
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



  const generateCards = () => {


    for (let i = 0; i < 2; i++) {
      return <div>
        <p>R: {i.rank}</p>
        <p>S: {i.suite}</p>
      </div>
    }
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>Blackjack Gambling Game</h1>
        <button onClick={handleSit}>SIT</button>
        <button onClick={handleDeal}>DEAL</button>
        <button onClick={handleHit}>HIT</button>
        <button onClick={handleStay}>STAY</button>
        <button onClick={handleStand}>STAND</button>

        <div><p>BALANCE: {balance}</p></div>
        <div><p>BETS: {availableBets}</p></div>
        <div><p>Your Bet: {bet}</p></div>
        <div><p>rank:
          {

          }
        </p>
          <p>suite: {cardSuite}</p>
        </div>

          {generateCards()}


        {/* <div>
          <p>R: {element.rank}</p>
          <p>S: {element.suite}</p>
        </div> */}


        {/* <div><p>Your Cards: {playerCards}</p></div> */}
        {/* <div><p>Dealer's Cards: {dealerCards}</p></div> */}



      </header>
    </div>
  );
}

export default App;
