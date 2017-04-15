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
      title: props.result._source.title
    };
  }

  handleTextChange = e => {
    this.setState({ title: e.target.value });
  };

  toggleEditMode = () => {
    this.setState(prev => ({ editMode: !prev.editMode }));
  };
  render() {
    const { result } = this.props;
    const { title } = this.state;
    return (
      <div key={result._id}>
        <div>
          {this.state.editMode
            ? <Editor
                toggleEditMode={this.toggleEditMode}
                text={title}
                handleTextChange={this.handleTextChange}
              />
            : <Viewer toggleEditMode={this.toggleEditMode} text={title} />}
        </div>
      </div>
    );
  }
}

const Editor = props => {
  return (
    <h1>
      <textarea
        className="form-control"
        onChange={props.handleTextChange}
        value={props.text}
      />
      <button onClick={props.toggleEditMode}>Save</button>
    </h1>
  );
};

const Viewer = props => (
  <div>
    <h1
      className="editable"
      dangerouslySetInnerHTML={{ __html: props.text }}
      style={{ display: "inline-block" }}
    />
    <button onClick={props.toggleEditMode}>Edit</button>
  </div>
);

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
