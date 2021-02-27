import React, { Component } from 'react';
import Header from './../../components/Header/Header';
import MenuHeader from './../../components/MenuHeader/MenuHeader';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header/>
                <MenuHeader/>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;