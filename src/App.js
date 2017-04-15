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

const MovieHitsGridItem = props => {
  const { bemBlocks, result } = props;
  let url = "http://www.imdb.com/title/" + result._source.imdbId;
  const source: any = extend({}, result._source, result.highlight);
  return (
    <div
      className={bemBlocks.item().mix(bemBlocks.container("item"))}
      data-qa="hit"
    >
      <a href={url} target="_blank">
        <img
          data-qa="poster"
          alt="presentation"
          className={bemBlocks.item("poster")}
          src={result._source.poster}
          width="170"
          height="240"
        />
        <div
          data-qa="title"
          className={bemBlocks.item("title")}
          dangerouslySetInnerHTML={{ __html: source.title }}
        />
      </a>
    </div>
  );
};

const MovieHitsListItem = props => {
  const { bemBlocks, result } = props;
  let url = "http://www.imdb.com/title/" + result._source.imdbId;
  const source: any = extend({}, result._source, result.highlight);
  return (
    <article id={result._source.poster} className="gridpost line">
      <div className="s-12 l-6 post-image">
        <a href="post-1.html">
          <img src={result._source.poster} alt="Fashion 1" />
        </a>
      </div>
      <div className="s-12 l-5 post-text">
        <a href="post-1.html">
          <h2>{result._source.title}</h2>
        </a>
        <p>
          {result._source.actors}
          Lorem ipsum dolor sit amet, conse ctetuer. Duis autem vemeu iriure dolor adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat wisi enim.
          {" "}
        </p>
      </div>
      <div className="s-12 l-1 post-date">
        <p className="date">07</p>
        <p className="month">mar</p>
      </div>
    </article>
  );
};

class App extends Component {
 
  render() {
    const Searchbox = SearchBox;
    const customItemComponent = props => {
      const {itemKey,style,onClick,active,label,} = props;
      let className = "";
      if (active) className += "active-item";

      return (
        <li>
          <div className={className}>
            <div onClick={onClick}>
              <a>
                <div style={style} data-key={itemKey} />
                <div className="text">{label}</div>
              </a>
            </div>
          </div>
        </li>
      );
    };
    const customItemComponent1 = props => {
      const {
        bemBlocks,
        onClick,
        active,
        disabled,
        style,
        itemKey,
        label,
        count,
        showCount,
        showCheckbox
      } = props;
      let className = "TESTING";
      if (active) className += "-active";

      return (
        <li>
          <div className={className}>
            <div onClick={onClick}>
              <a>
                <div style={style} data-key={itemKey} />
                <div className="text">{label}</div>
              </a>
            </div>
          </div>
        </li>
      );
    };
    //            <input type="checkbox" data-qa="checkbox" checked={active} readOnly ></input>
    //           <div className="text">{label}</div><div className="count">{count}</div>

    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <header>
            <div className="line">
              <nav>
                <div className="top-nav">
                  <p className="nav-text" />
                  <a className="logo" href="index.html">
                    {" "}
                    SearchKit<span>Rules</span>
                  </a>
                  <h1>SearchKit refinement filters to be on the right </h1>
                  <ul className="top-ul right">
                    <RefinementListFilter
                      id="categories"
                      field="type.raw"
                      operator="OR"
                      title=""
                      itemComponent={customItemComponent}
                    />
                  </ul>
                </div>
              </nav>
            </div>
          </header>
          <div className="top-nav-low">
            <ul className="top-ul-low right">
              <RefinementListFilter
                title=""
                id="actors"
                field="type.raw"
                operator="OR"
                size={4}
                itemComponent={customItemComponent1}
              />
            </ul>
          </div>

          <LayoutBody>

            <LayoutResults>
              <section id="home-section" className="line">
                <div className="margin">
                  <div className="s-12 l-9">
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
                          itemComponent: MovieHitsGridItem
                        },
                        {
                          key: "list",
                          title: "List",
                          itemComponent: MovieHitsListItem,
                          defaultOption: true
                        }
                      ]}
                      scrollTo="body"
                    />
                  </div>
                </div>
              </section>
              <NoHits suggestionsField={"title"} />
            </LayoutResults>

          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;
