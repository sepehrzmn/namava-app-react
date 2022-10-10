import React from "react";

const Header = ({ data }) => {
    console.log(data);
    return (
        <header>
            <nav>{data.map((item) => item.caption)}</nav>
        </header>
    );
};

export default Header;
