precision mediump float;
varying vec2 vUV;
uniform vec2 iResolution;
uniform float iTime;
uniform sampler2D typeIcon;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // UV Alterations
    vec2 uv = vUV;
    vec2 aspectCorrectedUV = uv;
    aspectCorrectedUV.x *= iResolution.x / iResolution.y;
    vec2 flippedUV = vec2(aspectCorrectedUV.x, 1.0 - aspectCorrectedUV.y);

    // Wave Mask
    float sine = sin(uv.x * 2.0 + (iTime * 0.2)) * 0.1 + 0.2;
    float sine_2 = sin(uv.x * 5.0 + (iTime * 0.5)) * 0.05;
    float sine_3 = sin(uv.x * 12.0 + (iTime * 1.1)) * 0.02;
    float mask = step(uv.y, sine + sine_2 + sine_3);

    for ( int i = 1; i < 10; i++) {
        float rand_x = random(vec2(float(i), float(i)));
        rand_x *= (iResolution.x / iResolution.y);

        float time_offset = random(vec2(float(i + 2), float(i + 2))) * 40.0;
        float speed_offset = (random(vec2(float(i + 3), float(i + 3))) * 0.04) + 0.01;
        float scale_factor = (random(vec2(float(i + 5), float(i + 5))) + 1.0) * 7.0;

        vec2 floatingUV = vec2(flippedUV.x - (rand_x), fract(flippedUV.y + ((iTime + time_offset) * abs(speed_offset))));
        vec4 textureColor = texture2D(typeIcon, floatingUV * scale_factor);

        mask = max(mask, textureColor.r);
    }

    gl_FragColor = vec4(vec3(0.0, 0.0, 0.1), mask);
    
}