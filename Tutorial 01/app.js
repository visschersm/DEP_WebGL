var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'	fragColor = vertColor;',
'	gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

var fragmentShaderText = 
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'	gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

var InitDemo = function()
{
	console.log('This is working');
	
	var canvas = document.getElementById('game-surface');
	var gl = canvas.getContext('webgl');
	
	if(!gl)
	{
		console.log('WebGL not supported, failling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}
	
	if(!gl)
	{
		alert('Your browser does not support WebGL');
	}
	
	//canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;
	//gl.viewport(0, 0, window.innerWidth, window.innerHeight);
	
	gl.clearColor(0.39, 0.58, 0.93, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	
	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);
	
	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
	{
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}
	
	gl.compileShader(fragmentShader);
	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
	{
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}
	
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	
	if(!gl.getProgramParameter(program, gl.LINK_STATUS))
	{
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	
	gl.validateProgram(program);
	if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
	{
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}
	
	var triangleVertices = 
	[
		 0.0,  0.5,		1.0, 0.0, 0.0,
		-0.5, -0.5,		0.0, 1.0, 0.0,
		 0.5, -0.5,		0.0, 0.0, 1.0
	];
	
	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
	
	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	
	gl.vertexAttribPointer(
		positionAttribLocation,				// Attribute location
		2,									// Number of elements per attribute
		gl.FLOAT, 							// Type of elements
		gl.FALSE, 							// Is normalized2
		5 * Float32Array.BYTES_PER_ELEMENT,	// Size of an individual vertex
		0									// Offset from the beginning of a single vertex to this attribute
	);
		
	gl.vertexAttribPointer(
		colorAttribLocation,				// Attribute location
		3,									// Number of elements per attribute
		gl.FLOAT, 							// Type of elements
		gl.FALSE, 							// Is normalized2
		5 * Float32Array.BYTES_PER_ELEMENT,	// Size of an individual vertex
		2 * Float32Array.BYTES_PER_ELEMENT	// Offset from the beginning of a single vertex to this attribute
	);
	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);
	
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
};

