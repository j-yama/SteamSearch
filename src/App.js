import React, { Component } from 'react';
import { ReactiveBase, DataSearch, MultiList, SingleRange, RangeSlider, ResultCard, CategorySearch } from '@appbaseio/reactivesearch';
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
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
                fontSize: '16px',
              },
              colors: {
                textColor: '#fff',
                backgroundColor: '#212121',
                primaryTextColor: '#fff',
                primaryColor: '#2196F3',
                titleColor: '#fff',
                alertColor: '#d9534f',
                borderColor: '#666',
              }
            }
          }
        >
          <DataSearch
            componentId="searchbox"
            dataField={["ResponseName"]}
          />
          <ResultCard
            componentId="results"
            dataField="name"
            size={10}
            pagination={true}
            react={{
              and: ["searchbox", "ratingsfilter"]
            }}
            onData={(res) => {
              return {
                image: res.HeaderImage,
                title: res.ResponseName,
                description: `<p>Release Date: ${res.ReleaseDate}</p><p>Price: $${res.PriceInitial}</p>`,
                url: `https://store.steampowered.com/app/${res.ResponseID}`
              }
            }}
          />
        </ReactiveBase>
      </div >
    );
  }
}
export default App;