import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import CardColumns from 'react-bootstrap/CardColumns';
import Columns from "react-columns";
import Form from "react-bootstrap/Form";

function App() {

  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
const filterCountry = results.filter(item => {
  return searchCountry !== "" ? item.country === searchCountry : item;
})
  const date = new Date(parseInt(latest.updated));
  const latestUpdated = date.toString();
  useEffect(() => {
    axios
    .all([
      axios.get("https://corona.lmao.ninja/v3/covid-19/all"),
      axios.get("https://corona.lmao.ninja/v3/covid-19/countries")
    ])
   
    .then( responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
    })
    .catch(err => { 
     console.log(err);
    });
  }, []);

  const countries = filterCountry.map(data => {
    return(
      <Card 
      // key={i}
     bg="light"
      text="dark"
      className = "text-center"
      style={{margin: "3rem"}}>
        <Card.Img variant="top" src={data.countryInfo.flag} style={{height:"200px"}} />
    <Card.Body style={{lineHeight: "0.5rem"}}>
      <Card.Title>{data.country}</Card.Title>
      <Card.Text>Cases {data.cases}</Card.Text>
      <Card.Text>Deaths {data.deaths}</Card.Text>
      <Card.Text>Recovered {data.recovered}</Card.Text>
      <Card.Text>Today's cases {data.todayCases}</Card.Text>
      <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
      <Card.Text>Active {data.active}</Card.Text>
      <Card.Text>Critical {data.critical}</Card.Text>
    </Card.Body>
  </Card>

    );
  });

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  return (
    <div className="App">
     <CardDeck>
  <Card 
    bg="secondary" 
    text="white" 
    style={{margin: "1rem", padding: "1rem"}}>
    
    <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>
       {latest.cases}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {latestUpdated}</small>
    </Card.Footer>
  </Card>
  <Card 
  bg="danger" 
  text="white"
  style={{margin: "1rem", padding: "1rem"}}>
    
    <Card.Body>
      <Card.Title>Death</Card.Title>
      <Card.Text>
      {latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small text="white">Last updated {latestUpdated}</small>
    </Card.Footer>
  </Card>
  <Card 
  bg="success" 
  text="white"
  style={{margin: "1rem", padding: "1rem"}}>
   
    <Card.Body>
      <Card.Title>Recovered</Card.Title>
      <Card.Text>
      {latest.recovered}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {latestUpdated}</small>
    </Card.Footer>
  </Card>
</CardDeck>
<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Label>Search</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Search a country here..."
    onChange ={e => setSearchCountry(e.target.value)} />
  </Form.Group>
</Form>
<Columns queries={queries} style={{width: "150px", padding: "3rem"}}>{countries}</Columns>

    </div>
  );
}

export default App;
