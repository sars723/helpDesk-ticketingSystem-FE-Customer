import React from 'react'
import TopHeader from './headers/TopHeader'
import MiddleHeader from './headers/MiddleHeader'
import BottomHeader from './headers/BottomHeader'
import './Header.css'
const Header = () => {
    return (
        <div className="header">
            <TopHeader/>
            <MiddleHeader/>
            <BottomHeader/>
        </div>
    )
}

export default Header
