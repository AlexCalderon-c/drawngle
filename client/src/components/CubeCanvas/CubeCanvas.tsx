import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGL initialization error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full w-full bg-zinc-900 text-zinc-300 p-4 text-center">
          <p>WebGL initialization failed or is not supported in your environment.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function CubeMesh() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#eee" />
    </mesh>
  );
}

export function CubeCanvas() {
  return (
    <div className="w-full h-[80%] max-h-full  relative z-100 triangle-form" role="region" aria-label="3D Viewport">
      <WebGLErrorBoundary>
        <Canvas
          gl={{ alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          camera={{ position: [0, 7, 0], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={1} />
          <CubeMesh />
          <OrbitControls enableRotate={true}/>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
