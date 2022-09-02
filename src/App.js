import styled from '@emotion/styled'
import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from 'react-router-dom';
import SearchBar from './components/SearchBar.js';
import { DATASET } from './dataset';

/*
  Performance optimizations:
  - not calling the API after every new letter, wait for a bit
  - implementation of fuzzy search for helping users to find names faster

  Tests:
  - using react test library to test input-outputs
*/

export default function App() {
  const [data, setData] = useState(DATASET)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();

  // TO-DO: fetch data via API call from firebase
  const fetchData = () => {
    axios.get(`https://test:3000/?name=${searchParams.get('name')}`)
      .then((response) => {
        const res = response.data.message
        setData(data => [...data, res])
        console.log(data)
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    // Checks if query contains something on page load
    const query = searchParams.get("name")
    if (query)
      handleSearch(query)
  }, []);


  function handleSearch(newSearchQuery) {
    // Checks if the search input is included in names from dataset
    if (newSearchQuery.length > 1) {
      setSearchQuery(newSearchQuery)

      var results = []
      data.forEach(name => {
        if (name.includes(newSearchQuery)) //case sensitive
          results.push(name)
      });

      setFilteredData(results)
      setSearchParams(`?name=${newSearchQuery}`, { replace: true })
    }
    else {
      setFilteredData([])
      setSearchParams('?name=', { replace: true })
    }
  }

  const Container = styled.div(props => ({
    fontSize: 'large',
    backgroundColor: "lightblue",
    borderRadius: '50px',
    width: '20%',
    margin: 'auto',
    marginTop: '25px'
  }))

  const Title = styled.h1(props => ({
    fontSize: '50px',
    backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
    borderRadius: '50px',
    width: '40%',
    margin: 'auto',
  }))

  return (
    <div className="App">
      <Title>Welcome!</Title>
      <SearchBar handleSearch={handleSearch} />
      <Container className='content'>
        {filteredData.map((name, index) => {
          return (
            <div key={index}>
              {name}
            </div>
          );
        })}
      </Container>
    </div>
  );
}