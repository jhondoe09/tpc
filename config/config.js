const version = '1.0.3';
let production = false;
let local = false;
const maintenance = false;
const time = 30;
let indexScript = document.createElement('script');
let mainScript = document.createElement('script');

indexScript.src = `./frontend/js/index.js?v=${version}`;
mainScript.src = `./frontend/js/cwp.js?v=${version}`;

const ip = '195';

// INDEX JS
function indexProdFunction(production) {
    if (production) {
        fetchURL1 = 'https://172.16.2.13/tpc_ver2/backend/query/queries.php';
        fetchURL2 = 'https://172.16.2.13/tpc_ver2/backend/endpoint/endpoint.php';
        console.log(fetchURL1, fetchURL2);
    } else {
        fetchURL1 = `https://172.16.2.${ip}:4443/tpc_ver2/backend/query/queries.php`;
        fetchURL2 = `https://172.16.2.${ip}:4443/tpc_ver2/backend/endpoint/endpoint.php`;
        console.log(fetchURL1, fetchURL2);
    }

    document.body.appendChild(indexScript);
    // console.log(indexScript);
}

// CWP JS
function cwpProdFunction(production) {
    if (production) {
        linkURL = 'https://172.16.2.13';
        fetchURL = 'https://172.16.2.13/tpc_ver2/backend/query/queries.php';
        fetchURLQuery = 'https://172.16.2.13/tpc_ver2/backend/endpoint/query.php';
        fetchIC = 'https://172.16.2.13/tpc_ver2/backend/query/view_ic.php';
        console.log(linkURL, fetchURL, fetchURLQuery, fetchIC);
    } else {
        linkURL = `https://172.16.2.${ip}:4443`;
        fetchURL = `https://172.16.2.${ip}:4443/tpc_ver2/backend/query/queries.php`;
        fetchURLQuery = `https://172.16.2.${ip}:4443/tpc_ver2/backend/endpoint/query.php`;
        fetchIC = `https://172.16.2.${ip}:4443/tpc_ver2/backend/query/view_ic.php`;
        console.log(linkURL, fetchURL, fetchURLQuery, fetchIC);
    }
    document.body.appendChild(mainScript);
    // console.log(mainScript);
}

function contentType(type) {
    switch (type) {
        case "index":
            indexProdFunction(production);
            break;
        case "main":
            cwpProdFunction(production);
            break;
    }
}

