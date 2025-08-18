export const discoBallVertexShader = `#version 300 es
  precision highp float;
  in vec3 position;
  in vec3 normal;
  in vec2 uv;
  attribute float aCategory;
  attribute float aCompleteness;
  attribute float aSelected;

  uniform float uTime;
  uniform float uMaxOffset;
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;

  out vec3 vNormal;
  out vec3 vViewDir;
  out float vCompleteness;
  out float vSelected;
  flat out int vCategory;

  void main() {
    // base position and normal
    vec3 transformed = position;
    vec3 n = normalize(normal);

    // Protrusion scaled by completeness and selection (selected pops further)
    float base = smoothstep(0.0, 1.0, aCompleteness);
    float selBoost = aSelected * 0.35;
    float protrusion = (base * (1.0 + selBoost)) * uMaxOffset;

    transformed += n * protrusion;

    // output for fragment shader
    vNormal = mat3(modelViewMatrix) * n;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    vCompleteness = aCompleteness;
    vSelected = aSelected;
    vCategory = int(aCategory);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const discoBallFragmentShader = `#version 300 es
  precision highp float;
  in vec3 vNormal;
  in vec3 vViewDir;
  in float vCompleteness;
  in float vSelected;
  flat in int vCategory;

  out vec4 outColor;

  // brand colors (rgb 0..1)
  const vec3 primary = vec3(0.357, 0.357, 0.847); // #5B5BD6
  const vec3 categoryColors[8] = vec3[8](
    vec3(0.376, 0.647, 0.980), // Childhood #60A5FA
    vec3(0.204, 0.827, 0.600), // Personality #34D399
    vec3(0.961, 0.624, 0.043), // Career #F59E0B
    vec3(0.957, 0.447, 0.714), // Relationships #F472B6
    vec3(0.518, 0.800, 0.086), // Health #84CC16
    vec3(0.655, 0.545, 0.980), // Habits #A78BFA
    vec3(0.133, 0.827, 0.933), // Location #22D3EE
    vec3(0.580, 0.600, 0.722)  // Misc #94A3B8
  );

  // small time-based hue shimmer
  vec3 hueShift(vec3 color, float t, int idx) {
    float shift = 0.02 * sin(t * 1.2 + float(idx));
    vec3 c = color;
    c.r += shift * 0.6;
    c.g += shift * 0.3;
    c.b -= shift * 0.2;
    return clamp(c, 0.0, 1.0);
  }

  void main() {
    // base color mix from primary -> category by completeness
    vec3 cat = categoryColors[clamp(vCategory, 0, 7)];
    vec3 base = mix(primary, cat, clamp(vCompleteness, 0.0, 1.0));

    // fresnel/specular highlight for mirror-like tiles
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0) * 0.9;

    // subtle time shimmer
    vec3 shimmer = hueShift(base, uTime * 0.5, vCategory);

    // selection glow increases brightness & slight tint
    float sel = clamp(vSelected, 0.0, 2.0);
    vec3 selectedTint = mix(shimmer, vec3(1.0, 0.98, 0.92), smoothstep(0.0, 1.0, sel));

    // final color composition: base + fresnel * highlight + selection
    vec3 color = selectedTint + fresnel * vec3(1.0) * 0.25;
    color = mix(shimmer, color, 0.6);

    // small rim lighting using normal and view angle
    float rim = smoothstep(0.0, 0.8, 1.0 - dot(N, V)) * 0.18 * (1.0 + sel * 0.5);
    color += rim * vec3(1.0, 0.9, 0.85) * 0.6;

    outColor = vec4(color, 1.0);
  }
`;