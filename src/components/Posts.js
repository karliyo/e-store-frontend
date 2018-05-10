import React, { Component } from 'react';
import items from '../mock/mock_items.json';
import Item from "./Item";
import { connect } from 'react-redux';
import { addItemToCart } from '../actions/UserActions';
import axios from "axios";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import { DropDownMenu, MenuItem, MuiThemeProvider } from "material-ui";

require('./stylesheets/Posts.css');
require('./stylesheets/Filters.css');

let dropDownMenuStyle = {
    margin: '0em 0em 0.25em 0.25em',
    padding: '0'
};

let menuItemStyle = {
    color: 'black'
};

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: items,
            shownItems: 32, // number of items shown initially
            countries: [],
            departments: [],
            availabilityOptions: [
                'In stock',
                'Out of stock'
            ],
            storeValue: 0,
            inStockFilter: 0,
            departmentFilter: 0
        };
        this.showMoreItems = this.showMoreItems.bind(this);
        this.getStoreItems = this.getStoreItems.bind(this);
        this.mapStoreCountriesAndItemDepartments = this.mapStoreCountriesAndItemDepartments.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.getStoreItems();
        this.mapStoreCountriesAndItemDepartments();
    }

    showMoreItems() {
        this.setState({
            shownItems: this.state.shownItems >= this.state.items.length ?
                this.state.shownItems : this.state.shownItems + 5 // shows 5 more items when this is called
        })
    }

    mapStoreCountriesAndItemDepartments() {
        let countries = [];
        let departments = [];
        this.state.items.map((item) => {
            if (countries.indexOf(item.store) === -1) {
                countries.push(item.store);
            }
            if (departments.indexOf(item.department) === -1) {
                departments.push(item.department);
            }
        });
        this.setState({countries: countries, departments: departments});
    }

    // Sends a GET request for items data to API.
    getStoreItems() {
        let API_KEY = process.env.REACT_APP_HEROKU_API_KEY;
        axios.get('http://erply-challenge.herokuapp.com/list?AUTH=' + API_KEY)
            .then((res) => {
                this.setState({items: res.data})
            }).catch((err) => {
                console.log(err);
        });
    }


    handleScroll = () => {
        if (this.bottom !== null) {
            let n = this.bottom.getBoundingClientRect().top;
            let m = window.innerHeight;
            if (n <= m) { // when scrolled to bottom, it tries to show more items
                this.showMoreItems();
            }
        }
    };

    filterItems() {
        let result = [];
        let inStock = this.state.inStockFilter === 0;
        this.state.items.map((item) => {
            if (item.store === this.state.countries[this.state.storeValue] && // compares item attributes to filter opts
                item.instock === inStock &&
                item.department === this.state.departments[this.state.departmentFilter]) {
                result.push(item);
            }
        });
        return result;
    }

    handleStoreOptionChange = (event, index, value) => this.setState({storeValue: value});

    handleAvailabilityOptionChange = (event, index, value) => this.setState({inStockFilter: value});

    handleCategoryOptionChange = (event, index, value) => this.setState({departmentFilter: value});

    render() {
        const filteredItems = this.filterItems();
        const items = filteredItems
            .slice(0, this.state.shownItems) // shows only a certain amount of items at once
            .map((item, idx) =>
                <Item
                    {...item}
                    key={idx}
                    addToCartClick={() => this.props.addToCart(item)}
                />
            );

        return (
            <div className="posts">
                <div className="product-filters">
                    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                        <p id="filters-main-title">SORT BY</p>
                        <div id="filter-wrapper">
                            <p id="filters-subtitle">Country</p>
                            <DropDownMenu
                                value={this.state.storeValue}
                                menuItemStyle={menuItemStyle}
                                style={dropDownMenuStyle}
                                onChange={this.handleStoreOptionChange}
                            >
                                {this.state.countries.map((item, idx) =>
                                    <MenuItem value={idx} key={idx} label={item} primaryText={item} />
                                )}
                            </DropDownMenu>
                        </div>
                        <div id="filter-wrapper">
                            <p id="filters-subtitle">Stock</p>
                            <DropDownMenu
                                value={this.state.inStockFilter}
                                menuItemStyle={menuItemStyle}
                                style={dropDownMenuStyle}
                                onChange={this.handleAvailabilityOptionChange}
                            >
                                {this.state.availabilityOptions.map((item, idx) =>
                                    <MenuItem value={idx} key={idx} label={item} primaryText={item} />
                                )}
                            </DropDownMenu>
                        </div>
                        <div id="filter-wrapper">
                            <p id="filters-subtitle">{window.innerWidth > 768 ? "Department" : "Dpt"}</p>
                            <DropDownMenu
                                value={this.state.departmentFilter}
                                menuItemStyle={menuItemStyle}
                                style={dropDownMenuStyle}
                                onChange={this.handleCategoryOptionChange}
                            >
                                {this.state.departments.map((item, idx) =>
                                    <MenuItem value={idx} key={idx} label={item} primaryText={item} />
                                )}
                            </DropDownMenu>
                        </div>
                    </MuiThemeProvider>
                </div>
                {items}
                <div ref={(el) => this.bottom = el}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: item => dispatch(addItemToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
