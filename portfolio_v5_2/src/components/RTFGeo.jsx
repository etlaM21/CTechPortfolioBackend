import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// https://codesandbox.io/p/sandbox/rrppl0y8l4?file=%2Fsrc%2FApp.js%3A29%2C3-38%2C4

function Geo(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        ref.current.rotation.x += (delta * 0.5);
        ref.current.rotation.y += (delta * 0.2);
    })

    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={2.5}
        // scale={clicked ? 3 : 2.5}
        // onClick={(event) => click(!clicked)}
        // onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}>
        <icosahedronGeometry args={[1, 1, 1]} />
        {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'blue'}/> */}
        <meshNormalMaterial flatShading={true}/>
      </mesh>
    )
}


const HeaderRTF = () => {
    return (
        <Canvas>
            <Geo position={[0, 0, 0]} />
            <OrbitControls />
        </Canvas>
    );
}

export default HeaderRTF;