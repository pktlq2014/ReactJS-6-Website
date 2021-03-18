import React, { Component } from 'react';
import Header from './../../components/Header/Header';
import MenuHeader from './../../components/MenuHeader/MenuHeader';
import Footer from './../../components/Footer/Footer';
class Layout extends Component {
    render() {
        return (
            <div>
                <Header/>
                <MenuHeader/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default Layout;