import React from 'react';

import '../assets/styles/components/Header.scss'
import avatar from '../assets/static/avatar.png';

export const Header = () => {
    return(
        <div className="header">
            <div className="header_logo">toMake</div>
            <div className="header_user">
                <div className="text_user">Hola, Manuel Castillo</div>
                <div className="picture">
                    <img src={avatar} width="40px" alt="" />  
                </div>                
            </div>
        </div>
    );
}