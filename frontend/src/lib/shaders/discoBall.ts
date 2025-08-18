export const discoBallVertexShader = `
  attribute float aCategory;
  attribute float aCompleteness;
  attribute float aSelected;

  uniform float uTime;
  uniform float uMaxOffset;

  varying vec3 vColor;

  void main() {
    vec3 transformed = position;

    // Offset along normal by protrusion = smoothstep(0,1,aCompleteness) * maxOffset
    float protrusion = smoothstep(0.0, 1.0, aCompleteness) * uMaxOffset;
    transformed += normal * protrusion;

    // Calculate color based on category and completeness
    vec3 primaryColor = vec3(0.357, 0.357, 0.847); // #5B5BD6
    vec3 categoryColors[8];
    categoryColors[0] = vec3(0.376, 0.647, 0.980); // Childhood: #60A5FA
    categoryColors[1] = vec3(0.204, 0.827, 0.600); // Personality: #34D399
    categoryColors[2] = vec3(0.961, 0.624, 0.043); // Career: #F59E0B
    categoryColors[3] = vec3(0.957, 0.447, 0.714); // Relationships: #F472B6
    categoryColors[4] = vec3(0.518, 0.800, 0.086); // Health: #84CC16
    categoryColors[5] = vec3(0.655, 0.545, 0.980); // Habits: #A78BFA
    categoryColors[6] = vec3(0.133, 0.827, 0.933); // Location: #22D3EE
    categoryColors[7] = vec3(0.580, 0.600, 0.722); // Misc/Notes: #94A3B8

    vColor = mix(primaryColor, categoryColors[int(aCategory)], aCompleteness);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

export const discoBallFragmentShader = `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;