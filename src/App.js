import React, { Component } from "react";
import { extend } from "lodash";
import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  RefinementListFilter,
  Pagination,
  HierarchicalMenuFilter,
  HitsStats,
  SortingSelector,
  NoHits,
  ResetFilters,
  RangeFilter,
  NumericRefinementListFilter,
  ViewSwitcherHits,
  ViewSwitcherToggle,
  DynamicRangeFilter,
  InputFilter,
  GroupedSelectedFilters,
  Layout,
  TopBar,
  LayoutBody,
  LayoutResults,
  RefinementOption,
  ActionBar,
  ActionBarRow,
  SideBar
} from "searchkit";
import "./index.css";
import "./custom/responsee.css";
import "./custom/template-style.css";
import "./custom/style.css";

const host = "http://demo.searchkit.co/api/movies";
const searchkit = new SearchkitManager(host);

class MovieResult extends Component {
 constructor(props) {
    super(props);

    this.state = {
      result: Object.assign({}, props.result)
    };
    console.log('Data is HERE!' + JSON.stringify(this.props.result))
  }
componentWillReceiveProps(nextProps) {
    if (this.props.result !== nextProps.result) {
      nextProps.loads();
  }
}
  render() {
    const result = this.props.result;
    return (
      <div key={result._id}>
          {<img src={result._source.poster} width="10" height="14"/>}
          <h1>{result._source.title}</h1>
      </div>
    )
  }
}


class App extends Component {
  render() {
    const Searchbox = SearchBox;
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <LayoutBody>

            <LayoutResults>
              <section id="home-section" className="line">
                    <ViewSwitcherHits
                      hitsPerPage={12}
                      highlightFields={["title", "plot"]}
                      sourceFilter={[
                        "plot",
                        "title",
                        "poster",
                        "imdbId",
                        "imdbRating",
                        "year"
                      ]}
                      hitComponents={[
                        {
                          key: "grid",
                          title: "Grid",
                          itemComponent: MovieResult
                        }
                      ]}
                      scrollTo="body"
                    />
              </section>
            </LayoutResults>

          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;
