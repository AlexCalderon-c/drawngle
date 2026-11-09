import { Component, type ErrorInfo, type ReactNode, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { TransformControls } from '@react-three/drei'
import { Mesh } from 'three';
import { useSearchStore } from '../../store/useSearchStore';
import { getAngleCategory, getSearchTag } from '../../utils/angleDetection';

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

export function CubeCanvas() {
  const setQuery = useSearchStore((state) => state.setQuery);
  const [mesh, setMesh] = useState<Mesh | null>(null);
  const [detectedAngle, setDetectedAngle] = useState<string>('Front');

  const handleMesh = useCallback((m: Mesh | null) => {
    if (m) setMesh(m);
  }, []);

  const handleTransform = (event: any) => {
    if (event.target && event.target.object) {
      const rotationY = event.target.object.rotation.y;
      const category = getAngleCategory(rotationY);
      setDetectedAngle(category);
      const tag = getSearchTag(category);
      setQuery(tag);
    }
  };

  return (
    <div className="w-full h-full relative z-100 triangle-form" role="region" aria-label="3D Viewport">
      <div className="absolute top-4 left-4 z-10 bg-zinc-950/80 border border-zinc-800 px-3 py-1.5 rounded-md text-xs text-zinc-300 backdrop-blur">
        Detected Angle: <span className="font-semibold text-indigo-400">{detectedAngle}</span>
      </div>

      <WebGLErrorBoundary>
        <Canvas
          gl={{ alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          camera={{ position: [0, 7, 0], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={1} />
          {mesh && (
            <TransformControls 
              mode="rotate" 
              object={mesh} 
              onChange={handleTransform}
              showX={false}
              showZ={false}
            />
          )}
          <mesh ref={handleMesh} rotation={[0.61, 0.78, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color="#eee" />
          </mesh>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
