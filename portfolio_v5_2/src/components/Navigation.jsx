import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';


const Navigation = () => {
    const headerRef = useRef(null);
    const [mousePos, setMousePos] = useState({
        left: 0,
        top: 0
    });
    document.addEventListener('mousemove', (e) => {
        const xPosPercent = e.pageX / document.body.clientWidth;
        setMousePos({left: xPosPercent, top: e.pageY}); 
    });

    return (
        <div className="header" ref={headerRef} style={{borderImageSource: `linear-gradient(90deg, rgba(0, 145, 255, 0) 0%, rgba(103,184,240,1) ${mousePos.left * 100 - 24 + "%"}, rgba(128,155,252,1) ${mousePos.left * 100 + "%"}, rgba(195, 56, 210) ${mousePos.left * 100 + 16 + "%"}, rgba(2,0,36,0) 100%)`}}>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
        </div>
    );
}

export default Navigation;
