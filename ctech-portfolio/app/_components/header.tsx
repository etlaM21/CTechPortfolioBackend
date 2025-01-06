"use client"

import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Header() {
    const headerRef = useRef(null);
    const [mousePos, setMousePos] = useState({
        left: 0,
        top: 0
    });
    document.addEventListener('mousemove', (e) => {
        const xPosPercent = e.pageX / document.body.clientWidth;
        setMousePos({left: xPosPercent, top: e.pageY}); 
    });
    return(
        <div className="header" ref={headerRef} style={{borderImageSource: `linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(31,110,181,1) ${mousePos.left * 100 - 24 + "%"}, rgba(156,134,62,1) ${mousePos.left * 100 + "%"}, rgba(105,9,121,1) ${mousePos.left * 100 + 16 + "%"}, rgba(2,0,36,0) 100%)`}}>
            <nav>
                <div className="logo"><h1>MyPortfolio</h1></div>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                </ul>
        </nav>
      </div>
    );
}