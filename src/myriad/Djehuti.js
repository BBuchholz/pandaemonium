import { Wxrd } from './Wxrd';
import { MDWxrd } from './MDWxrd';

export class Djehuti {

	constructor(){

	}

	createWxrd(multiLineInput) {
 
		return new Wxrd(multiLineInput);
	}

	createMDWxrd(multiLineInput) {
 
 		let newWxrd = new MDWxrd(multiLineInput);

 		this.parseMD(newWxrd);

 		// console.log(newWxrd);

		return newWxrd;
	}

	startsWithADivider(multiLineInput) {

		let found = false;

		if(multiLineInput.trim().startsWith('---')){
			
			found = true;
		}

		return found;
	}

	parseMD(wxrd) {

		if(this.startsWithADivider(wxrd.markDown)){

			// console.log('found opening divider');

			// set to false here, will flip to true on first
			// line in for loop below, then back to false
			// when it finds the next divider
			let inFrontMattter = false;
			let frontMatterClosed = false;
			// let outOfFrontMatter = true; 
			let dividerCount = 0;

			const lines = this.splitToLines(wxrd.markDown);

			// console.log('lines found: ' + lines.length);

			let parsedContent = '';
			let lineCount = 0;
			let frontMatterLines = [];

			for (const line of lines){

				lineCount++;
				// console.log('begin processing line ' + lineCount);

				if(this.startsWithADivider(line)){

					// console.log('closing divider found');

					// we found a divider, toggle status
					// which was initialized to false above
					// if its the first we'll become true
					// if its the second it'll become false
					inFrontMattter = !inFrontMattter;
					dividerCount++;

					// if(dividerCount < 2){
					// 	outOfFrontMatter = false;
					// }
				}

				// console.log("inFrontMattter: " + inFrontMattter);
				// console.log("dividerCount: " + dividerCount);

				if(inFrontMattter && dividerCount < 2){

					// ignore divider lines and empty lines

					frontMatterLines.push(line);
					// console.log('frontMatterLines: ' + frontMatterLines);

					// console.log('front matter line prior to trim: ' + line);

					// const trimmedLine = line.replace(/-/g, '').trim();

					const trimmedLine = line;

					if(trimmedLine){

						// console.log('processing line: ' + trimmedLine);

						const metaKey = trimmedLine.slice(0, trimmedLine.indexOf(':')).trim();
						const metaValue = trimmedLine.slice(trimmedLine.indexOf(':') + 1).trim();

						if(!metaValue.startsWith('-')){

						wxrd.metaData[metaKey] = metaValue;	
						}

					} else {

						// console.log('ignoring empty line');
					}

				} else if (dividerCount == 2 && 
						   !frontMatterClosed) {

					// add the closing divider to front matter
					frontMatterLines.push(line);
					frontMatterClosed = true;

				} else {

					// console.log(wxrd);

					// console.log("line of content: " + line);
					// console.log(dividerCount);

					if(!this.startsWithADivider(line) ||
						dividerCount > 2){

						parsedContent += line;	
					}
				
				}


				// console.log('end processing line ' + lineCount);

			}

			// console.log('finished front matter lines: ' + frontMatterLines);

			wxrd.content = parsedContent;
			wxrd.frontMatter = frontMatterLines.join('\n');

			// console.log(wxrd);
		}
	}

	splitToLines(multiLineInput) {

		return multiLineInput.split('\n');
	}


	// TODO: Mimic createWxrd to implement createMarkDown

	importWxrdFromJson(jsonString) {

		if(!this.hasJsonStructure(jsonString)){

			throw "can't import json from non-json string";
		}

		const parsed = JSON.parse(jsonString);

		return new Wxrd(parsed);
	}

	importMDWxrdFromJson(jsonString) {

		if(!this.hasJsonStructure(jsonString)){

			throw "can't import json from non-json string";
		}

		const parsed = JSON.parse(jsonString);

		return new MDWxrd(parsed);
	}

	hasJsonStructure(str) {
	
		// adapted from: https://stackoverflow.com/a/52799327/670768
		if (typeof str !== 'string') {
			return false;
		}

	    try {
	    
	        const result = JSON.parse(str);
	        const type = Object.prototype.toString.call(result);
	        return type === '[object Object]' 
	            || type === '[object Array]';
	    
	    } catch (err) {
	    
	        return false;
	    }
	}
}