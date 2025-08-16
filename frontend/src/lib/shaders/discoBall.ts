// frontend/src/lib/shaders/discoBall.ts

export const vertexShader = `
  attribute float aCategory;
  attribute float aCompleteness;
  attribute float aSelected;

  uniform float time;
  uniform float maxOffset;

  varying vec3 vColor;

  void main() {
    vec3 transformed = position;

    // Calculate protrusion based on completeness
    float protrusion = smoothstep(0.0, 1.0, aCompleteness) * maxOffset;
    transformed += normal * protrusion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

export const fragmentShader = `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;