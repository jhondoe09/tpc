const version = '1.0.4';
let production = true;
let local = false;
const maintenance = false;
let debugging_mode = false;
const time = 30;
let indexScript = document.createElement('script');
let mainScript = document.createElement('script');

indexScript.src = `./frontend/js/index_${version}.js`;
mainScript.src = `./frontend/js/cwp_${version}.js?version=${version}&cacheBust=${Date.now()}`;

const ip = '195';

// INDEX JS
function indexProdFunction(production) {
    if (production) {
        fetchURL1 = 'https://172.16.2.13/tpc_ver2/backend/query/queries.php';
        fetchURL2 = 'https://172.16.2.13/tpc_ver2/backend/endpoint/endpoint.php';
        fetchURLForConnection = `https://172.16.2.13/tpc_ver2/backend/query/queries.php`;
        if (debugging_mode) {
            console.log(fetchURL1, fetchURL2, fetchURLForConnection);
        }

    } else {
        fetchURL1 = `https://172.16.2.${ip}:4443/tpc_ver2/backend/query/queries.php`;
        fetchURL2 = `https://172.16.2.${ip}:4443/tpc_ver2/backend/endpoint/endpoint.php`;
        fetchURLForConnection = `https://172.16.2.${ip}:4443/tpc_ver2/backend/query/queries.php`;
        if (debugging_mode) {
            console.log(fetchURL1, fetchURL2, fetchURLForConnection);
        }

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
        fetchURLForConnection2 = `https://172.16.2.13/tpc_ver2/backend/query/queries.php`;
        if (debugging_mode) {
            console.log(linkURL, fetchURL, fetchURLQuery, fetchIC, fetchURLForConnection2);
        }

    } else {
        linkURL = `https://172.16.2.${ip}:4443`;
        fetchURL = `https://172.16.2.${ip}:4443/tpc_ver2/backend/query/queries.php`;
        fetchURLQuery = `https://172.16.2.${ip}:4443/tpc_ver2/backend/endpoint/query.php`;
        fetchIC = `https://172.16.2.${ip}:4443/tpc_ver2/backend/query/view_ic.php`;
        fetchURLForConnection2 = `https://172.16.2.${ip}:4443/tpc_ver2/backend/query/queries.php`;
        if (debugging_mode) {
            console.log(linkURL, fetchURL, fetchURLQuery, fetchIC, fetchURLForConnection2);
        }

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

