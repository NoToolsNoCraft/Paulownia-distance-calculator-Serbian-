const treeData = [
    {"tree_type": "Paulovnija Shantong Hibrid F1", "firewood": "2x2", "industrial": "4x4"},
    
];

function populateTreeTypes() {
    const treeTypeSelect = document.getElementById('treeType');
    treeData.forEach(tree => {
        const option = document.createElement('option');
        option.value = tree.tree_type;
        option.text = tree.tree_type;
        treeTypeSelect.appendChild(option);
    });
}

function updateSuggestedValues() {
    const treeType = document.getElementById('treeType').value;
    const suggestedValuesDiv = document.getElementById('suggestedValues');
    suggestedValuesDiv.innerHTML = '';

    const tree = treeData.find(tree => tree.tree_type === treeType);
    if (tree) {
        const firewood = tree.firewood || 'N/A';
        const fruit = tree.fruit || 'N/A';
        const industrial = tree.industrial || 'N/A';

        suggestedValuesDiv.innerHTML = `
            <p><strong>Preporučeni razmak između sadnica:</strong></p>
            <p>=> Proizvodnja drva za loženje: ${firewood}m</p>
            <p>=> Proizvodnja drva za građevinski materijal: ${industrial}m</p>
        `;
    }
}

function updateLandSize() {
    const landWidth = parseFloat(document.getElementById('landWidth').value);
    const landHeight = parseFloat(document.getElementById('landHeight').value);
    const unit = document.getElementById('unit').value;
    const landSizeDiv = document.getElementById('landSize');

    if (!isNaN(landWidth) && !isNaN(landHeight)) {
        let landSizeText = `Veličina zemljišta: ${landWidth} x ${landHeight} ${unit}`;
        let area = landWidth * landHeight;

        if (unit === 'metara') {
            landSizeText += ` = ${area.toFixed(2)} m²`;
            if (area >= 100) {
                landSizeText += ` = ${(area / 10000).toFixed(2)} hektara`;
            }
        } else {
            landSizeText += ` = ${area.toFixed(2)} m²`;
        }

        landSizeDiv.innerHTML = landSizeText;
    } else {
        landSizeDiv.innerHTML = '';
    }
}

function calculateTrees() {
const distanceX = parseFloat(document.getElementById('distanceX').value);
const distanceY = parseFloat(document.getElementById('distanceY').value);
const landWidth = parseFloat(document.getElementById('landWidth').value);
const landHeight = parseFloat(document.getElementById('landHeight').value);
const plantingStyle = document.querySelector('input[name="plantingStyle"]:checked').value;
const denominator = (Math.pow(distanceX, 2) * 0.866);


if (!distanceX || !distanceY || !landWidth || !landHeight) {
document.getElementById('result').innerText = 'Molim vas popunite sva polja!';
return;
}

let totalTrees = 0;
const numTreesX = Math.floor(landWidth / distanceX) + 1;
const numTreesY = Math.floor(landHeight / distanceY) + 1;
const distance = distanceX * 2;
const area = landWidth * landHeight;
    

switch (plantingStyle) {
    case 'Square':
        if (distanceX !== distanceY) {
            document.getElementById('result').innerText = 'U kvadratnom sistemu, razmaci između sadnica moraju biti jednaki (vrednost X i Y (dužine i širine) mora biti isti).';
            return;
        }
        totalTrees = Math.floor(landWidth / distanceX) * Math.floor(landHeight / distanceY);
        break;

    case 'Rectangular':
        if (distanceX === distanceY) {
            document.getElementById('result').innerText = 'U pravougaonom sistemu, razmaci između sadnica moraju biti različiti (vrednost X i Y (dužine i širine) se mora razlikovati).';
            return;
        }
        totalTrees = Math.floor(landWidth / distanceX) * Math.floor(landHeight / distanceY);
        break;


case 'Hexagonal':
        if (distanceX !== distanceY) {
        document.getElementById('result').innerText = 'U šestougaonom sistemu, razmaci između sadnica moraju biti jednaki (vrednost X i Y mora biti isti).';
        return;
        }
        
        totalTrees = (landWidth * landHeight) / denominator;

        
    break;

default:
    document.getElementById('result').innerText = 'Invalid planting style selected.';
    return;
}

document.getElementById('result').innerText = `Optimalan broj stabala koja se mogu posaditi na ovom zemljištu: ${totalTrees}`;
checkSpecialComment();
}


function checkSpecialComment() {
const distanceX = parseFloat(document.getElementById('distanceX').value);
const distanceY = parseFloat(document.getElementById('distanceY').value);
const landWidth = parseFloat(document.getElementById('landWidth').value);
const landHeight = parseFloat(document.getElementById('landHeight').value);
const plantingStyle = document.querySelector('input[name="plantingStyle"]:checked').value;


const specialCommentDiv = document.getElementById('specialcomment');
specialCommentDiv.innerHTML = ''; // Clear previous comments

if (plantingStyle === 'Square') {
specialCommentDiv.innerHTML = '<b>Kvadratni sistem sadnje </b> je odličan za uzgoj paulovnije zbog efikasne upotrebe prostora i resursa. Postavljanjem stabala u mrežu, ovaj metod obezbeđuje ravnomerno rastojanje, omogućavajući svakom stablu dovoljno svetlosti, vode i hranljivih materija. Ova uniformnost podstiče zdrav rast i maksimizira prinos. Na primer, tipično rastojanje može biti 3 metra između stabala i 3 metra između redova, što optimizuje potencijal rasta svake paulovnije, dok olakšava održavanje.';
}

if (plantingStyle === 'Rectangular') {
specialCommentDiv.innerHTML = '<b>Pravougaoni sistem sadnje </b> je odličan za uzgoj paulovnije zbog efikasne upotrebe prostora i resursa. Postavljanjem stabala u mrežu, ovaj metod obezbeđuje ravnomerno rastojanje, omogućavajući svakom stablu dovoljno svetlosti, vode i hranljivih materija. Ova uniformnost podstiče zdrav rast i maksimizira prinos. Na primer, tipično rastojanje može biti 2 metra između stabala i 3 metra između redova, što optimizuje potencijal rasta svake paulovnije, dok olakšava održavanje.';
}

if (plantingStyle === 'Hexagonal') {
specialCommentDiv.innerHTML = '<b>Šestougaoni (trougaoni)</b> metod omogućava optimalno korišćenje prostora što minimizira prazne prostore između njih. Time se povećava broj stabala po jedinici površine, čime se poboljšava prinos i efikasnost. Takođe, ova metoda omogućava bolje pristupanje svakom stablu, olakšavajući održavanje i berbu. Uz to, ravnoteža svetlosti i hranljivih materija je bolja zbog smanjenog senčenja među stablima.';
}
}



window.onload = function() {
    populateTreeTypes();
}