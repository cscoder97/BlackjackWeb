import './App.scss';


function App() {

  // const axios = require('axios').default;

  // const Request = {"balance":100}

//   const REST = axios.create({
//     baseURL: 'https://blackjack.fuzz.me.uk/',
//     timeout: 5000,
//     mode: 'no-cors',
//     // withCredentials: false,
//     // crossorigin:true,
//     headers: {"Access-Control-Allow-Origin": "*",
//     // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     // 'Access-Control-Allow-Credentials':true,
//     // 'Content-Type': 'application/json'
//     }
//   });

//   const body = {
//     "balance":999
// }

 // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      // 'Access-Control-Allow-Credentials':true,     
      //  'Content-Type':'application/json'

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
              "balance":999
          }),
          redirect: "follow",
      };

      // go to https://dev.to/andypotts/avoiding-cors-errors-on-localhost-in-2020-4mfn
      // -- da find dupa  3. Use a proxy to avoid CORS errors
      // citeste acolo
      // basically poti sa folosesti asta: https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/sit


      
     

      return fetch(`https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/sit`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
              console.log(result)
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
            "balance":999
        }),
        redirect: "follow",
    };

    // go to https://dev.to/andypotts/avoiding-cors-errors-on-localhost-in-2020-4mfn
    // -- da find dupa  3. Use a proxy to avoid CORS errors
    // citeste acolo
    // basically poti sa folosesti asta: https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/sit


    
   

    return fetch(`https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/sit`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
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
            "balance":999
        }),
        redirect: "follow",
    };

    return fetch(`https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/sit`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
        console.log(result)
        return { type: "SUCCESS", result };
    })
    .catch((error) => {
        return { type: "ERR", error };
    });

  }
    
  //   REST.post('/sit', body)
  //   .then(response => {
  //     console.log(response)
  //   })
  //   .catch(err => {
  //     console.log("ERROR: ",err)
  //   })
  // }
  // const options = {'X-Custom-Header': 'value'}

  // axios.post('https://cors-anywhere.herokuapp.com/https://blackjack.fuzz.me.uk/sit',Request)
  // .then((res) => {
  //   console.log(res)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })


  return (
    <div className="App">
      <header className="App-header">
        <h1>Blackjack Gambling Game</h1>
        <button onClick={handleSit}>SIT</button>
        <button onClick={handleHit}>HIT</button>
        <button onClick={handleDeal}>DEAL</button>
      </header>
    </div>
  );
}

export default App;
