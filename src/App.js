import React, { Component } from "react";
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

import { extend, map, identity, includes, defaults } from "lodash";


let block = require("bem-cn")

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
    );
  }
}


class customListComponent1 extends React.Component {
static defaultProps: any = {
    mod: "sk-item-list",
    showCount: true,
    itemComponent: customListComponent1,
    translate:identity,
    multiselect: true,
    selectItems: [],
    countFormatter:identity
  }

  isActive(option){
    const { selectedItems, multiselect } = this.props
    if (multiselect){
      return includes(selectedItems, option.key)
    } else {
      if (selectedItems.length == 0) return null
      return selectedItems[0] == option.key
    }
  }

  render() {
    const {
      mod, itemComponent, items, selectedItems = [], translate,
      toggleItem, setItems, multiselect, countFormatter,
      disabled, showCount, className, docCount
    } = this.props
    const bemBlocks = {
      container: block(mod),
      option: block(`${mod}-option`)
    }

    const toggleFunc = multiselect ? toggleItem : (key => setItems([key]))

    const actions = map(items, (option) => {
      const label = option.title || option.label || option.key
      return React.createElement(itemComponent, {
        label: translate(label),
        onClick: () => toggleFunc(option.key),
        bemBlocks: bemBlocks,
        key: option.key,
        itemKey:option.key,
        count: countFormatter(option.doc_count),
        rawCount:option.doc_count,
        listDocCount: docCount,
        disabled:option.disabled,
        showCount,
        active: this.isActive(option)
      })
      
    })
    console.log(actions)
    return (
      <div data-qa="options" className={bemBlocks.container().mix(className) }>
        {actions.key}
      </div>
    )
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
                title="Categories"
                id="actors"
                field="type.raw"
                operator="OR"
                listComponent={customListComponent1}
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
