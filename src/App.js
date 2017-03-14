import React, { Component } from 'react'
import { extend } from 'lodash'
import { SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar } from 'searchkit'
import './index.css'
import './custom/responsee.css'
import './custom/template-style.css'

const host = "http://demo.searchkit.co/api/movies"
const searchkit = new SearchkitManager(host)

const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "http://www.imdb.com/title/" + result._source.imdbId
  const source:any = extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <a href={url} target="_blank">
        <img data-qa="poster" alt="presentation" className={bemBlocks.item("poster")} src={result._source.poster} width="170" height="240"/>
        <div data-qa="title" className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}>
        </div>
      </a>
    </div>
  )
}

const MovieHitsListItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "http://www.imdb.com/title/" + result._source.imdbId
  const source:any = extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("poster")}>
        <img alt="presentation" data-qa="poster" src={result._source.poster}/>
      </div>
      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank"><h2 className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}></h2></a>
        <h3 className={bemBlocks.item("subtitle")}>Released in {source.year}, rated {source.imdbRating}/10</h3>
        <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:source.plot}}></div>
      </div>
    </div>
  )
}


            
class App extends Component {
  render() {
    const Searchbox = SearchBox;
    const customItemComponent = (props) => {

      const {
        bemBlocks, onClick, active, disabled, style, itemKey,
        label, count, showCount, showCheckbox} = props
      const className = ""

      return (
         <li><div onClick={onClick}><a>
          <div style={style} data-key={itemKey}>
            
           <div className="text">{label}</div>
            
          </div></a>
        </div></li>
      )
   }
//            <input type="checkbox" data-qa="checkbox" checked={active} readOnly ></input>
//           <div className="text">{label}</div><div className="count">{count}</div>

    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
                        <header className="margin-bottom">
               <div className="line">
            <nav>
               <div className="top-nav">
                  <p className="nav-text"></p>
                  <a className="logo" href="index.html">            
                  Movie<span>Blog</span>
                  </a>            
                  <h1>SearchKit refinement filters to be on the right </h1>
                  <ul className="top-ul right">
                    <RefinementListFilter id="categories" field="type.raw" operator="OR" itemComponent={customItemComponent} />
                  </ul>
               </div>
            </nav>
            </div>
        </header>

        <LayoutBody>

          <SideBar>
            <RefinementListFilter id="categories" title="Categories" field="type.raw" operator="OR"/>
          </SideBar>
          <LayoutResults>
            <ViewSwitcherHits
                hitsPerPage={12} highlightFields={["title","plot"]}
                sourceFilter={["plot", "title", "poster", "imdbId", "imdbRating", "year"]}
                hitComponents={[
                  {key:"grid", title:"Grid", itemComponent:MovieHitsGridItem, defaultOption:true},
                  {key:"list", title:"List", itemComponent:MovieHitsListItem}
                ]}
                scrollTo="body"
            />
            <NoHits suggestionsField={"title"}/>
          </LayoutResults>

          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;
