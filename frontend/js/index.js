// FOR DEBUGGING
// const fetchURL1 = 'https://172.16.2.61/tpc_ver2/backend/query/queries.php';
// const fetchURL2 = 'https://172.16.2.61/tpc_ver2/backend/endpoint/endpoint.php';
// FOR DEPLOYMENT
const fetchURL1 = 'https://172.16.2.13/tpc_ver2/backend/query/queries.php';
const fetchURL2 = 'https://172.16.2.13/tpc_ver2/backend/endpoint/endpoint.php';


const urlParams = new URLSearchParams(window.location.search);
const assign_id = urlParams.get('assignment_id');
const qrCode = document.getElementById('qrCode');
console.log(assign_id);
qrCode.value = assign_id;
var div = document.getElementById('errorDiv');
const qrSubmitBtn = document.getElementById('QrSubmitBtn');

// window.onload = function() {

//     const enterKeyEvent = new KeyboardEvent('keydown', { keyCode: 13 });

//     qrCode.dispatchEvent(enterKeyEvent);
//   };

document.getElementById('qrCode').focus();

qrSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const string = document.getElementById('qrCode').value;
    const myStringArray = string.split('|');
    const item_code = myStringArray[0];
    const parts_number = myStringArray[1];
    const lot_number = myStringArray[2];
    const date_issued = myStringArray[3];
    const revision_number = myStringArray[4];
    const assignment_id = myStringArray[5];
    // console.log(`item_code${item_code},parts_number ${parts_number}, lot_number${lot_number}, date_issued${date_issued},revision_number ${revision_number}`);
    var sectionId = document.getElementById('sectionId').value;
    const data = new FormData();
    data.append('item_code', item_code);
    data.append('parts_number', parts_number);
    data.append('lot_number', lot_number);
    data.append('date_issued', date_issued);
    data.append('revision_number', revision_number);
    data.append('section_id', sectionId);
    data.append('assignment_id', assignment_id);
    data.append('QrSubmitBtn', 'true');
    fetch(fetchURL1, {
        method: 'POST',
        body: data
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('myData', JSON.stringify(data));
            localStorage.setItem('sectionId', JSON.stringify(sectionId));
            const thisData = JSON.parse(localStorage.getItem('myData'));
            console.log(thisData);
            if (thisData[0].assignment_status == 'Unposted') {
                var p = document.getElementById('errorP');
                p.textContent = 'The assignment ID that has been encoded has not been posted or made available for viewing!';
                div.classList.remove("hidden");
            }
            else if (thisData[0] == null || thisData[0] == '0') {
                var p = document.getElementById('errorP');
                p.textContent = 'Our database search did not yield any results that match the QR code provided. Please try again thank you!';
                div.classList.remove("hidden");
            }
            else {
                div.classList.add("hidden");
                window.location.href = 'main.php';
            }

        })
        .catch(error => {
            var p = document.getElementById('errorP');
            p.textContent = 'Our database search did not yield any results that match the QR code provided. Please try again thank you!';
            div.classList.remove("hidden");
            console.error(error);
        }
        );
});
function getSection() {
    var select = document.getElementById('sectionId');
    fetch(fetchURL2)
        .then(response => response.json())
        .then(datas => {
            for (let data of datas) {
                const option = `<option value="${data.section_code ? data.section_code : ''}">${data.section_code ? data.section_code : ''}</option>`
                select.innerHTML += option;
            }
        })
        .catch(error => {
            console.error(error);
        });
}
getSection();
