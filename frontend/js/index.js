document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    // console.log(production);
    // indexProdFunction(production);
    const new_body = `<body id="main" class="bg-gradient-to-r from-cyan-200 to-blue-400" style="font-family: 'Yu Gothic', sans-serif;">
<div class="container">
    <div class="col-md-12 h-100 d-flex align-items-center justify-content-center">
        <div class="container-fluid">
            <div class="card-body">
                <h5 class="card-title fw-bold text-center fs-1">We will be right back in<div id="countdown"></div></h5>
                <p class="card-text fs-1">We are currently implementing several fixes and will return shortly.</p>
                <p class="card-text text-center fs-1">Thank you!</p>
            </div>
        </div>
    </div>
</div>
</body>`;
    localStorage.setItem('new_body', new_body);
    if (maintenance) {
        document.body.innerHTML = '';
        document.body.style.fontFamily = 'Yu Gothic, sans-serif';
        document.body.innerHTML = localStorage.getItem('new_body');

        function initializeTimer(durationInMinutes) {
            let endTime = localStorage.getItem('countdownEndTime');

            if (!endTime) {
                endTime = new Date().getTime() + durationInMinutes * 60 * 1000;
                localStorage.setItem('countdownEndTime', endTime);
            }

            return endTime;
        }

        function startCountdown(endTime) {
            const countdownElement = document.getElementById('countdown');

            function updateTimer() {
                const now = new Date().getTime();
                const timeLeft = endTime - now;

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    localStorage.removeItem('countdownEndTime');
                    countdownElement.innerHTML = "Time's up!";
                } else {
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                    countdownElement.innerHTML = `${minutes}m ${seconds}s`;
                }
            }

            updateTimer();
            const timerInterval = setInterval(updateTimer, 1000);
        }

        const endTime = initializeTimer(time);
        startCountdown(endTime);
    } else {
        // let toastShown = false;
        function showToast(message, icon) {
            // if (!toastShown) {
            // toastShown = true;
            Toastify({
                text: message,
                // duration: -1, //DILI MA WALA ANG TOAST
                duration: 5000,
                avatar: icon,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }).showToast();
            // }
        }
        function checkConnection() {
            fetchURL = "https://172.16.2.195:4443/tpc_ver2/backend/config/try.php";
            const param = {
                reconnect: 'true'
            }
            const url = new URL(fetchURL);
            Object.keys(param).forEach(key => url.searchParams.append(key, param[key]));
            fetch(url.toString(), {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (!data.success) {
                        showToast(data.message, 'frontend/images/cloud.png');
                    }
                    // else{
                    //     showToast(data.message);
                    // }
                })
                .catch(error => {
                    showToast(error.message, 'frontend/images/danger.png');
                })
        }

        setInterval(checkConnection, 5000);

        localStorage.removeItem('countdownEndTime');
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
            var sectionId = document.getElementById('sectionId').value;
            const params = {
                item_code: item_code,
                parts_number: parts_number,
                lot_number: lot_number,
                date_issued: date_issued,
                revision_number: revision_number,
                section_id: sectionId,
                assignment_id: assignment_id,
                QrSubmitBtn: 'true'
            };
            const url = new URL(fetchURL1);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            fetch(url.toString(), {
                method: 'GET'
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
                        div.classList.remove("d-none");
                    }
                    else if (thisData[0] == null || thisData[0] == '0') {
                        var p = document.getElementById('errorP');
                        p.textContent = 'Our database search did not yield any results that match the QR code provided. Please try again thank you!';
                        div.classList.remove("d-none");
                    }
                    else {
                        div.classList.add("d-none");
                        window.location.href = 'main.php';
                    }

                })
                .catch(error => {
                    var p = document.getElementById('errorP');
                    p.textContent = `An error occured while fetching data =>! ${error}`;
                    div.classList.remove("d-none");
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

        document.getElementById('get_patch').addEventListener('click', function () {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            const minute_debug = 1;
            today = mm + '/' + dd + '/' + yyyy;
            const date1 = today;
            fetch("https://172.16.2.13/tpc_ver2/frontend/attachments/patch")
                .then((res) => res.text())
                .then((text) => {
                    document.getElementById('patch_list').innerHTML = '';
                    var lines = text.split('\n');
                    for (var line = 0; line < lines.length; line++) {
                        if (lines[line].includes('/')) {
                            var date2 = lines[line];
                        }
                        const dates1 = new Date(date1);
                        const dates2 = new Date(date2);

                        const diffInMs = dates1 - dates2;
                        const diffInMinutes = Math.round(diffInMs / 60000);
                        const days = diffInMinutes / 60 / 24;
                        const diffDays = (diffInMinutes / (1000 * 60 * 60 * 24));
                        const day = diffDays / 60 / 24;
                        const year = Math.round(days / 365);
                        console.log(`diffInMinutes: ${diffInMinutes}, diffDays: ${diffDays}, date 1: ${date1}, date 2: ${date2}, diffInMs : ${days}, day : ${day}`);
                        if (lines[line] != '' || lines[line] != "") {
                            if (days < 1) {
                                var item =
                                    `<a href="#" class="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <small class="text-body-secondary">${lines[line].trim()}</small>
                                    <small class="text-body-secondary">Few moments ago.</small>
                                </div>
                            </a>`;
                            } else if (days >= 365) {
                                var item =
                                    `<a href="#" class="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <small class="text-body-secondary">${lines[line].trim()}</small>
                                    <small class="text-body-secondary">${year} years ago.</small>
                                </div>
                            </a>`;
                            }
                            else {
                                var item =
                                    `<a href="#" class="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                    <small class="text-body-secondary">${lines[line].trim()}</small>
                                    <small class="text-body-secondary">${days} days ago.</small>
                                </div>
                            </a>`;
                            }
                            document.getElementById('patch_list').innerHTML += item;
                        }
                    }
                })
                .catch((e) => console.error(e));
        });
        getSection();

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    }
});