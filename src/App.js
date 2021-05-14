import './App.css';
import Login from './Login';
import { useEffect, useState } from 'react';
import { graphqlOperation, API } from 'aws-amplify';
import { getStrings, getDiction, listCrossStackReferences } from './graphql/queries';
import { put } from './graphql/mutations';

function App() {
  const [strings, setStrings] = useState([]);
  const [diction, setDiction] = useState({});
  const [list_active, setListActive] = useState('');
  const [dict_active, setDictActive] = useState('');
  
  async function doGetStrings() {
    try {
      const response = await API.graphql(graphqlOperation(getStrings));
      setStrings(response.data.getStrings);
      console.log(response.data.getStrings)
    } catch (err) { console.log('error doGet') }
  }
  
  async function doGetDiction() {
    try {
      const response = await API.graphql(graphqlOperation(getDiction));
      setDiction(response.data.getDiction);
      console.log(diction)
    } catch (err) { console.log('error doGet') }
  }
  
  async function doListCrossStackReferences() {
    try {

      const response = await API.graphql(graphqlOperation(listCrossStackReferences));
      console.log(response)
    } catch (err) { console.log('error doListCrossStackReferences') }
  }
  
  async function doPut() {
    try {

      const response = await API.graphql(graphqlOperation(put));
      console.log(response)
    } catch (err) { console.log('error doPut') }
  }
  
  useEffect(() => {
    if (0 < strings.length) {
      setListActive('is-active')
    } else {
      setListActive('')
    }
  }, [strings])
  
  useEffect(() => {
    if (Object.keys(diction).length) {
      setDictActive('is-active')
    } else {
      setDictActive('')
    }
  }, [diction])
  
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <Login />
        </div>
      </nav>
      <section className="section">
        <div className="field is-grouped">
          <div className="control">
            <button 
              className="button is-dark"
              onClick={() => doGetStrings()}
              >Get Strings
            </button>
          </div>
          <div className="control">
            <button 
              className="button is-dark"
              onClick={() => doGetDiction()}
              >Get Dictionary
            </button>
          </div>
          <div className="control">
            <button 
              className="button is-dark"
              onClick={() => doPut()}
              >Put
            </button>
          </div>
          <div className="control">
            <button 
              className="button is-dark"
              onClick={() => doListCrossStackReferences()}
              >ListCrossStackReferences
            </button>
          </div>
        </div>
      </section>
      <div className={`modal ${dict_active}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close" onClick={() => setDictActive('')}></button>
          </header>
          <section className="modal-card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>number</td><td>{diction.number}</td></tr>
                <tr><td>kanji</td><td>{diction.kanji}</td></tr>
                <tr><td>english</td><td>{diction.english}</td></tr>
                <tr><td>katakana</td><td>{diction.katakana}</td></tr>
              </tbody>
            </table>
          </section>
          <footer className="modal-card-foot">
          </footer>
        </div>
      </div>
      <div className={`modal ${list_active}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close" onClick={() => setListActive('')}></button>
          </header>
          <section className="modal-card-body">
            <ul>
              {strings.map((s, index) =>
                <li key={index}>{s}</li>
              )}
            </ul>
          </section>
          <footer className="modal-card-foot">
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

