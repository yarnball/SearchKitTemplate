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

const MovieResult = props => {
  const { bemBlocks, result } = props;
  let url = "http://www.imdb.com/title/" + result._source.imdbId;
  const source: any = extend({}, result._source, result.highlight);
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit" >
      <a href={url} target="_blank">
        <div
          data-qa="title"
          className={bemBlocks.item("title")}
          dangerouslySetInnerHTML={{ __html: source.title }}
        />
      </a>
    </div>
  );
};


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
