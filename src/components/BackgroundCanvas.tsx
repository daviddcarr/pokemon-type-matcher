import { useEffect, useRef } from "react";
import useApp from "@lib/useApp";

import fragment from "@shaders/background/fragment.glsl";
import vertext from "@shaders/background/vertex.glsl"

const loadTexture = (gl: WebGLRenderingContext, url: string) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Setup texture defaults
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const image = new Image();
  image.src = url;
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      image
    );
    gl.generateMipmap(gl.TEXTURE_2D);
  };

  return texture;
};


export default function BackgroundCanvas() {
  const { selectedType } = useApp();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvasRef.current.getContext("webgl");
    if (!gl) {
      console.error("❌ WebGL not supported on this device.");
      return;
    }

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const compileShader = (source: string, type: number) => {
        const shader = gl.createShader(type);
        if (!shader) throw new Error("Shader creation failed.");
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error("Shader compile error:", gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

    const vertexSahder = compileShader(vertext, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragment, gl.FRAGMENT_SHADER);
    if (!vertexSahder || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) throw new Error("Failed to create program");
    gl.attachShader(program, vertexSahder);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(`Failed to link program: ${gl.getProgramInfoLog(program)}`);
        gl.deleteProgram(program);
        return;
    }

    gl.useProgram(program);


    const vertices = new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        1, 1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);



    const iResolution = gl.getUniformLocation(program, "iResolution");
    const iTime = gl.getUniformLocation(program, "iTime");

    const texture = loadTexture(gl, `/masks/${selectedType?.name}.png`);
    const typeTextureLocation = gl.getUniformLocation(program, "typeIcon");

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(typeTextureLocation, 0);

    const startTime = performance.now();
    const render = () => {
        const currentTime = (performance.now() - startTime) / 1000;
        gl.uniform2f(iResolution, canvas.width, canvas.height);
        gl.uniform1f(iTime, currentTime);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(render);
    }
    render();

    return () => {
        window.removeEventListener("resize", resizeCanvas);
        gl.deleteProgram(program);
        gl.deleteShader(vertexSahder);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(buffer);
    }

  }, [selectedType]);

  const classes = "absolute inset-0 w-full h-full opacity-50 dark:opacity-90"

  return <canvas ref={canvasRef} className={classes} />;
}