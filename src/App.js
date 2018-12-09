import React, { Component } from 'react';
import { ReactiveBase, DataSearch, MultiList, SingleRange, RangeSlider, ResultCard, CategorySearch, ResultList } from '@appbaseio/reactivesearch';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="main-container">
        <ReactiveBase
          app="steam-ingest2"
          url="http://localhost:9200"
          theme={
            {
              typography: {
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '16px',
              },
              colors: {
                titleColor: '##c7d5e0',
                textColor: '#c7d5e0',
              }
            }
          }
        >
          <DataSearch
            componentId="searchbox"
            dataField={["ResponseName"]}
          />
          <ResultList
            componentId="resultLists"
            size={25}
            pagination={true}
            react={{
              "and": ["searchbox"]
            }}
            onData={(res) => {
              return {
                image: res.HeaderImage,
                title: res.ResponseName,
                description: `
                <p class="releaseDate">${res.ReleaseDate}</p>
                <p class="price">$${res.PriceInitial}</p>
                `,
                url: `https://store.steampowered.com/app/${res.ResponseID}`,
              }
            }}
            className="result-list"
            innerClass={{
              resultsInfo: "resultsInfo",
              sortOptions: "sortOptions",
              resultStats: "resultStats",
              noResults: "noResults",
              button: "button",
              pagination: "pagination",
              list: "list",
              listItem: "listItem",
              image: "image",
              title: "title",
              poweredBy: "poweredBy",
            }}
          />
        </ReactiveBase>
      </div >
    );
  }
}
export default App;