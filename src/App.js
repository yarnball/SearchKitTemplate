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
  Hits,
  SideBar
} from "searchkit";
import "./index.css";
import "./custom/responsee.css";
import "./custom/template-style.css";
import "./custom/style.css";

const host = "http://demo.searchkit.co/api/movies";
const searchkit = new SearchkitManager(host);

class MovieHit extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      title: props.result._source.title,
    };
  }
  
  toggleEditMode = e => {
    this.setState({ editMode: !this.state.editMode })
  }
  
  closeEdit = e => {
    this.setState({editMode: false})
  }

  handleTextChange = e => {
    this.setState({title: e.target.value})
  }

  render() {
    const { result } = this.props
    const { title } = this.state
    return (
      <div key={result._id}>
      <div>
        {this.state.editMode
        ? <Editor
            toggleEditMode={this.toggleEditMode}
            text={title}
            handleTextChange={this.handleTextChange}
          />
        : <Viewer
            toggleEditMode={this.toggleEditMode}
            text={title}
          />}
      </div>
      </div>
    );
  }
}

class MovieHits extends React.Component {
  closeAll = e => {
    this.components.forEach(component => component.closeEdit())
  }
  render(){
    const { hits } = this.props
    this.components = []
    return (
      <div>
        <button onClick={this.closeAll}>close all</button>
        {hits.map(hit => <MovieHit ref={ref => this.components.push(ref)} key={hit._id} result={hit} />)}
      </div>
    )
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
    <h1 className="editable" dangerouslySetInnerHTML={{ __html: props.text }} style={{display: 'inline-block'}} />
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
             <RefinementListFilter
                title=""
                id="actors"
                field="type.raw"
                operator="OR"
                size={4}
              />
              <section id="home-section" className="line">
                 <Hits hitsPerPage={6} listComponent={MovieHits}/>
              </section>
            </LayoutResults>

          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;
