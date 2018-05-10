import React, {Component} from "react";
import {DropDownMenu, MenuItem, MuiThemeProvider} from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

require('./stylesheets/Filters.css');

let dropDownMenuStyle = {
    margin: '0.5em'
};

let menuItemStyle = {
    color: 'black'
};

export default class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <div className="product-filters">
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                    <p id="filters-subtitle">
                        Sort by country:
                    </p>
                    <DropDownMenu
                        value={this.state.value}
                        menuItemStyle={menuItemStyle}
                        style={dropDownMenuStyle}
                        onChange={this.handleChange}
                    >
                        {this.props.countries.map((item, idx) =>
                            <MenuItem value={idx} label={item} primaryText={item} />
                        )}
                    </DropDownMenu>
                </MuiThemeProvider>
            </div>
        );
    }
}