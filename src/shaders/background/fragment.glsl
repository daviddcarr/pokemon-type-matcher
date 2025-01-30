precision mediump float;
varying vec2 vUV;
uniform vec2 iResolution;
uniform float iTime;
uniform sampler2D typeIcon;

#define PI 3.1415926538

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // UV Alterations
    vec2 uv = vUV;
    vec2 arUv = uv;
    arUv.x *= iResolution.x / iResolution.y;
    vec2 fUv = vec2(arUv.x, 1.0 - arUv.y);
    vec2 cUv = vec2((iResolution.x / iResolution.y * 0.5), 0.5);


    // Spinning Spokes
    float mask = 0.0;

    float angle = atan(arUv.x - (iResolution.x / iResolution.y * 0.5), arUv.y - 0.5) / (PI * 4.0) - (iTime * 0.005);
    float center_radius = 1.0 - distance(arUv, cUv);
    float radius_reduced = pow(center_radius, 3.0);
    
    float spokes = sin(angle * 100.0);
    spokes = spokes * radius_reduced;

    mask = max(spokes, pow(radius_reduced, 1.5));


    float angle_2 = atan(arUv.x - (iResolution.x / iResolution.y * 0.5), arUv.y - 0.5) / (PI * 4.0) - (iTime * 0.003);
    float center_radius_2 = 1.0 - distance(arUv, cUv);
    float radius_reduced_2 = pow(center_radius_2, 2.95);
    
    float spokes_2 = sin(angle_2 * 200.0);
    spokes_2 = spokes_2 * radius_reduced_2;
    spokes_2 = max(spokes_2, pow(radius_reduced_2, 1.2));

    mask = max(mask, spokes_2);

    // Icon Paritcles
    float icons = 0.0;
    for ( int i = 1; i < 10; i++) {
        float rand_x = random(vec2(float(i), float(i)));
        rand_x *= (iResolution.x / iResolution.y);

        float time_offset = random(vec2(float(i + 2), float(i + 2))) * 40.0;
        float speed_offset = (random(vec2(float(i + 3), float(i + 3))) * 0.04) + 0.01;
        float scale_factor = (random(vec2(float(i + 5), float(i + 5))) + 1.0) * 7.0;

        vec2 floatingUV = vec2(fUv.x - (rand_x), fract(fUv.y + ((iTime + time_offset) * abs(speed_offset))));
        vec4 textureColor = texture2D(typeIcon, floatingUV * scale_factor);

        icons = max(icons, textureColor.r);
    }
    mask = max(mask, icons * 0.2);

    gl_FragColor = vec4(vec3(0.0, 0.0, 0.03), mask);
    
}