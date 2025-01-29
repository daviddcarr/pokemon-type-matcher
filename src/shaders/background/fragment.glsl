precision mediump float;
varying vec2 vUV;
uniform vec2 iResolution;
uniform float iTime;
uniform sampler2D typeIcon;

float get_particle_x(int i) {
    return (sin(float(i)) * 0.5) * (sin(float(i) * 6.0) + 0.5) * 1.75 + 0.5;
}

void main() {
    vec2 uv = vUV;
    vec2 aspectCorrectedUV = uv;

    aspectCorrectedUV.x *= iResolution.x / iResolution.y;

    vec2 flippedUV = vec2(aspectCorrectedUV.x, 1.0 - aspectCorrectedUV.y);

    vec3 col = vec3(0.0);

    float sine = sin(uv.x * 2.0 + (iTime * 0.2)) * 0.1 + 0.2;
    float sine_2 = sin(uv.x * 5.0 + (iTime * 0.5)) * 0.05;
    float sine_3 = sin(uv.x * 12.0 + (iTime * 1.1)) * 0.02;
    float mask = step(uv.y, sine + sine_2 + sine_3);


    float finalMask = mask;
    for ( int i = 1; i < 10; i++) {
        float particle_x = get_particle_x(i);
        float time_offset = get_particle_x(i + 2) * 40.0;
        float speed_offset = get_particle_x(i + 3) * 0.05;
        float scale_factor = get_particle_x(i + 5) * 50.0;

        vec2 floatingUV = vec2(flippedUV.x - abs(particle_x), fract(flippedUV.y + ((iTime + abs(time_offset)) * abs(speed_offset))));
        vec4 textureColor = texture2D(typeIcon, floatingUV * min(15.0, scale_factor));

        finalMask = max(finalMask, textureColor.r);
    }

    gl_FragColor = vec4(vec3(0.0), finalMask);
    
}