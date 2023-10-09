let {exec} = require('child_process'),
	fs = require('fs');
exec('compile.bat', (error, stdout, stderr) => {

	console.log(stdout || stderr || err, '\n');
	
	let input = fs.readFileSync('output.js').toString()
	
		.replace('=a=>{if(a)return Object.values(a.pool)},', '=a=>Object.values(a.pool),')
		.replace(/=>a&&/g, '=>')
		.replace(/Math.ceil\(Math\.random\(\)\)&&/g, '');
	
	fs.writeFileSync('postprocessed.js', input);
	console.log('im finished')

	setTimeout(()=>{}, 60_000);
});

