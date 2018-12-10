import React, { Component } from 'react';
import { ReactiveBase, DataSearch, ResultList, SelectedFilters } from '@appbaseio/reactivesearch';
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
                titleColor: '#c7d5e0',
                textColor: '#c7d5e0',
                backgroundColor: '#212121',
                // primaryTextColor: '#fff',
                primaryColor: '#2B475E',
                // alertColor: '#d9534f',
                // borderColor: '#666',
              }
            }
          }
        >
          <DataSearch
            componentId="title"
            dataField={["ResponseName"]}
            placeholder="enter search term"
            showIcon={false}
            title="Steam Search"
            className="data-search"
            innerClass={{
              title: 'title',
              input: 'input',
              list: 'list',
            }}
          />
          <SelectedFilters />
          <ResultList
            componentId="resultLists"
            size={25}
            pagination={true}
            react={{
              "and": ["title"]
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
            sortOptions={[
              { label: "Best Match", dataField: "_score", sortBy: "desc" },
              { label: "Name", dataField: "ResponseName", sortBy: "asc" },
              { label: "Release Date", dataField: "ReleaseDate", sortBy: "desc" },
              { label: "Lowest Price", dataField: "PriceInitial", sortBy: "asc" },
              { label: "Highest Price", dataField: "PriceInitial", sortBy: "desc" },
            ]}
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