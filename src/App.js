import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [wordmap, setWordmap] = useState({});
  const [hadismap, setHadismap] = useState({});
  const [substring, setSubstring] = useState({});

  const [findHadis, setFindHadis] = useState([]);

  useEffect(() => {
    let url = "wordmap.json";
    fetch(url).then((res) => res.json()).then((data) => {
      setWordmap(data);
    });
  }, []);

  useEffect(() => {
    let url = "hadismap.json";
    fetch(url).then((res) => res.json()).then((data) => {
      setHadismap(data);
    });
  }, []);

  useEffect(() => {
    let url = "substring.json";
    fetch(url).then((res) => res.json()).then((data) => {
      setSubstring(data);
    });
  }, []);

  const wordMapObj = new Map(Object.entries(wordmap));
  const hadisMapObj = new Map(Object.entries(hadismap));
  const substringObj = new Map(Object.entries(substring));

  const hadisSet = new Set();
  let absoluteResult;

  const find = (event) => {
    event.preventDefault();
    hadisSet.clear();
    let userText = event.target.search.value;
    let words = userText.split(" ");
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      addHadisTagInResult(word);
      absoluteResult = hadisSet.length;
      // addSubstringWords(word);
    }
    let hadisArray = Array.from(hadisSet);
    setFindHadis(hadisArray);
  };

  const addHadisTagInResult = (word) => {
    let hadisArray = wordMapObj.get(word);
    for (let j = 0; j < hadisArray.length; j++) {
      let tag = hadisArray[j];
      hadisSet.add(tag);
    }
  }

  const addSubstringWords = (word) => {
    let similarWords = substringObj.get(word);
    for(let i=0; i<similarWords.length; i++){
      addHadisTagInResult(similarWords[i]);
    }
  }

  const getHadis = (tag) =>{
    console.log(tag);
    let hadisText = hadisMapObj.get(tag); 
    return hadisText;
  }

  return (
    <div className="App">
      <h2>Hadis Engine</h2>
      <form onSubmit={find}>
        <input name="search" type={"text"}></input>
        <input type="submit" value="Search" />
      </form>
      Total result found: {findHadis.length} <br></br>
      Absolute result: {absoluteResult} <br></br>
      {findHadis?.map(
        (hadis) => (
          <ul>
            <li >{hadis}</li>
            {getHadis(hadis)}
          </ul>
        )
      )}
    </div>
  );
}

export default App;