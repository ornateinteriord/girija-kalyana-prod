const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// #1a4f72 -> #9E1B47 (Ruby Red)
const color1Regex = /#1a4f72/gi;
const color1Replacement = '#9E1B47'; 

// #2196f3 -> #E91E63 (Bright Rose/Pink)
const color2Regex = /#2196f3/gi;
const color2Replacement = '#E91E63'; 

// #0f3047 -> #4A0E2E (Deep Burgundy)
const color3Regex = /#0f3047/gi;
const color3Replacement = '#4A0E2E'; 

// #081d2d -> #2D081C (Very Dark Burgundy)
const color4Regex = /#081d2d/gi;
const color4Replacement = '#2D081C'; 

// #e3f2fd -> #FCE4EC (Soft Pink/White)
const color5Regex = /#e3f2fd/gi;
const color5Replacement = '#FCE4EC'; 

// rgba(26, 79, 114, -> rgba(158, 27, 71, (matching #9E1B47 RGB)
const rgba1Regex = /rgba\(26,\s*79,\s*114,/gi;
const rgba1Replacement = 'rgba(158, 27, 71,';

// rgba(33, 150, 243, -> rgba(233, 30, 99, (matching #E91E63 RGB)
const rgba2Regex = /rgba\(33,\s*150,\s*243,/gi;
const rgba2Replacement = 'rgba(233, 30, 99,';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);
let changedCount = 0;

files.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.scss')) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content
            .replace(color1Regex, color1Replacement)
            .replace(color2Regex, color2Replacement)
            .replace(color3Regex, color3Replacement)
            .replace(color4Regex, color4Replacement)
            .replace(color5Regex, color5Replacement)
            .replace(rgba1Regex, rgba1Replacement)
            .replace(rgba2Regex, rgba2Replacement);
            
        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            changedCount++;
            console.log(`Updated ${file}`);
        }
    }
});

console.log(`Finished updating ${changedCount} files.`);
