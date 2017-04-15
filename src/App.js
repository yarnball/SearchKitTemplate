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
{result._source.title}
          <div>
        {this.state.editMode
        ? <Editor
            toggleEditMode={this.toggleEditMode}
            text={this.state.result.title}
            handleTextChange={this.handleTextChange}
          />
        : <Viewer
            toggleEditMode={this.toggleEditMode}
            text={this.state.result.title}
          />}
      </div>
      </div>
    )
  }
}
const Editor = props =>
  <div>
    <textarea
      className="form-control"
      onChange={props.handleTextChange}
      value={props.text}
    />
    <button onClick={props.toggleEditMode}>Save</button>
  </div>

const Viewer = props =>
  <div>
    <div
      className="editable"
      dangerouslySetInnerHTML={{ __html: (props.text) }}
    />
    <button onClick={props.toggleEditMode}>Edit</button>
  </div>

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
