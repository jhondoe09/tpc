document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        console.log(`readystate: ${document.readyState}`);
    }
});

// cwpProdFunction(production);
if (maintenance) {
    window.location = 'index.php';
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
        const param = {
            reconnect: 'true'
        }
        const url = new URL(fetchURLForConnection2);
        Object.keys(param).forEach(key => url.searchParams.append(key, param[key]));
        fetch(url.toString(), {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (debugging_mode) {
                    console.log(data);
                }
                if (!data.success) {
                    showToast(data.message, 'frontend/images/power_off.png');
                }
                // else {
                //     showToast(data.message, 'frontend/images/danger.png');
                // }
            })
            .catch(error => {
                showToast(error.message, 'frontend/images/danger.png');
            })
    }

    // setInterval(checkConnection, 5000);


    var floatingButtonContainer = document.querySelector('.floating-button-div');
    var scrollY = window.scrollY;

    window.addEventListener('scroll', function () {
        scrollY = window.scrollY;
        floatingButtonContainer.style.top = scrollY + window.innerHeight - 150 + 'px';
    });

    // REFETCH BUTTON
    const thisData = JSON.parse(localStorage.getItem('myData'));
    if (localStorage.getItem('patWaferFrom') && localStorage.getItem('patWaferTo')) {
        const patWaferFrom = localStorage.getItem('patWaferFrom');
        const patWaferTo = localStorage.getItem('patWaferFrom');
        if (debugging_mode) {
            console.log(`JAI FROM${patWaferFrom}, JAI TO ${patWaferTo}`);
        }

    }
    else {
        const patWaferFrom = localStorage.getItem('patWaferFrom');
        const patWaferTo = localStorage.getItem('patWaferFrom');
        if (debugging_mode) {
            console.log(`JAI FROM${patWaferFrom}, JAI TO ${patWaferTo}`);
        }
    }
    if (debugging_mode) {
        console.log(thisData);
    }

    disabledDoneBtn();
    disabledSaveBtn();
    var sidebar = document.getElementById('sidebar');
    var count = 0;
    var countString;
    let hiddenCount = 0;
    const hiddenBadge = document.getElementById('hiddenProcessBadge');
    const hiddenButton = document.getElementById('hiddenProcessBtn');
    function likeMatch(pattern, subject) {
        pattern = pattern.replace(/%/g, '.*');
        const regex = new RegExp(`^${pattern}$`, 'i');
        return regex.test(subject);
    }
    if (thisData) {
        for (let data of thisData) {
            if (data.sequence_number > 0) {
                // sidebar
                document.getElementById('itemCode').textContent = data.item_code;
                document.getElementById('revisionNo').textContent = data.revision_number;
                document.getElementById('section').textContent = data.section_code;
                // headers
                document.getElementById('sectionDescription').textContent = data.section_description;
                document.getElementById('formAssignment').textContent = `Form Assignment: ${data.assignment_id}`;
                count++;
                var subPname = data.SubPname;
                if (subPname.length > 26) {
                    subPname = subPname.substring(0, 22);
                }
                else {
                    subPname = subPname.substring(0, 26);
                }
                if (count < 10) {
                    countString = '0' + count;
                }
                else {
                    countString = count.toString();
                }
                let reworked = false;
                if (data.status == 'Inactive') {
                    reworked = true;
                }
                let button = `<button type="submit" 
     class="btn btn-outline-light text-black form-control mb-1 btn_process"
     form="sideBarForm"
     id="btn_process"
     name="btn_process"
     data-bs-toggle="tooltip"
     data-bs-placement="right" 
     data-bs-custom-class="custom-tooltip" 
     data-bs-title="${data.key_code} - ${data.SubPname} ${reworked == true ? '(Reworked)' : ''}" 
     style="text-align:left" 
     value="${data.SubPid}" 
     data-id="${data.SubPid}" 
     data-main_prd_id="${data.main_prd_id}"
     data-section_id="${data.section_id}"
     data-assignment_id="${data.assignment_id}"
     data-status="${data.tpc_sub_status}" 
     data-sequence_number="${data.sequence_number}"
     data-sampling="${data.tpc_sub_sampling}"
     data-uncontrolled_quantity="${data.tpc_sub_uncontrolled}"
     data-form_assignment="${data.assignment_id}"
     data-batch_type="${data.tpc_sub_batching_type}"
     data-result_type="${data.tpc_sub_result_type}"
     data-sub_status="${data.status}"
     data-subPname="${data.SubPname}"
     data-hadan="${data.hadan}"
     >
     ${countString}) ${subPname}
     </button>`;
                sidebar.innerHTML += button;

                localStorage.setItem('sectionDescription', data.section_description);
                localStorage.setItem('lotNo', data.lot_number);
                localStorage.setItem('partsNumber', data.item_parts_number);
                localStorage.setItem('revisionNumber', data.revision_number);
                localStorage.setItem('assign_id', data.assignment_id);
                localStorage.setItem('itemCode', data.item_code);
                localStorage.setItem('sampling', data.tpc_sub_sampling);
                localStorage.setItem('uncontrolled', data.tpc_sub_uncontrolled);
                localStorage.setItem('status', data.tpc_sub_status);
                localStorage.setItem('subPid', data.SubPid);
                localStorage.setItem('sectionId', data.section_id);
                localStorage.setItem('dateIssued', data.date_issued);
                localStorage.setItem('section', data.section_code);
                localStorage.setItem('order_pn', data.order_pn);
                localStorage.setItem('quantity', data.quantity);
                localStorage.setItem('wafer_from', data.wafer_number_from);
                localStorage.setItem('wafer_to', data.wafer_number_to);
            } else {
                hiddenCount++;
                hiddenButton.classList.remove('d-none');
                hiddenBadge.innerHTML = hiddenCount;
            }
        }
    } else {
        Swal.fire({
            title: "No data.",
            text: "No data found, please rescan the QR to proceed.",
            icon: "info",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = 'index.php';
            }
        });
    }
    const buttons = document.querySelectorAll(`#btn_process`);
    for (let btn of buttons) {
        if (btn.getAttribute('data-sub_status') == 'Inactive' && btn.getAttribute('data-status') != 'Done') {
            btn.insertAdjacentHTML('beforeend', '<span class="material-symbols-outlined align-bottom float-end">info</span>');
        }
        if (btn.getAttribute('data-status') == 'Open' || btn.getAttribute('data-status') == 'TBD') {
            window.onload = function () {
                btn.click();
                btn.scrollIntoView();
                if (debugging_mode) {
                    console.log(btn.getAttribute('data-status'));
                }
            };
        }
    }
    disableEnableBtn();
    disabledBatchProcessBtn();
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    // Sidebar Button Process Event
    document.querySelectorAll('.btn_process').forEach(button => {
        button.addEventListener('click', () => {
            const specialBtn = document.getElementById('specialInstruction');
            specialBtn.disabled = true;
            document.getElementById('reference_p').classList.add('d-none');
            document.getElementById('nav_condition').classList.add('d-none');
            const tableBody = document.getElementById('table');
            tableBody.innerHTML = '';
            var divContainer = document.getElementById('attachContainer');
            const buttonSubPname = button.getAttribute('data-bs-title');
            const buttonStatus = button.getAttribute('data-status');
            const buttonSampling = button.getAttribute('data-sampling');
            const buttonUncontrolledQuantity = button.getAttribute('data-uncontrolled_quantity');
            const buttonFormAssignment = button.getAttribute('data-form_assignment');
            const buttonSubPid = button.getAttribute('data-id');
            const buttonSequenceNumber = button.getAttribute('data-sequence_number');
            const buttonBatchType = button.getAttribute('data-batch_type');
            const buttonResultType = button.getAttribute('data-result_type');
            const btnSubPname = button.getAttribute(`data-subPname`);
            const hadan = button.getAttribute(`data-hadan`);
            // console.log(button);
            localStorage.setItem('SUBPID', buttonSubPid);
            localStorage.setItem('subPname', btnSubPname);
            localStorage.setItem('buttonSectionId', button.dataset.section_id);
            localStorage.setItem('buttonAssignmentId', button.dataset.assignment_id);
            localStorage.setItem('buttonMainProdId', button.dataset.main_prd_id);
            localStorage.setItem('buttonSequenceNumber', buttonSequenceNumber);
            localStorage.setItem('buttonBatchType', buttonBatchType);
            localStorage.setItem('buttonResultType', buttonResultType);
            localStorage.setItem('SubProcessStatus', buttonStatus);
            localStorage.setItem('hadan', hadan);
            // getYieldPercentage(buttonSubPid, buttonFormAssignment);
            if (buttonStatus == 'Open') {
                disabledDoneBtn();
                disabledSaveBtn();
                enabledBatchProcessBtn();
                document.getElementById('subProcessStatus').classList.remove('text-bg-danger');
                document.getElementById('subProcessStatus').classList.remove('text-bg-success');
                document.getElementById('subProcessStatus').classList.add('text-bg-info');
            } else if (buttonStatus == 'TBD') {
                enabledDoneBtn();
                disabledSaveBtn();
                enabledBatchProcessBtn();
                document.getElementById('subProcessStatus').classList.remove('text-bg-success');
                document.getElementById('subProcessStatus').classList.remove('text-bg-danger');
                document.getElementById('subProcessStatus').classList.add('text-bg-info');
                document.getElementById('specialInstruction').disabled = true;
            }
            else if (buttonStatus == 'Done') {
                disabledDoneBtn();
                enabledSaveBtn();
                enabledBatchProcessBtn();
                // disabledBatchProcessBtn();
                document.getElementById('specialInstruction').disabled = true;
                document.getElementById('subProcessStatus').classList.remove('text-bg-danger');
                document.getElementById('subProcessStatus').classList.remove('text-bg-info');
                document.getElementById('subProcessStatus').classList.add('text-bg-success');
            }
            else {
                disabledDoneBtn();
                disabledSaveBtn();
                enabledBatchProcessBtn();
                // disabledBatchProcessBtn();
                document.getElementById('subProcessStatus').classList.remove('text-bg-success');
                document.getElementById('subProcessStatus').classList.remove('text-bg-info');
                document.getElementById('subProcessStatus').classList.add('text-bg-danger');
            }

            if (buttonSampling == 'True') {
                document.getElementById('sampling').classList.remove('text-bg-danger');
                document.getElementById('sampling').classList.add('text-bg-success');
            }
            else {
                document.getElementById('sampling').classList.remove('text-bg-success');
                document.getElementById('sampling').classList.add('text-bg-danger');
            }

            if (buttonUncontrolledQuantity == 'True') {
                document.getElementById('uncontrolled_quantity').classList.remove('text-bg-danger');
                document.getElementById('uncontrolled_quantity').classList.add('text-bg-success');
            }
            else {
                document.getElementById('uncontrolled_quantity').classList.remove('text-bg-success');
                document.getElementById('uncontrolled_quantity').classList.add('text-bg-danger');
            }
            if (buttonBatchType == "Standard") {
                document.getElementById('batch_type').classList.remove('text-bg-info');
                document.getElementById('batch_type').classList.add('text-bg-success');
            }
            else {
                document.getElementById('batch_type').classList.remove('text-bg-success');
                document.getElementById('batch_type').classList.add('text-bg-info');
            }
            if (buttonResultType == "Wafer") {
                document.getElementById('result_type').classList.remove('text-bg-info');
                document.getElementById('result_type').classList.add('text-bg-success');
            }
            else {
                document.getElementById('result_type').classList.remove('text-bg-info');
                document.getElementById('result_type').classList.add('text-bg-success');
            }
            document.getElementById('subPname').textContent = buttonSubPname;
            document.getElementById('subProcessStatus').textContent = buttonStatus;
            document.getElementById('sampling').textContent = buttonSampling;
            document.getElementById('uncontrolled_quantity').textContent = buttonUncontrolledQuantity;
            document.getElementById('batch_type').textContent = buttonBatchType;
            document.getElementById('result_type').textContent = buttonResultType;

            divContainer.innerHTML = '';
            var badger = document.getElementById('badger');
            const attachment_hr = document.getElementById('attachment_hr');
            const btn_process_param = {
                subPid: buttonSubPid,
                assignment_id: buttonFormAssignment,
                attached: 'true'
            };
            const btn_url = new URL(fetchURL);
            Object.keys(btn_process_param).forEach(key => btn_url.searchParams.append(key, btn_process_param[key]));
            fetch(btn_url.toString(), {
                method: 'GET'
            })
                .then(response => response.json())
                .then(attached_data => {
                    if (debugging_mode) {
                        console.log(attached_data);
                    }

                    if (attached_data) {
                        if (attached_data.success) {
                            const material_lot_no = document.getElementById('materialLotNo').textContent;
                            const lot_number = document.getElementById('lotNo').textContent;
                            const parts_number = document.getElementById('partsNumber').textContent;
                            const route = 'http://172.16.2.87/try/Firing%202%20Data%20Sheet-6mils,10mils,14mils.htm';
                            let attachment_count = 0;
                            const new_directory = 'https://172.16.2.13/TPC-endpoint/uploads/';
                            attachment_hr.classList.remove('d-none');
                            for (let data of attached_data.data) {
                                if (debugging_mode) {
                                    console.log(data);
                                }

                                attachment_count++;
                                var directory = new_directory + data.file_name;
                                var fileAttach = data.file_name;
                                if (data.file_name > 12) {
                                    fileAttach = data.file_name.substring(0, 12) + '...';
                                }
                                else {
                                    fileAttach = data.file_name.substring(0, 12);
                                }
                                var div =
                                    `<div class="attachment" id="attachment">
                                    <div class="card" data-bs-toggle="tooltips" data-bs-title="${data.file_name}" data-filename="${data.file_name}">
                                        <a class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-file="${directory}" data-remarks="${data.attachment_remarks}"  data-bs-title="${data.file_name}" data-google_drive_id="${data.google_drive_id}" data-form_attachment_id="${data.form_attachment_id}">
                                            <div class="card-body">
                                            <img src="frontend/assets/images/description_FILL0_wght200_GRAD0_opsz48.png" alt="Description">
                                            </div>
                                        </a>
                                    </div>
                                    <p id="file_name">${fileAttach}</p>
                                </div>`;
                                divContainer.innerHTML += div;
                            }
                        } else {
                            attachment_hr.classList.add('d-none');
                        }
                    }
                    else {
                        const p = `< p class="lead" > File attachment(s) are not available!</p > `;
                        divContainer.innerHTML = p;
                    }
                })

            const lot_Number = localStorage.getItem('lotNo');
            const parts_Number = localStorage.getItem('partsNumber');
            const revision_Number = localStorage.getItem('revisionNumber');
            const item_code = localStorage.getItem('itemCode');
            const assign_id = localStorage.getItem('assign_id');

            const params = {
                subPid: buttonSubPid,
                itemPartsNumber: parts_Number,
                itemCode: item_code,
                revisionNumber: revision_Number,
                lotNumber: lot_Number,
                assignId: assign_id,
                btn_process: 'true'
            }
            const url = new URL(fetchURL);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            fetch(url.toString(), {
                method: 'GET'
            })
                .then(response => response.json())
                .then(fetchedData => {
                    if (debugging_mode) {
                        console.log(fetchedData);
                    }
                    const operatorDiv = document.getElementById('divOperatorTbody');
                    operatorDiv.innerHTML = '';
                    for (let data of fetchedData) {
                        if (data == '0' || data == null) {
                            operatorDiv.innerHTML = '';
                        }
                        else {
                            localStorage.setItem('batchOperatorId', data.batch_operator_id);
                            var tr =
                                `<tr class="table_middle" id="table_middle_${data.operator_number}_${data.id_number}" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}" data-id_number="${data.id_number}" data-waferFrom="${data.wafer_number_from}" data-waferTo="${data.wafer_number_to}">
                                    <td>
                                        <button type="button" class="btn btn-sm btn-outline-none btn_edit" id="edit_${data.id_number}" data-id_number="${data.id_number}" data-operator_number="${data.operator_number}" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><img src="frontend/assets/images/edit_FILL0_wght200_GRAD0_opsz24.png" alt="edit"></button>
                                    </td>
                                    <td>${data.operator_number}</td>
                                    <td>${data.id_number}</td>
                                    <td>${data.operator_name}</td>
                                    <td>${data.quantity_in ? data.quantity_in : 0}</td>
                                    <td>${data.quantity_out ? data.quantity_out : 0}</td>
                                    <td>${data.sampling_in ? data.sampling_in : 0}</td>
                                    <td>${data.sampling_out ? data.sampling_out : 0}</td>
                                    <td>${data.time_start}</td>
                                    <td>${data.time_end ? data.time_end : ''}</td>
                                </tr>`;
                            operatorDiv.innerHTML += tr;
                        }
                        const editButton = document.querySelectorAll('.table_middle');
                        for (let editBtn of editButton) {
                            editBtn.addEventListener('click', function () {
                                let idniJairus = editBtn.getAttribute('data-id_number');
                                let operator_number = editBtn.getAttribute('data-operatorNumber');
                                localStorage.setItem('data_id_number', idniJairus);
                                let table = document.getElementById(`table_middle_${operator_number}_${idniJairus}`);
                                let td = table.querySelectorAll('td');
                                localStorage.setItem(`sampling_in`, parseInt(td[6].textContent));
                            });
                        }
                        if (buttonStatus == 'Open') {
                            enabledCheckedEditBtn();
                        }
                        else {
                            disabledCheckedEditBtn();
                        }

                    }
                    let lastClickedTable = null;
                    let tables = document.querySelectorAll('.table_middle');
                    for (let table of tables) {
                        table.addEventListener('click', function () {
                            let idNumber = table.getAttribute('data-idNumber');
                            let batchNumber = table.getAttribute('data-batchNumber');
                            let batchOperatorNumber = table.getAttribute('data-operatorNumber');
                            let waferNumberFrom = table.getAttribute('data-waferFrom');
                            let waferNumberTo = table.getAttribute('data-waferTo');
                            localStorage.setItem('idNumber', idNumber);
                            localStorage.setItem('batchNumber', batchNumber);
                            localStorage.setItem('batchOperatorNumber', batchOperatorNumber);
                            localStorage.setItem('patWaferFrom', waferNumberFrom);
                            localStorage.setItem('patWaferTo', waferNumberTo);
                            tableClick(idNumber, buttonSubPid, parts_Number, item_code, revision_Number, lot_Number, assign_id, batchOperatorNumber, waferNumberFrom, waferNumberTo, batchNumber);
                            let tbody = document.getElementById(`table_middle_${batchOperatorNumber}_${idNumber}`);
                            if (lastClickedTable) {
                                lastClickedTable.classList.remove('table-info');
                            }
                            tbody.classList.add('table-info');
                            lastClickedTable = tbody;
                        });
                    }
                })

            // SPECIAL INSTRUCTION
            const SI_params = {
                SubPid: buttonSubPid,
                parts_number: parts_Number,
                item_code: item_code,
                revision_number: revision_Number,
                lot_number: lot_Number,
                get_special_instruction: 'true'
            };
            const SI_Url = new URL(fetchURL);
            Object.keys(SI_params).forEach(key => SI_Url.searchParams.append(key, SI_params[key]));
            fetch(SI_Url.toString(), {
                method: 'GET'
            })
                .then(response => response.json())
                .then(SI_data => {
                    if (debugging_mode) {
                        console.log(SI_data);
                    }

                    if (SI_data) {
                        if (SI_data.success) {
                            localStorage.setItem('SI_Data_Length', SI_data.data.length);
                            for (let i = 0; i <= SI_data.data.length; i++) {
                                badger.textContent = i;
                            }
                        }
                        else {
                            localStorage.setItem('SI_Data_Length', 0);
                            badger.textContent = 0;
                            specialBtn.disabled = true;
                        }
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        })
    });

    // Save Button Event
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', function () {
        event.preventDefault();
        disabledSaveBtn();
        let sectionId = localStorage.getItem('sectionId');
        let field_type = localStorage.getItem('field_type');
        let sub_pid = localStorage.getItem('SUBPID');
        let idNumber = localStorage.getItem('idNumber');
        let batchNumber = localStorage.getItem('batchNumber');
        let batchOperatorNumber = localStorage.getItem('batchOperatorNumber');
        let item_code = localStorage.getItem('itemCode');

        const saveData = new FormData();
        saveData.append('id_number', idNumber);
        saveData.append('batch_number', batchNumber);
        saveData.append('batch_operator_number', batchOperatorNumber);
        saveData.append('saveButtonClicked', 'true');
        fetch(fetchURL, {
            method: 'POST',
            body: saveData
        })
            .then(response => response.json())
            .then(fetched => {
                if (debugging_mode) {
                    console.log(fetched);
                }

                const updateRemarks = new FormData();
                const remarks = document.getElementById(`remarksInput`).value;
                const ass_id = localStorage.getItem('assign_id');
                const sub_pid = localStorage.getItem('SUBPID');
                updateRemarks.append(`remarks`, remarks);
                updateRemarks.append(`assignment_id`, ass_id);
                updateRemarks.append(`SubPid`, sub_pid);
                updateRemarks.append(`updateRemarks`, 'true');
                fetch(fetchURL, {
                    method: 'POST',
                    body: updateRemarks
                })
                    .then(response => response.json())
                    .then(resData => {
                        if (debugging_mode) {
                            console.log(resData);
                        }

                    })
                    .catch(error => {
                        console.error(error);
                    })
                for (let data of fetched) {
                    if (debugging_mode) {
                        console.log(item_code, sectionId, sub_pid, idNumber, batchNumber, batchOperatorNumber, data.assignment_id, data.lot_number, data.parts_number, data.revision_number);
                    }

                    if (localStorage.getItem('subPname') === "NG Tally") {
                        let sampling = localStorage.getItem(`sampling_in`);
                        let ng_tally = 0;
                        const tbody = document.getElementById('table');
                        const tr = tbody.querySelectorAll('tr');
                        for (let i = 0; i < tr.length; i++) {
                            let td = tr[i].querySelectorAll('td');
                            let actual_value = td[6].querySelector(`input`).value;
                            ng_tally += parseInt(actual_value ? actual_value : 0);
                        }
                        if (ng_tally < sampling) {
                            Swal.fire({
                                title: "Message Prompt!",
                                text: `NG Tally(${ng_tally}) is less than Sampling in (${sampling})!`,
                                icon: "info"
                            });
                            enabledSaveBtn();
                        }
                        else if (ng_tally > sampling) {
                            Swal.fire({
                                title: "Message Prompt!",
                                text: `NG Tally(${ng_tally}) is greater than Sampling in (${sampling})!`,
                                icon: "info"
                            });
                            enabledSaveBtn();
                        }
                        else if (ng_tally == sampling) {
                            saveDatas(item_code, sectionId, sub_pid, idNumber, batchNumber, batchOperatorNumber, data.assignment_id, data.lot_number, data.parts_number, data.revision_number);
                        }
                        if (debugging_mode) {
                            console.log(`sampling: ${sampling}, actual_value: ${ng_tally} `);
                        }

                    }
                    else {
                        saveDatas(item_code, sectionId, sub_pid, idNumber, batchNumber, batchOperatorNumber, data.assignment_id, data.lot_number, data.parts_number, data.revision_number);
                    }
                }

            })
    });

    // Batch Process Button Event
    const batchProcessedBtn = document.getElementById('batchProcessBtn');
    batchProcessedBtn.addEventListener('click', function () {
        event.preventDefault();
        const subPid = localStorage.getItem('SUBPID');
        const assign_id = localStorage.getItem('assign_id');
        const buttonBatchType = localStorage.getItem('buttonBatchType');
        const hadan = localStorage.getItem('hadan');
        if (debugging_mode) {
            console.log(buttonBatchType);
        }

        if (subPid != null && buttonBatchType != null) {
            window.open(`${linkURL}/batch_process_ver2/${buttonBatchType.toLowerCase()}.html?SubPid=${subPid}&AssignmentId=${assign_id}&hadan=${hadan}`);
        }
    });

    // Done Process Event
    const doneProcessBtn = document.getElementById('doneButton');
    doneProcessBtn.addEventListener('click', function () {
        event.preventDefault();
        Swal.fire({
            title: 'Are you sure you want to change this process to DONE?',
            text: "Done process' data cannot be edited or changed. Once the current process is done, the next process will be opened or enabled!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                let isValid = validate();
                if (isValid != true) {
                    Swal.fire(
                        '',
                        'It is recommended that all text fields are filled out and not left blank or empty.',
                        'error'
                    )
                }
                else {
                    doneProcess();
                }

            }
        })
    })

    // Disables and Enable Check and Edit Function
    function disabledCheckedEditBtn() {
        const editButton = document.querySelectorAll('.btn_edit');
        const checkButton = document.querySelectorAll('.btn_check');
        for (let checkBtn of checkButton) {
            checkBtn.classList.add('disabled');
        }
        for (let editBtn of editButton) {
            editBtn.classList.add('disabled');
        }
    }
    function enabledCheckedEditBtn() {
        const editButton = document.querySelectorAll('.btn_edit');
        const checkButton = document.querySelectorAll('.btn_check');
        for (let checkBtn of checkButton) {
            checkBtn.classList.remove('disabled');
        }
        for (let editBtn of editButton) {
            editBtn.classList.remove('disabled');
        }
    }
    // Disable Buttons Functions
    function disabledBatchProcessBtn() {
        const ProcessBtn = document.getElementById('batchProcessBtn');
        ProcessBtn.disabled = true;
    }
    function disabledDoneBtn() {
        const doneProcessBtn = document.getElementById('doneButton');
        doneProcessBtn.disabled = true;
    }
    function disabledSaveBtn() {
        const saveBtn = document.getElementById('saveButton');
        saveBtn.disabled = true;
    }
    // Enable Buttons Functions
    function enabledDoneBtn() {
        const doneProcessBtn = document.getElementById('doneButton');
        doneProcessBtn.disabled = false;
    }
    function enabledSaveBtn() {
        const saveBtn = document.getElementById('saveButton');
        saveBtn.disabled = false;
    }
    function enabledBatchProcessBtn() {
        const ProcessBtn = document.getElementById('batchProcessBtn');
        ProcessBtn.disabled = false;
    }
    // Save Data Function
    function saveDatas(item_code, sectionId, sub_pid, id_number, batch_number, batch_operator_number, assignment_id, lot_number, parts_number, revision_number) {
        const main_table = document.getElementById(`table`);
        const main_tbl_tr = main_table.querySelectorAll('tr');
        let sequence_no = 0;
        let percent = 0;
        let ng_tally = 0;
        let sampling = localStorage.getItem(`sampling_in`);
        if (debugging_mode) {
            console.log(main_tbl_tr);
        }

        for (let j = 0; j < main_tbl_tr.length; j++) {
            let field_type;
            let with_judgement;
            var actual_value;
            let option_value;
            sequence_no++;
            const td_element = main_tbl_tr[j].querySelectorAll('td');
            const condition_item_id = td_element[0].textContent;
            const id_no = td_element[1].textContent;
            const wafer_start = td_element[3].querySelector(`input`).value;
            const wafer_end = td_element[4].querySelector(`input`).value;
            const condition_details = td_element[5].textContent;
            if (td_element[6].querySelector(`input`)) {
                actual_value = td_element[6].querySelector('input').value;
                field_type = td_element[6].querySelector(`input`).getAttribute(`data-bs-field_type`);
                with_judgement = td_element[6].querySelector(`input`).getAttribute(`data-bs-with_judgement`)
                option_value = '';
            }
            else if (td_element[6].querySelector('select')) {
                actual_value = td_element[6].querySelector('select').value;
                field_type = td_element[6].querySelector(`select`).getAttribute(`data-bs-field_type`);
                option_value = td_element[6].querySelector(`select`).getAttribute(`data-bs-option_value`);
                with_judgement = td_element[6].querySelector(`select`).getAttribute(`data-bs-with_judgement`);
            }
            else {
                actual_value = '';
                option_value = '';
                with_judgement = '';
                field_type = '';
            }
            const target_value = td_element[7].textContent;
            const min_value = td_element[8].textContent;
            const max_value = td_element[9].textContent;
            const judgement = td_element[10].textContent;
            const special_instruction = td_element[12].textContent;
            const formSaveConditionsData = new FormData();
            formSaveConditionsData.append(`field_type_${j}`, field_type);
            formSaveConditionsData.append(`item_code_${j}`, item_code);
            formSaveConditionsData.append(`section_id_${j}`, sectionId);
            formSaveConditionsData.append(`sub_pid_${j}`, sub_pid);
            formSaveConditionsData.append(`id_number_${j}`, id_number);
            formSaveConditionsData.append(`batch_number_${j}`, batch_number);
            formSaveConditionsData.append(`batch_operator_number_${j}`, batch_operator_number);
            formSaveConditionsData.append(`assignment_id_${j}`, assignment_id);
            formSaveConditionsData.append(`lot_number_${j}`, lot_number);
            formSaveConditionsData.append(`parts_number_${j}`, parts_number);
            formSaveConditionsData.append(`revision_number_${j}`, revision_number);
            formSaveConditionsData.append(`condition_item_id_${j}`, condition_item_id);
            formSaveConditionsData.append(`id_no_${j}`, id_no);
            formSaveConditionsData.append(`sequence_no_${j}`, sequence_no);
            formSaveConditionsData.append(`wafer_start_${j}`, wafer_start);
            formSaveConditionsData.append(`wafer_end_${j}`, wafer_end);
            formSaveConditionsData.append(`condition_${j}`, condition_details);
            formSaveConditionsData.append(`actual_value_${j}`, actual_value);
            formSaveConditionsData.append(`target_value_${j}`, target_value);
            formSaveConditionsData.append(`min_value_${j}`, min_value);
            formSaveConditionsData.append(`max_value${j}`, max_value);
            formSaveConditionsData.append(`judgement_${j}`, judgement);
            formSaveConditionsData.append(`option_value_${j}`, option_value);
            formSaveConditionsData.append(`with_judgement_${j}`, with_judgement);
            formSaveConditionsData.append(`special_instruction_${j}`, special_instruction);
            formSaveConditionsData.append(`condition_item_id_2`, condition_item_id);
            formSaveConditionsData.append('saveItems', 'true');

            for (const [key, value] of formSaveConditionsData.entries()) {
                if (debugging_mode) {
                    console.log(`${key}: ${value}`);
                }

            }
            fetch(fetchURL, {
                method: 'POST',
                body: formSaveConditionsData
            })
                .then(response => response.json())
                .then(savedData => {
                    if (debugging_mode) {
                        console.log(savedData);
                    }

                    const span_saving_data = document.getElementById(`span_saving_data`);
                    let thisPer;
                    if (savedData.success) {
                        $(`#spinnerModal`).modal('show');
                        if (percent < main_tbl_tr.length) {
                            percent++;
                            thisPer = (percent / main_tbl_tr.length) * 100;
                            span_saving_data.textContent = `Saving Data (${thisPer.toFixed(2)} %)`;
                            if (percent == main_tbl_tr.length) {
                                let timerInterval
                                Swal.fire({
                                    title: 'Done!',
                                    html: `${percent} / ${main_tbl_tr.length} data has been saved succesfully.`,
                                    timer: 1000,
                                    timerProgressBar: true,
                                    didOpen: () => {
                                        Swal.showLoading()
                                    },
                                    willClose: () => {
                                        clearInterval(timerInterval)
                                    }
                                }).then((result) => {
                                    if (result.dismiss === Swal.DismissReason.timer) {
                                        if (debugging_mode) {
                                            console.log('DONE');
                                        }

                                        main_table.innerHTML = '';
                                        $(`#spinnerModal`).modal('hide');
                                        percent = 0;
                                        thisPer = 0;
                                        enabledSaveBtn();
                                    }

                                })
                            }
                        }

                    }
                    else {
                        Swal.fire
                            (
                                'An error occured!',
                                `${savedData.message}, please try to coordinate with SD [TPC MAIN FORM]. ${percent} / ${main_tbl_tr.length} of data has been saved.`,
                                'error'
                            )
                    }
                })
                .catch(error => {
                    if (debugging_mode) {
                        console.log(error);
                    }

                }
                );
        }
        if (debugging_mode) {
            console.log(ng_tally);
        }

    }

    function scanId() {
        const scanId2 = document.getElementById('scanId').value;
        if (scanId2 != "") {
            scanId2.value = '';
        }
        if (operatorValidate()) {
            let timerInterval
            Swal.fire({
                title: 'Success!',
                text: 'Operator ID Matched!',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    $("#main_table").load(" #main_table > *");
                    document.getElementById('closeModal').click();
                }
            })
        }
        else {
            let timerInterval
            Swal.fire({
                title: 'Error!',
                text: 'Invalid Operator ID!',
                icon: 'error',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    $("#main_table").load(" #main_table > *");
                    document.getElementById('closeModal').click();
                }
            })
        }
    }

    function operatorValidate() {
        let valid = true;
        let current_operator_id = document.getElementById('scanId').value;
        let id_number = localStorage.getItem('data_id_number');
        let newId = `00${id_number}`;
        if (current_operator_id.trim() == newId.trim() || current_operator_id.trim() == id_number.trim()) {
            valid = true;
        }
        else {
            valid = false;
        }
        return valid;
    }
    // Validate Inputs Function
    function validate() {
        let isValid = true;
        let tableInputs = document.querySelectorAll('table input[type="number"]');
        for (let tableInput of tableInputs) {
            const actualValue = parseFloat(tableInput.value);
            const row = tableInput.closest('tr');
            const sequenceNumber = row.querySelector('td[scope="row"]').textContent;
            const waferNumberFromInput = row.querySelector(`input#wafer_number_from_${sequenceNumber}`);
            const waferNumberToInput = row.querySelector(`input#wafer_number_to_${sequenceNumber}`);
            const waferFromValue = parseFloat(waferNumberFromInput.value);
            const waferToValue = parseFloat(waferNumberToInput.value);
            if (isNaN(waferFromValue)) {
                waferNumberFromInput.classList.add('is-invalid');
                isValid = false;
            }
            else {
                waferNumberFromInput.classList.remove('is-invalid');
            }
            if (isNaN(waferToValue)) {
                waferNumberToInput.classList.add('is-invalid');
                isValid = false;
            }
            else {
                waferNumberToInput.classList.remove('is-invalid');
            }
        }
        return isValid;
    }
    // Done Process Function
    function doneProcess() {
        let count2 = 0;
        let buttonSectionId = localStorage.getItem('buttonSectionId');
        let buttonAssignmentId = localStorage.getItem('buttonAssignmentId');
        let buttonMainProdId = localStorage.getItem('buttonMainProdId');
        let buttonSequenceNumber = localStorage.getItem('buttonSequenceNumber');
        let batchNumber = localStorage.getItem('batchNumber');
        let SubPid = localStorage.getItem('SUBPID');
        const params_1 = {
            SubPid: SubPid,
            batch_number: batchNumber,
            get_batched: 'true'
        }
        const url1 = new URL(fetchURL);
        Object.keys(params_1).forEach(key => url1.searchParams.append(key, params_1[key]));
        fetch(url1.toString(), {
            method: 'GET'
        })
            .then(response => response.json())
            .then(datas => {
                if (datas) {
                    if (datas.success) {
                        let count = datas.data.length;
                        for (let data of datas.data) {
                            const params_2 = {
                                SubPid: SubPid,
                                assignment_id: data.assignment_id,
                                get_batched_process: 'true'
                            }
                            const url2 = new URL(fetchURL);
                            Object.keys(params_2).forEach(key => url2.searchParams.append(key, params_2[key]));
                            fetch(url2.toString(), {
                                method: 'GET'
                            })
                                .then(response => response.json())
                                .then(datas => {
                                    if (debugging_mode) {
                                        console.log(datas);
                                    }

                                    if (datas) {
                                        if (datas.success) {
                                            count2++;
                                            if (count2 == count) {
                                                if (debugging_mode) {
                                                    console.log(datas);
                                                }

                                                let item_code = localStorage.getItem('itemCode');
                                                let parts_number = localStorage.getItem('partsNumber');
                                                let lot_number = localStorage.getItem('lotNo');
                                                let date_issued = localStorage.getItem('dateIssued');
                                                let revision_number = localStorage.getItem('revisionNumber');
                                                let sectionId = localStorage.getItem('sectionId');
                                                let assign_id = localStorage.getItem('assign_id');
                                                const params = {
                                                    item_code: item_code,
                                                    parts_number: parts_number,
                                                    lot_number: lot_number,
                                                    date_issued: date_issued,
                                                    revision_number: revision_number,
                                                    section_id: sectionId,
                                                    assignment_id: assign_id,
                                                    QrSubmitBtn: 'true'
                                                };
                                                const url = new URL(fetchURL);
                                                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                                                fetch(url.toString(), {
                                                    method: 'GET'
                                                })
                                                    .then(response => response.json())
                                                    .then(thisData => {
                                                        localStorage.setItem('myData', JSON.stringify(thisData));
                                                        let timerInterval
                                                        Swal.fire({
                                                            html: datas.message,
                                                            timer: 1000,
                                                            icon: 'success',
                                                            showConfirmButton: false,
                                                            timerProgressBar: true,
                                                            allowOutsideClick: false,
                                                            didOpen: () => {
                                                            },
                                                            willClose: () => {
                                                                clearInterval(timerInterval)
                                                            }
                                                        }).then((result) => {
                                                            if (result.dismiss === Swal.DismissReason.timer) {
                                                                if (localStorage.getItem('myData') != null) {
                                                                    // saveBtn.click();
                                                                    location.reload(true);
                                                                }
                                                                else {
                                                                    window.location.href = `https://172.16.2.13/tpc_ver2/index.php`;
                                                                }
                                                            }
                                                        })
                                                    })
                                            }
                                        }
                                    }
                                })
                                .catch(error => {
                                    if (debugging_mode) {
                                        console.log(error);
                                    }

                                })
                        }
                    }
                }
            })
            .catch(error => {
                if (debugging_mode) {
                    console.log(error);
                }

            })
    }
    // Disable and Enable Sidebar Buttons Function
    function disableEnableBtn() {
        const buttons = document.querySelectorAll('.btn_process');
        for (let button of buttons) {
            if (button.dataset.status == 'Open') {
                button.disabled = false;
            }
            else if (button.dataset.status == 'Close') {
                button.disabled = true;
            }
            else if (button.dataset.status == 'Done') {
                button.disabled = false;
                button.insertAdjacentHTML('beforeend', '<img class="float-end" src="frontend/assets/images/done_FILL0_wght200_GRAD0_opsz24.png" alt="Done Process">');
            }
        }
    }
    // Calculate Judgement Function
    function calculate(with_judgement, sequence_number) {
        if (with_judgement == 1 || with_judgement == '1') {
            let inputs = document.querySelectorAll('input[type="number"]');
            for (let input of inputs) {
                const actualValue = parseFloat(input.value);
                const row = input.closest('tr');
                const minValueElement = row.querySelector(`td#min_value_${sequence_number}`);
                // const minValueElement = document.getElementById(`min_value_${sequence_number}`);
                const minValue = minValueElement ? parseFloat(minValueElement.textContent) : null;
                const maxValueElement = row.querySelector(`td#max_value_${sequence_number}`);
                // const maxValueElement = document.getElementById(`max_value_${sequence_number}`);
                const maxValue = maxValueElement ? parseFloat(maxValueElement.textContent) : null;
                const judgement = row.querySelector(`td#condition_judgement_${sequence_number}`);
                // const judgement = document.getElementById(`condition_judgement_${sequence_number}`);
                if (judgement) {
                    if (isNaN(actualValue)) {
                        judgement.innerHTML = '';
                    }
                    else {
                        if (!isNaN(maxValue) || maxValue != '0.00000') {
                            if (actualValue < minValue || actualValue > maxValue) {
                                judgement.textContent = 'Fail';
                                judgement.classList.remove('text-success');
                                judgement.classList.add('text-danger');
                            }
                            else {
                                judgement.textContent = 'Pass';
                                judgement.classList.remove('text-danger');
                                judgement.classList.add('text-success');
                            }
                        }
                        else {
                            if (actualValue < minValue) {
                                judgement.textContent = 'Fail';
                                judgement.classList.remove('text-success');
                                judgement.classList.add('text-danger');
                            }
                            else {
                                judgement.textContent = 'Pass';
                                judgement.classList.remove('text-danger');
                                judgement.classList.add('text-success');
                            }
                        }
                    }
                }
            }
        }
    }
    // Calculate Blade Text
    function calculateBlade(with_judgement, sequence_number) {
        if (with_judgement == 1 || with_judgement == '1') {
            let waferInput = document.getElementById(`actual_value_${sequence_number}`);
            let targetVal = document.getElementById(`target_value_${sequence_number}`).textContent.toLowerCase();
            let newTargetVal = targetVal.toLowerCase();
            let inputVal = waferInput.value.toLowerCase();
            const judgement = document.getElementById(`condition_judgement_${sequence_number}`);
            if (inputVal == targetVal || inputVal == newTargetVal) {
                judgement.textContent = 'Pass'
                judgement.classList.remove('text-danger');
                judgement.classList.add('text-success');
            }
            else {
                judgement.textContent = 'Fail'
                judgement.classList.remove('text-success');
                judgement.classList.add('text-danger');
            }
        }
    }
    // Checkbox onclick function
    function onchange_checkbox(sequence_number, with_judgement) {
        if (debugging_mode) {
            console.log(sequence_number);
        }

        const checkbox = document.querySelector(`#actual_value_${sequence_number}`);
        const judgement = document.getElementById(`condition_judgement_${sequence_number}`);
        checkbox.value = checkbox.checked === true ? 1 : 0;
        if (with_judgement > 0) {
            judgement.textContent = parseInt(checkbox.value) === 1 ? 'Pass' : 'Fail';
            if (judgement.textContent == 'Pass') {
                judgement.classList.remove('text-danger');
                judgement.classList.add('text-success');
            }
            else {
                judgement.classList.remove('text-success');
                judgement.classList.add('text-danger');
            }
        }
        if (debugging_mode) {
            console.log(checkbox.value);
        }

    }

    function onchange_select(sequence_number, with_judgement) {
        if (debugging_mode) {
            console.log(with_judgement);
        }

        const actual_value = document.getElementById(`target_value_${sequence_number}`);
        const select = document.getElementById(`actual_value_${sequence_number}`);
        const judgement = document.getElementById(`condition_judgement_${sequence_number}`);
        let data = actual_value.textContent;
        let result = data.includes("|");
        if (with_judgement > 0) {
            if (result) {
                if (debugging_mode) {
                    console.log(select.value.trim());
                    console.log(actual_value.textContent);
                }

                if (actual_value.textContent.includes(`${select.value.trim()}`)) {
                    judgement.textContent = 'Pass';
                    judgement.classList.remove('text-danger');
                    judgement.classList.add('text-success');
                }
                else {
                    judgement.textContent = 'Fail';
                    judgement.classList.remove('text-success');
                    judgement.classList.add('text-danger');
                }
            }
            else {
                if (select.value.trim() == actual_value.textContent.trim()) {
                    judgement.textContent = 'Pass';
                    judgement.classList.remove('text-danger');
                    judgement.classList.add('text-success');
                }
                else {
                    judgement.textContent = 'Fail';
                    judgement.classList.remove('text-success');
                    judgement.classList.add('text-danger');
                }
            }
        }
    }

    // Table Click Function
    function tableClick(id_number, sub_pid, item_parts_number, item_code, revision_number, lot_number, assign_id, operator_number, wafer_number_from, wafer_number_to, batch_number) {
        operatorValidate();
        let operatorValidity = operatorValidate();
        localStorage.setItem('id_number', id_number);
        localStorage.setItem('wafer_number_from', wafer_number_from);
        localStorage.setItem('wafer_number_to', wafer_number_to);
        const params = {
            idNumber: id_number,
            subPid: sub_pid,
            itemPartsNumber: item_parts_number,
            itemCode: item_code,
            revisionNumber: revision_number,
            lotNumber: lot_number,
            assignId: assign_id,
            operator_number: operator_number,
            batch_number: batch_number,
            tableClicked: 'true'
        };
        const url = new URL(fetchURL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url.toString(), {
            method: 'GET'
        })
            .then(response => response.json())
            .then(returnedData => {
                if (debugging_mode) {
                    console.log(returnedData);
                }

                let tableStatus = localStorage.getItem('SubProcessStatus');
                const tableBody = document.getElementById('table');
                if (returnedData[0] == '0' || returnedData[0] == null) {
                    tableBody.innerHTML = '';
                    if (localStorage.getItem('SI_Data_Length') <= 0) {
                        Swal.fire(
                            'Info!',
                            'Please be aware that the sub-process currently has no item conditions.',
                            'info'
                        );
                    }

                    if (tableStatus == 'Open' && operatorValidity && localStorage.getItem('SI_Data_Length') > 0) {
                        document.getElementById('specialInstruction').disabled = false;
                        enabledSaveBtn();
                    }
                }
                else {
                    tableBody.innerHTML = '';
                    let newSequence = 0;
                    for (let data of returnedData) {
                        console.log(data.target_value);
                        newSequence++;
                        if (tableStatus == 'Open' && operatorValidity) {
                            enabledSaveBtn();
                            document.getElementById('refetch_button').classList.remove('d-none');
                            if (debugging_mode) {
                                console.log(`localStorage.getItem('SI_Data_Length') ${localStorage.getItem('SI_Data_Length')}`);
                            }

                            if (localStorage.getItem('SI_Data_Length') > 0) {
                                document.getElementById('specialInstruction').disabled = false;
                            }
                            localStorage.setItem('id_number', id_number);
                            localStorage.setItem('field_type', data.field_type);
                            if (data.field_type_selection <= 0) {
                                if (data.field_type == 'Char' || data.field_type == 'Text') {
                                    var tableRow = `
                                <tr id="tr_${data.sequence_number}">
                                    <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                    <td>${data.id_number ? data.id_number : (id_number ? id_number : '')}</td>
                                    <td scope="row">${newSequence}</td>
                                    <td>
                                    <input type="number" id="wafer_number_from_${data.sequence_number ? data.sequence_number : newSequence}"  class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                    </td>
                                    <td>
                                    <input type="number" id="wafer_number_to_${data.sequence_number ? data.sequence_number : newSequence}"  class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                    </td>
                                    <td>${data.detail_description ? data.detail_description : data.condition_description}</td>
                                    <td>
                                    <input type="text" class="form-control" oninput="calculateBlade(${data.with_judgement}, ${data.sequence_number})" value="${data.actual_value ? data.actual_value : ''}" id="actual_value_${data.sequence_number ? data.sequence_number : newSequence}" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}" required>
                                    </td>
                                    <td id="target_value_${data.sequence_number}">${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                    <td>${data.min_value ? data.min_value : data.minimum_value}</td>
                                    <td>${data.max_value ? data.max_value : data.maximum_value}</td>
                                    <td id="condition_judgement_${data.sequence_number}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                    <td>
                                        <button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${data.sequence_number})"><span class="material-symbols-outlined">shadow_add</span></button>
                                    </td>
                                    <td class="d-none">${data.special_instruction ? data.special_instruction : '0'}</td>
                                </tr>
                                `;
                                    tableBody.innerHTML += tableRow;
                                    if (data.special_instruction > 0) {
                                        document.getElementById(`tr_${data.sequence_number}`).classList.add('table-danger');
                                    }
                                }
                                else if (data.field_type == 'Integer' || data.field_type == 'Int' || data.field_type == 'integer' || data.field_type == 'Number' || data.field_type == 'Decimal') {
                                    var tableRow = `
                                    <tr id="tr_${data.sequence_number}">
                                    <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                    <td>${data.id_number ? data.id_number : (id_number ? id_number : '')}</td>
                                    <td scope="row">${newSequence}</td>
                                    <td>
                                        <input type="number" id="wafer_number_from_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                    </td>
                                    <td>
                                        <input type="number" id="wafer_number_to_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                    </td>
                                    <td>${data.detail_description ? data.detail_description : data.condition_description}</td>
                                    <td>
                                        <input type="number" oninput="calculate(${data.with_judgement}, ${data.sequence_number})" class="form-control" value="${data.actual_value ? data.actual_value : ''}" id="actual_value_${data.sequence_number ? data.sequence_number : newSequence}" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}" required>
                                    </td>
                                    <td>${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                    <td id="min_value_${data.sequence_number}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                    <td id="max_value_${data.sequence_number}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                    <td id="condition_judgement_${data.sequence_number}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                    <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${data.sequence_number})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                    <td class="d-none">${data.special_instruction ? data.special_instruction : '0'}</td>
                                    </tr>
                                `;
                                    tableBody.innerHTML += tableRow;
                                    if (data.special_instruction > 0) {
                                        document.getElementById(`tr_${data.sequence_number}`).classList.add('table-danger');
                                    }
                                }
                                else if (data.field_type == 'Date' || data.field_type == 'date') {
                                    var tableRow = `
                                    <tr id="tr_${data.sequence_number}">
                                    <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                    <td>${data.id_number ? data.id_number : (id_number ? id_number : '')}</td>
                                    <td scope="row">${newSequence}</td>
                                    <td>
                                        <input type="number" id="wafer_number_from_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                    </td>
                                    <td>
                                        <input type="number" id="wafer_number_to_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_number_from : wafer_number_to}">
                                    </td>
                                    <td>${data.detail_description ? data.detail_description : data.condition_description}</td>
                                    <td>
                                        <input type="date" oninput="calculateBlade(${data.with_judgement}, ${data.sequence_number})" class="form-control" value="${data.actual_value ? data.actual_value : ''}" id="actual_value_${data.sequence_number ? data.sequence_number : newSequence}" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}" required>
                                    </td>
                                    <td id="target_value_${data.sequence_number}">${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                    <td id="min_value_${data.sequence_number}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                    <td id="max_value_${data.sequence_number}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                    <td id="condition_judgement_${data.sequence_number}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                    <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${data.sequence_number})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                    <td class="d-none">${data.special_instruction ? data.special_instruction : '0'}</td>
                                    </tr>
                                `;
                                    tableBody.innerHTML += tableRow;
                                    if (data.special_instruction > 0) {
                                        document.getElementById(`tr_${data.sequence_number}`).classList.add('table-danger');
                                    }
                                }
                                else if (data.field_type == 'Time' || data.field_type == 'time') {
                                    var tableRow = `
                                    <tr id="tr_${data.sequence_number}">
                                    <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                    <td>${data.id_number ? data.id_number : (id_number ? id_number : '')}</td>
                                    <td scope="row">${newSequence}</td>
                                    <td>
                                        <input type="number" id="wafer_number_from_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                    </td>
                                    <td>
                                        <input type="number" id="wafer_number_to_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                    </td>
                                    <td>${data.detail_description ? data.detail_description : data.condition_description}</td>
                                    <td>
                                        <input type="time" oninput="calculateBlade(${data.with_judgement}, ${data.sequence_number})" class="form-control" value="${data.actual_value ? data.actual_value : ''}" id="actual_value_${data.sequence_number ? data.sequence_number : newSequence}" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}" required>
                                    </td>
                                    <td id="target_value_${data.sequence_number}">${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                    <td id="min_value_${data.sequence_number}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                    <td id="max_value_${data.sequence_number}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                    <td id="condition_judgement_${data.sequence_number}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                    <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${data.sequence_number})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                    <td class="d-none">${data.special_instruction ? data.special_instruction : '0'}</td>
                                    </tr>
                                `;
                                    tableBody.innerHTML += tableRow;
                                    if (data.special_instruction > 0) {
                                        document.getElementById(`tr_${data.sequence_number}`).classList.add('table-danger');
                                    }
                                }
                                else if (data.field_type == 'Check Box' || data.field_type == 'CheckBox' || data.field_type == 'Checkbox' || data.field_type == 'Check box') {
                                    var tableRow = `
                                    <tr id="tr_${data.sequence_number}">
                                    <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                    <td>${data.id_number ? data.id_number : (id_number ? id_number : '')}</td>
                                    <td scope="row">${newSequence}</td>
                                    <td>
                                        <input type="number" id="wafer_number_from_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                    </td>
                                    <td>
                                        <input type="number" id="wafer_number_to_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                    </td>
                                    <td>${data.detail_description ? data.detail_description : data.condition_description}</td>
                                    <td>
                                        <input type="checkbox" class="form-check-input" id="actual_value_${data.sequence_number ? data.sequence_number : newSequence}" value="${data.actual_value ? data.actual_value : 0}" onchange="onchange_checkbox(${data.sequence_number ? data.sequence_number : newSequence}, ${data.with_judgement})" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}">
                                    </td>
                                    <td>${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                    <td id="min_value_${data.sequence_number}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                    <td id="max_value_${data.sequence_number}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                    <td id="condition_judgement_${data.sequence_number}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                    <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${data.sequence_number})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                    <td class="d-none">${data.special_instruction ? data.special_instruction : '0'}</td>
                                    </tr>
                                `;
                                    tableBody.innerHTML += tableRow;
                                    if (data.special_instruction > 0) {
                                        document.getElementById(`tr_${data.sequence_number}`).classList.add('table-danger');
                                    }
                                    const checkbox = document.getElementById(`actual_value_${data.sequence_number}`);
                                    if (parseInt(checkbox.value) > 0) {
                                        checkbox.setAttribute('checked', 'true');
                                    }
                                }
                                else if (data.field_type == 'Date & Time') {
                                    var tableRow = `
                                    <tr id="tr_${data.sequence_number}">
                                    <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                    <td>${data.id_number ? data.id_number : (id_number ? id_number : '')}</td>
                                    <td scope="row">${newSequence}</td>
                                    <td>
                                        <input type="number" id="wafer_number_from_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                    </td>
                                    <td>
                                        <input type="number" id="wafer_number_to_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                    </td>
                                    <td>${data.detail_description ? data.detail_description : data.condition_description}</td>
                                    <td>
                                        <input type="datetime-local" class="form-control" id="actual_value_${data.sequence_number ? data.sequence_number : newSequence}" value="" data-bs-field_type="${data.field_type}">
                                    </td>
                                    <td>${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                    <td id="min_value_${data.sequence_number}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                    <td id="max_value_${data.sequence_number}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                    <td id="condition_judgement_${data.sequence_number}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                    <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${data.sequence_number})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                    <td class="d-none">${data.special_instruction ? data.special_instruction : '0'}</td>
                                    </tr>
                                `;
                                    tableBody.innerHTML += tableRow;
                                    if (data.special_instruction > 0) {
                                        document.getElementById(`tr_${data.sequence_number}`).classList.add('table-danger');
                                    }
                                }
                                else {
                                    var tableRow = `
                                    <tr id="tr_${data.sequence_number}">
                                    <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                    <td>${data.id_number ? data.id_number : (id_number ? id_number : '')}</td>
                                    <td scope="row">${newSequence}</td>
                                    <td>
                                        <input type="number" id="wafer_number_from_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                    </td>
                                    <td>
                                        <input type="number" id="wafer_number_to_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                    </td>
                                    <td>${data.detail_description ? data.detail_description : data.condition_description}</td>
                                    <td>
                                        <input type="number" oninput="calculate(${data.with_judgement}, ${data.sequence_number})" class="form-control" value="${data.actual_value ? data.actual_value : ''}" id="actual_value_${data.sequence_number ? data.sequence_number : newSequence}" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}" required>
                                    </td>
                                    <td>${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                    <td id="min_value_${data.sequence_number}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                    <td id="max_value_${data.sequence_number}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                    <td id="condition_judgement_${data.sequence_number}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                    <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${data.sequence_number})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                    <td class="d-none">${data.special_instruction ? data.special_instruction : '0'}</td>
                                    </tr>
                                `;
                                    tableBody.innerHTML += tableRow;
                                    if (data.special_instruction > 0) {
                                        document.getElementById(`tr_${data.sequence_number}`).classList.add('table-danger');
                                    }
                                }
                            }
                            else if (data.field_type_selection == 1) {
                                var tableRow = `
                                <tr id="tr_${data.sequence_number}">
                                <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                <td>${data.id_number ? data.id_number : (id_number ? id_number : '')}</td>
                                <td scope="row">${newSequence}</td>
                                <td>
                                    <input type="number" id="wafer_number_from_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                </td>
                                <td>
                                    <input type="number" id="wafer_number_to_${data.sequence_number ? data.sequence_number : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                </td>
                                <td>${data.detail_description ? data.detail_description : data.condition_description}</td>
                                <td>
                                <select class="form-control" id="actual_value_${data.sequence_number ? data.sequence_number : data.newSequence}" onchange="onchange_select(${data.sequence_number ? data.sequence_number : data.newSequence}, ${data.with_judgement})" data-bs-field_type="${data.field_type}" data-bs-option_value="${data.option_value}" data-bs-with_judgement="${data.with_judgement}">
                                </select>
                                </td>
                                <td id="target_value_${data.sequence_number ? data.sequence_number : newSequence}">${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                <td>${data.min_value ? data.min_value : data.minimum_value}</td>
                                <td>${data.max_value ? data.max_value : data.maximum_value}</td>
                                <td id="condition_judgement_${data.sequence_number ? data.sequence_number : newSequence}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${data.sequence_number})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                <td class="d-none">${data.special_instruction ? data.special_instruction : '0'}</td>
                                </tr>
                            `;

                                tableBody.innerHTML += tableRow;
                                if (data.special_instruction > 0) {
                                    document.getElementById(`tr_${data.sequence_number}`).classList.add('table-danger');
                                }
                                const select = document.getElementById(`actual_value_${data.sequence_number ? data.sequence_number : data.sequence_number}`);
                                if (data.option_value) {
                                    const options = data.option_value.split("|");
                                    const default_option = `<option selected>Open this select menu</option>`;
                                    select.innerHTML += default_option;
                                    for (let i = 0; i < options.length; i++) {
                                        const option = `
                                        <option id="opt_${i}" value="${options[i].trim()}">
                                            ${options[i].trim()}
                                        </option>`;
                                        select.innerHTML += option;
                                        if (data.actual_value == options[i].trim()) {
                                            if (debugging_mode) {
                                                console.log(select.querySelector(`#opt_${i}`));
                                            }

                                            select.querySelector(`#opt_${i}`).setAttribute('selected', 'selected');
                                        }
                                    }
                                }
                                else {
                                    const default_option = `<option selected>No option values are available</option>`;
                                    select.innerHTML += default_option;
                                }

                            }
                            const div = document.getElementById('remarksDiv');
                            const textArea = `<textarea class="form-control" placeholder="Leave a comment here" id="remarksInput">${data.tpc_sub_remarks ? data.tpc_sub_remarks : ''}</textarea>`;
                            div.innerHTML = textArea;
                            if (localStorage.getItem('buttonResultType') == 'Chips') {
                                const wafer_from = document.getElementById(`wafer_number_from_${data.sequence_number ? data.sequence_number : newSequence}`);
                                const wafer_to = document.getElementById(`wafer_number_to_${data.sequence_number ? data.sequence_number : newSequence}`);
                                wafer_from.readOnly = true;
                                wafer_from.classList.add('bg-light');
                                wafer_to.readOnly = true;
                                wafer_to.classList.add('bg-light');
                            }
                        }
                        else {
                            document.getElementById('refetch_button').classList.add('d-none');
                            if (data.field_type == 'Text' || data.field_type == 'Char') {
                                var tableRow = `
                            <tr>
                                <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                <td>${data.id_number ? data.id_number : (id_number ? id_number : '')}</td>
                                <td scope="row">${newSequence}</td>
                                <td>${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}</td>
                                <td>${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}</td>
                                <td>${data.detail_description ? data.detail_description : data.condition_description}</td>
                                <td>${data.actual_value ? data.actual_value : data.actual_value ? data.actual_value : '-'}</td>
                                <td>${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                <td>${data.min_value ? data.min_value : data.minimum_value}</td>
                                <td>${data.max_value ? data.max_value : data.maximum_value}</td>
                                <td>${data.condition_judgement ? data.condition_judgement : ''}</td>
                                <td></td>
                            </tr>
                            `;
                                tableBody.innerHTML += tableRow;
                                const div = document.getElementById('remarksDiv');
                                const p = `<p class="text-start" style="text-align: left;">${data.tpc_sub_remarks ? data.tpc_sub_remarks : ''}</p>`;
                                div.innerHTML = p;
                            }
                            else {
                                var tableRow = `
                                <tr>
                                    <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                    <td>${data.id_number ? data.id_number : (id_number ? id_number : '')}</td>
                                    <td scope="row">${newSequence}</td>
                                    <td>${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}</td>
                                    <td>${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}</td>
                                    <td>${data.detail_description ? data.detail_description : data.condition_description}</td>
                                    <td>${data.actual_value ? data.actual_value : data.actual_value ? data.actual_value : '-'}</td>
                                    <td>${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                    <td>${data.min_value ? data.min_value : data.minimum_value}</td>
                                    <td>${data.max_value ? data.max_value : data.maximum_value}</td>
                                    <td>${data.condition_judgement ? data.condition_judgement : ''}</td>
                                    <td></td>
                                </tr>
                            `;
                                tableBody.innerHTML += tableRow;
                                const div = document.getElementById('remarksDiv');
                                const p = `<p class="text-start" style="text-align: left;">${data.tpc_sub_remarks ? data.tpc_sub_remarks : ''}</p>`;
                                div.innerHTML = p;
                            }
                        }
                    }
                    if (tableStatus == 'Open') {
                        let myPromise = new Promise(function (myResolve, myReject) {
                            if (returnedData.length > 0) {
                                myResolve(true);
                            } else {
                                myReject(false);
                            }
                        });

                        myPromise.then(
                            function (value) { getIOT(value, sub_pid); },
                            function (error) { getIOT(error, sub_pid); }
                        );
                    }
                }
            })
            .catch(error => {
                if (debugging_mode) {
                    console.log(error);
                }

            })
    }

    function getIOT(success, SubPid) {
        if (success) {
            localStorage.getItem('id_number');
            localStorage.getItem('wafer_number_from');
            localStorage.getItem('wafer_number_to');
            const section = document.getElementById('section').innerHTML;
            const params = {
                SubPid: SubPid,
                get_iot_data: 'true'
            };
            const url = new URL(fetchURL);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            const tableBody = document.getElementById('table');
            const tr = tableBody.querySelectorAll(`tr`);
            operatorValidate();
            let operatorValidity = operatorValidate();
            fetch(url.toString(), {
                method: 'GET'
            })
                .then(response => response.json())
                .then(datas => {
                    if (debugging_mode) {
                        console.log(datas);
                    }
                    if (datas) {
                        if (datas.success) {
                            for (let data of datas.data) {
                                if (debugging_mode) {
                                    console.log('IOT FETCHING');
                                    console.log(data);
                                }

                                const header_data = JSON.parse(localStorage.getItem('header_data'));
                                // Get IOT Actual Data from Engineering Servero
                                const getIot = new FormData();
                                getIot.append('server', data.eng_server);
                                getIot.append('database_name', data.database_name);
                                getIot.append('username', data.eng_db_username);
                                getIot.append('password', data.eng_db_password);
                                getIot.append('table_name', data.table_name);
                                getIot.append('fieldname_1', data.fieldname_1);
                                getIot.append('fieldname_2', data.fieldname_2);
                                getIot.append('fieldname_3', data.fieldname_3);
                                getIot.append('fieldname_4', data.fieldname_4);
                                getIot.append('fieldname_5', data.fieldname_5);
                                getIot.append('detail_description', data.detail_description);
                                if (section) {
                                    for (var key in header_data) {
                                        if (header_data.hasOwnProperty(key)) {
                                            getIot.append(key, header_data[key]);
                                        }
                                    }
                                }
                                getIot.append('section', section);
                                getIot.append('output_fieldname', data.output_fieldname);
                                getIot.append('get_iot', 'true');
                                fetch(fetchURL, {
                                    method: 'POST',
                                    body: getIot
                                })
                                    .then(response => response.json())
                                    .then(datas => {
                                        if (debugging_mode) {
                                            console.log(datas);
                                        }

                                        if (datas) {
                                            if (datas.success) {
                                                for (let dat of datas.data) {
                                                    let tableStatus = localStorage.getItem('SubProcessStatus');
                                                    if (tableStatus == 'Open' && operatorValidity) {
                                                        enabledSaveBtn();
                                                        for (var key in dat) {
                                                            if (dat.hasOwnProperty(key)) {
                                                                for (let i = 0; i < tr.length; i++) {
                                                                    const td_element = tr[i].querySelectorAll('td');
                                                                    if (data.detail_description == td_element[5].innerHTML) {
                                                                        if (td_element[6].querySelector(`input`)) {
                                                                            td_element[6].querySelector('input').value = dat[key];
                                                                            td_element[6].querySelector('input').readOnly = true;
                                                                            var event = document.createEvent('Event');
                                                                            event.initEvent('input', true, false);

                                                                            td_element[6].querySelector('input').dispatchEvent(event);
                                                                        }
                                                                        else if (td_element[6].querySelector('select')) {
                                                                            td_element[6].innerHTML = `<input class="form-control" type="text" value="${dat[key]}" readonly>`;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                        for (var key in dat) {
                                                            if (dat.hasOwnProperty(key)) {
                                                                for (let i = 0; i < tr.length; i++) {
                                                                    const td_element = tr[i].querySelectorAll('td');
                                                                    if (data.detail_description == td_element[5].innerHTML) {
                                                                        td_element[6].innerHTML = dat[key];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                }
                                            }
                                        }
                                    })
                                    .catch(error => {
                                        if (debugging_mode) {
                                            console.log(error);
                                        }

                                    })
                            }
                        }
                    }
                })
                .catch(error => {
                    if (debugging_mode) {
                        console.log(error);
                    }

                })
        }
    }


    // Add row function
    function addRow(with_judgement, sequence_number) {
        $('#addRowModal').modal('show');
        const insert_btn = document.getElementById(`insert_row_btn`);
        const row_start = document.getElementById(`addRowStart`);
        const row_end = document.getElementById(`addRowEnd`);
        const add_row_sequence = document.getElementById(`addRowSequence`);
        const add_row_with_judgement = document.getElementById(`addRowWithJudgement`);
        const title = document.getElementById(`addRowTitle`);
        add_row_sequence.value = sequence_number;
        add_row_with_judgement.value = with_judgement;
        const tr1 = document.getElementById(`tr_${add_row_sequence.value}`);
        const td2 = tr1.querySelectorAll(`td`);
        title.textContent = td2[5].textContent;
        if (debugging_mode) {
            console.log(add_row_with_judgement.value);
        }

        insert_btn.addEventListener('click', function () {
            event.preventDefault();
            const tableBody = document.getElementById('table');
            let total_tr = tableBody.querySelectorAll(`tr`).length;
            const tr = document.getElementById(`tr_${add_row_sequence.value}`);
            const td = tr.querySelectorAll(`td`);
            if (parseInt(row_start.value) > parseInt(row_end.value)) {
                Swal.fire(
                    'Error!',
                    'The wafer start must be less than the wafer end to avoid errors.',
                    'warning'
                )
            }
            else {
                const total_wafer_length = parseInt(row_end.value) - parseInt(row_start.value) + 1;
                let row_count = row_end.value;
                for (let i = 0; i < total_wafer_length; i++) {
                    total_tr++;
                    let tag = td[6].querySelector(`#actual_value_${add_row_sequence.value}`).tagName;
                    if (debugging_mode) {
                        console.log(tag);
                    }

                    let field_type = td[6].querySelector(`#actual_value_${add_row_sequence.value}`).getAttribute(`data-bs-field_type`);
                    if (tag == 'SELECT') {
                        let option_value = td[6].querySelector(`#actual_value_${add_row_sequence.value}`).getAttribute(`data-bs-option_value`);
                        let selected_value = td[6].querySelector(`#actual_value_${add_row_sequence.value}`).value;
                        var tableRow = `
                    <tr class="table-primary" id="tr_${total_tr}">
                        <td style="display: none;"></td>
                        <td>${td[1].textContent}</td>
                        <td scope="row">${add_row_sequence.value}</td>
                        <td>
                            <input type="number" id="wafer_number_from_${total_tr}" class="form-control" value="${row_count}">
                        </td>
                        <td>
                            <input type="number" id="wafer_number_to_${total_tr}" class="form-control" value="${row_count}">
                        </td>
                        <td>${td[5].textContent}</td>
                        <td>
                            <select class="form-control" id="actual_value_${total_tr}" onchange="onchange_select(${total_tr}, ${add_row_with_judgement.value})" data-bs-field_type="${field_type}" data-bs-option_value="${option_value}" data-bs-with_judgement="${add_row_with_judgement.value}">
                            </select>    
                        </td>
                        <td id="target_value_${total_tr}">${td[7].textContent}</td>
                        <td id="min_value_${total_tr}">${td[8].textContent}</td>
                        <td id="max_value_${total_tr}">${td[9].textContent}</td>
                        <td id="condition_judgement_${total_tr}">${td[10].textContent}</td>
                        <td><button type="button" class="btn btn-outline-none" onclick="removeRow(${total_tr})"><span class="material-symbols-outlined">shadow_minus</span></button></td>
                        <td class="d-none">0</td>
                    </tr>`;
                        tr.insertAdjacentHTML('afterend', tableRow);
                        const select = document.getElementById(`actual_value_${total_tr}`);
                        let options = td[6].querySelectorAll(`option`);
                        for (let j = 0; j < options.length; j++) {
                            const opt = `
                            <option value="${options[j].innerText.trim()}" id="option_${j}_${total_tr}">
                                ${options[j].innerText.trim()}
                            </option>`;
                            select.innerHTML += opt;
                            if (selected_value == options[j].innerText.trim()) {
                                select.querySelector(`#option_${j}_${total_tr}`).setAttribute('selected', 'true');
                            }
                        }
                    }
                    else {
                        if (td[6].querySelector(`input`).type == 'checkbox') {
                            if (parseInt(td[6].querySelector(`input`).value) > 0) {
                                var tableRow = `
                                <tr class="table-primary" id="tr_${total_tr}">
                                    <td style="display: none;"></td>
                                    <td>${td[1].textContent}</td>
                                    <td scope="row">${add_row_sequence.value}</td>
                                    <td>
                                        <input type="number" id="wafer_number_from_${total_tr}" class="form-control" value="${row_count}">
                                    </td>
                                    <td>
                                        <input type="number" id="wafer_number_to_${total_tr}" class="form-control" value="${row_count}">
                                    </td>
                                    <td>${td[5].textContent}</td>
                                    <td>
                                        <input type="${td[6].querySelector(`input`).type}" onchange="onchange_checkbox(${total_tr}, ${add_row_with_judgement.value})" class="${td[6].querySelector('input').classList}" value="${td[6].querySelector(`input`).value}" id="actual_value_${total_tr}" data-bs-field_type="${field_type}" data-bs-with_judgement="${add_row_with_judgement.value}" checked>
                                    </td>
                                    <td id="target_value_${total_tr}">${td[7].textContent}</td>
                                    <td id="min_value_${total_tr}">${td[8].textContent}</td>
                                    <td id="max_value_${total_tr}">${td[9].textContent}</td>
                                    <td id="condition_judgement_${total_tr}">${td[10].textContent}</td>
                                    <td><button type="button" class="btn btn-outline-none" onclick="removeRow(${total_tr})"><span class="material-symbols-outlined">shadow_minus</span></button></td>
                                    <td class="d-none">0</td>
                                </tr>`;
                            }
                            else {
                                var tableRow = `
                                <tr class="table-primary" id="tr_${total_tr}">
                                    <td style="display: none;"></td>
                                    <td>${td[1].textContent}</td>
                                    <td scope="row">${add_row_sequence.value}</td>
                                    <td>
                                        <input type="number" id="wafer_number_from_${total_tr}" class="form-control" value="${row_count}">
                                    </td>
                                    <td>
                                        <input type="number" id="wafer_number_to_${total_tr}" class="form-control" value="${row_count}">
                                    </td>
                                    <td>${td[5].textContent}</td>
                                    <td>
                                        <input type="${td[6].querySelector(`input`).type}" onchange="onchange_checkbox(${total_tr}, ${add_row_with_judgement.value})" class="${td[6].querySelector('input').classList}" value="${td[6].querySelector(`input`).value}" id="actual_value_${total_tr}" data-bs-field_type="${field_type}" data-bs-with_judgement="${add_row_with_judgement.value}">
                                    </td>
                                    <td id="target_value_${total_tr}">${td[7].textContent}</td>
                                    <td id="min_value_${total_tr}">${td[8].textContent}</td>
                                    <td id="max_value_${total_tr}">${td[9].textContent}</td>
                                    <td id="condition_judgement_${total_tr}">${td[10].textContent}</td>
                                    <td><button type="button" class="btn btn-outline-none" onclick="removeRow(${total_tr})"><span class="material-symbols-outlined">shadow_minus</span></button></td>
                                    <td class="d-none">0</td>
                                </tr>`;
                            }
                        }
                        else {
                            var tableRow = `
                        <tr class="table-primary" id="tr_${total_tr}">
                            <td style="display: none;"></td>
                            <td>${td[1].textContent}</td>
                            <td scope="row">${add_row_sequence.value}</td>
                            <td>
                                <input type="number" id="wafer_number_from_${total_tr}" class="form-control" value="${row_count}">
                            </td>
                            <td>
                                <input type="number" id="wafer_number_to_${total_tr}" class="form-control" value="${row_count}">
                            </td>
                            <td>${td[5].textContent}</td>
                            <td>
                                <input type="${td[6].querySelector(`input`).type}" oninput="${td[6].querySelector(`input`).type == 'text' ? `calculateBlade(${add_row_with_judgement.value}, ${total_tr})` : `calculate(${add_row_with_judgement.value}, ${total_tr})`}" class="${td[6].querySelector('input').classList}" value="${td[6].querySelector(`input`).value}" id="actual_value_${total_tr}" data-bs-field_type="${field_type}" data-bs-with_judgement="${add_row_with_judgement.value}" required>
                            </td>
                            <td id="target_value_${total_tr}">${td[7].textContent}</td>
                            <td id="min_value_${total_tr}">${td[8].textContent}</td>
                            <td id="max_value_${total_tr}">${td[9].textContent}</td>
                            <td id="condition_judgement_${total_tr}">${td[10].textContent}</td>
                            <td><button type="button" class="btn btn-outline-none" onclick="removeRow(${total_tr})"><span class="material-symbols-outlined">shadow_minus</span></button></td>
                            <td class="d-none">0</td>
                        </tr>`;
                        }
                        tr.insertAdjacentHTML('afterend', tableRow);
                    }
                    row_count--;
                }
            }
            $('#addRowModal').modal('hide');
            add_row_sequence.value = '';
            add_row_with_judgement.value = '';
            row_start.value = '';
            row_end.value = '';
        });
    }
    // Add condition function
    function addCondition() {
        $('#addConditionModal').modal('show');
        const reference_hr = document.getElementById('reference_hr');
        const select = document.getElementById('add_condition_select');
        const operator_select = document.getElementById('operator_select');
        const submit_btn = document.getElementById('submit_add_condition');
        const condition_tbody = document.getElementById('condition_tbody');
        const add_condition_btn = document.getElementById('add_condition_btn');
        const table = document.getElementById('reference_table');
        const data = document.getElementById('formAssignment').textContent.split(':');
        const assignment_id = data[1];
        const SubPid = localStorage.getItem('SUBPID');
        const params = {
            assignment_id: assignment_id,
            SubPid: SubPid,
            get_conditions: 'true'
        }
        const url = new URL(fetchURL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url.toString(), {
            method: 'GET'
        })
            .then(response => response.json())
            .then(datas => {
                submit_btn.disabled = true;
                if (datas) {
                    if (datas.success) {
                        reference_hr.classList.remove('d-none');
                        for (let data of datas.data) {
                            let options = `<option value="${data.SubPid}">${data.SubPname}</option>`;
                            select.innerHTML += options;
                        }
                        select.addEventListener('change', () => {
                            const params = {
                                assignment_id: assignment_id,
                                SubPid: select.value,
                                get_operators: 'true'
                            }
                            const url = new URL(fetchURL);
                            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                            fetch(url.toString(), {
                                method: 'GET'
                            })
                                .then(response => response.json())
                                .then(datas => {
                                    operator_select.innerHTML = '';
                                    if (datas) {
                                        if (datas.success) {
                                            submit_btn.disabled = false;
                                            for (let i = 1; i <= datas.operator_number; i++) {
                                                let option = `<option value="${i}">${i}</option>`;
                                                operator_select.innerHTML += option;
                                            }
                                        }
                                    }
                                })
                                .catch(error => {
                                    if (debugging_mode) {
                                        console.log(error);
                                    }

                                })
                        });
                        submit_btn.addEventListener('click', () => {
                            const params = {
                                assignment_id: assignment_id,
                                SubPid: select.value,
                                operator_number: operator_select.value,
                                get_other_conditions: 'true'
                            }
                            const url = new URL(fetchURL);
                            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                            fetch(url.toString(), {
                                method: 'GET'
                            })
                                .then(response => response.json())
                                .then(datas => {
                                    if (debugging_mode) {
                                        console.log(datas);
                                    }

                                    if (datas) {
                                        if (datas.success) {
                                            document.getElementById('reference_p').classList.remove('d-none');
                                            document.getElementById('nav_condition').classList.remove('d-none');
                                            condition_tbody.innerHTML = '';
                                            for (let data of datas.data) {
                                                var row =
                                                    `
                                            <tr>
                                                <td class="table-primary">${data.id_number}</td>
                                                <td class="table-secondary">${data.sequence_number}</td>
                                                <td class="table-success">${data.wafer_start}</td>
                                                <td class="table-danger">${data.wafer_end}</td>
                                                <td class="table-warning">${data.condition_description}</td>
                                                <td class="table-info">${data.actual_value}</td>
                                                <td class="table-light">${data.target_value}</td>
                                                <td class="table-dark">${data.minimum_value}</td>
                                                <td class="table-info">${data.maximum_value}</td>
                                                <td class="table-light">${data.condition_judgement}</td>
                                                <td class="table-dark"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></td>
                                            </tr>
                                            `;
                                                condition_tbody.innerHTML += row;
                                            }
                                            add_condition_btn.addEventListener('click', () => {
                                                var checkBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
                                                checkBoxes.forEach(chk => {
                                                    const tbl_tr = chk.closest(`tr`);
                                                    const td_element = tbl_tr.querySelectorAll('td');
                                                    const id_number = td_element[0].textContent;
                                                    const sequence_number = td_element[1].textContent;
                                                    const wafer_start = td_element[2].textContent;
                                                    const wafer_end = td_element[3].textContent;
                                                    const condition = td_element[4].textContent;
                                                    const actual_value = td_element[5].textContent;
                                                    const target_value = td_element[6].textContent;
                                                    const min_value = td_element[7].textContent;
                                                    const max_value = td_element[8].textContent;
                                                    const judgement = td_element[9].textContent;

                                                    const row = `
                                                <tr>
                                                    <td class="table-primary">${id_number}</td>
                                                    <td class="table-secondary">${sequence_number}</td>
                                                    <td class="table-success">${wafer_start}</td>
                                                    <td class="table-danger">${wafer_end}</td>
                                                    <td class="table-warning">${condition}</td>
                                                    <td class="table-info">${actual_value}</td>
                                                    <td class="table-light">${target_value}</td>
                                                    <td class="table-dark">${min_value}</td>
                                                    <td class="table-info">${max_value}</td>
                                                    <td class="table-light">${judgement}</td>
                                                </tr>`;
                                                    table.innerHTML += row;
                                                })
                                                submit_btn.disabled = false;
                                                operator_select.innerHTML = '';
                                                condition_tbody.innerHTML = '';
                                                $('#addConditionModal').modal('hide');
                                            });
                                        }
                                    }
                                })
                                .catch(error => {
                                    if (debugging_mode) {
                                        console.log(error);
                                    }

                                })
                        });
                    }
                    else {
                        reference_hr.classList.add('d-none');
                    }
                }
            })
            .catch(error => {
                if (debugging_mode) {
                    console.log(error);
                }

            })

    }
    // Remove added row function
    function removeRow(sequence_number) {
        const tr = document.getElementById(`tr_${sequence_number}`);
        tr.parentNode.removeChild(tr);
    }

    function onInputSub() {
        let ID = document.getElementById('IdScan').value;
        ID = Number(ID).toString();
        if (ID != "" || ID != null) {
            closedSubProcess(ID);
        }
    }

    function closedSubProcess(ID) {
        ID = Number(ID).toString();
        const operatorData = new FormData();
        operatorData.append('id_number', ID);
        operatorData.append('closedSubProcess', 'true');
        fetch(fetchURLQuery, {
            method: 'POST',
            body: operatorData
        })
            .then(response => response.json())
            .then(datas => {
                if (debugging_mode) {
                    console.log(datas);
                }

                let valid = false;
                const openBtn = document.getElementById('subProcessOpen');
                for (let data of datas) {
                    if (debugging_mode) {
                        console.log(data.role_open_process);
                    }

                    if (data.role_open_process == '1') {
                        openBtn.classList.remove('disabled');
                    }
                    else {
                        openBtn.classList.add('disabled');
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    // Open sub process function
    const openBtn = document.getElementById('subProcessOpen');
    openBtn.addEventListener('click', function () {
        event.preventDefault();
        const subProcessID = document.getElementById('subProcessSelect').value;
        const assignment_id = document.getElementById('formAssignment').innerHTML;
        // const SubPid = $("#subProcessSelect").find(':selected').attr('data-subPid');
        var subProcessSelect = document.getElementById('subProcessSelect');
        var selectedOption = subProcessSelect.options[subProcessSelect.selectedIndex];
        var SubPid = selectedOption.getAttribute('data-subPid');

        const ass_id = assignment_id.split(':');
        const subData = new FormData();
        subData.append('main_prd_id', subProcessID);
        subData.append('SubPid', SubPid);
        subData.append('assignment_id', ass_id[1].trim());
        subData.append('openSubProcess', 'true');

        fetch(fetchURLQuery,
            {
                method: 'POST',
                body: subData
            })
            .then(response => response.json())
            .then(datas => {
                if (debugging_mode) {
                    console.log(datas);
                }

                if (datas.success) {
                    let timerInterval
                    Swal.fire({
                        html: datas.message,
                        timer: 1000,
                        icon: 'success',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            let item_code = localStorage.getItem('itemCode');
                            let parts_number = localStorage.getItem('partsNumber');
                            let lot_number = localStorage.getItem('lotNo');
                            let date_issued = localStorage.getItem('dateIssued');
                            let revision_number = localStorage.getItem('revisionNumber');
                            let sectionId = localStorage.getItem('sectionId');
                            let assign_id = localStorage.getItem('assign_id');

                            const params = {
                                item_code: item_code,
                                parts_number: parts_number,
                                lot_number: lot_number,
                                date_issued: date_issued,
                                revision_number: revision_number,
                                section_id: sectionId,
                                assignment_id: assign_id,
                                QrSubmitBtn: 'true'
                            };
                            const url = new URL(fetchURL1);
                            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                            fetch(url.toString(), {
                                method: 'GET'
                            })
                                .then(response => response.json())
                                .then(data => {
                                    if (debugging_mode) {
                                        console.log(data);
                                    }

                                    localStorage.setItem('myData', JSON.stringify(data));
                                    localStorage.setItem('sectionId', JSON.stringify(sectionId));
                                    if (localStorage.getItem('myData') != null || localStorage.getItem('myData') != 0) {
                                        location.reload(true);
                                    }
                                })
                        }
                    })
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
    // Getting the closed sub process'
    function getClosedSubProcess() {
        var select = document.getElementById('subProcessSelect');
        const assignment_id = localStorage.getItem('assign_id');
        const subProcessData = new FormData();
        subProcessData.append('assignment_id', assignment_id);
        subProcessData.append('closeSubProcessBtn', 'true');
        fetch(fetchURLQuery,
            {
                method: 'POST',
                body: subProcessData
            })
            .then(response => response.json())
            .then(datas => {
                if (debugging_mode) {
                    console.log(datas);
                }

                for (let data of datas) {
                    const option = `<option value="${data.main_prd_id}" data-subPid="${data.SubPid}"> ${data.SubPname ? data.SubPname : ''}</option> `
                    select.innerHTML += option;
                }
                // if(datas[0] == null || datas[0] == 0)
                // {

                //     const iframe = `< iframe width = "1280" height = "720" src = "https://www.youtube.com/embed/u-dEnJpCGAQ" title = "Wildlife - The Fascinating World of Wild Animals | Full Series | Free Documentary Nature" frameborder = "0" allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen ></iframe > `
                //     document.getElementById(`main_content`).innerHTML = iframe;
                // }
            })
            .catch(error => {
                console.error(error);
                // if(error)
                // {
                //     const iframe = `< iframe width = "1280" height = "720" src = "https://www.youtube.com/embed/u-dEnJpCGAQ" title = "Wildlife - The Fascinating World of Wild Animals | Full Series | Free Documentary Nature" frameborder = "0" allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen ></iframe > `
                //     document.getElementById(`main_content`).innerHTML += iframe;
                // }
            });
    }
    function getYieldPercentage(SubPid, assignment_id) {
        const getYieldData = new FormData();
        getYieldData.append('SubPid', SubPid);
        getYieldData.append('assignment_id', assignment_id);
        getYieldData.append('getYield', 'true');
        const params = {
            SubPid: SubPid,
            assignment_id: assignment_id,
            getYield: 'true'
        }
        const url = new URL(fetchURL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url.toString(), {
            method: 'GET'
        })
            .then(response => response.json())
            .then(datas => {
                if (debugging_mode) {
                    console.log(datas);
                }

                if (datas) {
                    for (let data of datas) {
                        if (data.quantity_in != '' && data.quantity_out != '' || data.quantity_in != 'null' && data.quantity_out != 'null') {
                            const dataYield = (parseInt(data.quantity_out) / parseInt(data.quantity_in)) * 100;
                            document.getElementById('dataYieldSpan').textContent = `Yield: ${dataYield.toFixed(2) ? dataYield.toFixed(2) : 0}% `
                            if (isNaN(dataYield)) {
                                document.getElementById('dataYieldSpan').textContent = `Yield: 0 % `
                            }
                            if (dataYield >= 90) {
                                enabledDoneBtn();
                                document.getElementById('dataYieldSpan').classList.remove('text-bg-danger');
                                document.getElementById('dataYieldSpan').classList.add('text-bg-success');
                            }
                            else {
                                enabledDoneBtn();
                                document.getElementById('dataYieldSpan').classList.add('text-bg-danger');
                                document.getElementById('dataYieldSpan').classList.remove('text-bg-success');
                            }
                        }
                    }
                }
            })
            .catch(error => {
                if (debugging_mode) {
                    console.log(error);
                }

            })
    }
    // Special Instruction function
    document.getElementById('specialInstruction').addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        const params = {
            SubPid: localStorage.getItem('SUBPID'),
            parts_number: localStorage.getItem('partsNumber'),
            item_code: localStorage.getItem('itemCode'),
            revision_number: localStorage.getItem('revisionNumber'),
            lot_number: localStorage.getItem('lotNo'),
            get_special_instruction: 'true'
        };
        const url = new URL(fetchURL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url.toString(), {
            method: 'GET'
        })
            .then(response => response.json())
            .then(SI_data => {
                if (debugging_mode) {
                    console.log(SI_data);
                }

                if (SI_data) {
                    if (SI_data.success) {
                        enabledSaveBtn();
                        const tableBody = document.getElementById('table');
                        const tr = tableBody.querySelectorAll('tr');
                        let newSequence = tr.length;
                        for (let data of SI_data.data) {
                            newSequence++;
                            if (data.field_type == 'Char' || data.field_type == 'Text') {
                                var tableRow = `
                            <tr id="tr_${newSequence}" class="table-warning">
                                <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.form_instruction_id}</td>
                                <td>${localStorage.getItem('id_number') ? localStorage.getItem('id_number') : 'xxxx'}</td>
                                <td scope="row">${newSequence}</td>
                                <td>
                                <input type="number" id="wafer_number_from_${newSequence ? newSequence : newSequence}"  class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                </td>
                                <td>
                                <input type="number" id="wafer_number_to_${newSequence ? newSequence : newSequence}"  class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                </td>
                                <td>${data.detail_description ? data.detail_description : (data.condition_description ? data.condition_description : data.process_condition)}</td>
                                <td>
                                <input type="text" class="form-control" oninput="calculateBlade(${data.with_judgement}, ${newSequence})" value="${data.actual_value ? data.actual_value : ''}" id="actual_value_${newSequence ? newSequence : newSequence}" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}" required>
                                </td>
                                <td id="target_value_${newSequence}">${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                <td>${data.min_value ? data.min_value : data.minimum_value}</td>
                                <td>${data.max_value ? data.max_value : data.maximum_value}</td>
                                <td id="condition_judgement_${newSequence}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                <td>
                                    <button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${newSequence})"><span class="material-symbols-outlined">shadow_add</span></button>
                                </td>
                                <td class="d-none">${data.with_judgement}</td>
                            </tr>
                            `;
                                tableBody.innerHTML += tableRow;
                            }
                            else if (data.field_type == 'Integer' || data.field_type == 'Int' || data.field_type == 'integer' || data.field_type == 'Number' || data.field_type == 'Decimal') {
                                var tableRow = `
                                <tr id="tr_${newSequence}" class="table-warning">
                                <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                <td>${localStorage.getItem('id_number') ? localStorage.getItem('id_number') : 'xxxx'}</td>
                                <td scope="row">${newSequence}</td>
                                <td>
                                    <input type="number" id="wafer_number_from_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                </td>
                                <td>
                                    <input type="number" id="wafer_number_to_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                </td>
                                <td>${data.detail_description ? data.detail_description : (data.condition_description ? data.condition_description : data.process_condition)}</td>
                                <td>
                                    <input type="number" oninput="calculate(${data.with_judgement}, ${newSequence})" class="form-control" value="${data.actual_value ? data.actual_value : ''}" id="actual_value_${newSequence ? newSequence : newSequence}" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}" required>
                                </td>
                                <td>${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                <td id="min_value_${newSequence}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                <td id="max_value_${newSequence}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                <td id="condition_judgement_${newSequence}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${newSequence})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                <td class="d-none">${data.with_judgement}</td>
                                </tr>
                            `;
                                tableBody.innerHTML += tableRow;
                            }
                            else if (data.field_type == 'Date' || data.field_type == 'date') {
                                var tableRow = `
                                <tr id="tr_${newSequence}" class="table-warning">
                                <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                <td>${localStorage.getItem('id_number') ? localStorage.getItem('id_number') : 'xxxx'}</td>
                                <td scope="row">${newSequence}</td>
                                <td>
                                    <input type="number" id="wafer_number_from_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                </td>
                                <td>
                                    <input type="number" id="wafer_number_to_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_number_from : wafer_number_to}">
                                </td>
                                <td>${data.detail_description ? data.detail_description : (data.condition_description ? data.condition_description : data.process_condition)}</td>
                                <td>
                                    <input type="date" oninput="calculateBlade(${data.with_judgement}, ${newSequence})" class="form-control" value="${data.actual_value ? data.actual_value : ''}" id="actual_value_${newSequence ? newSequence : newSequence}" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}" required>
                                </td>
                                <td id="target_value_${newSequence}">${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                <td id="min_value_${newSequence}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                <td id="max_value_${newSequence}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                <td id="condition_judgement_${newSequence}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${newSequence})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                <td class="d-none">${data.with_judgement}</td>
                                </tr>
                            `;
                                tableBody.innerHTML += tableRow;
                            }
                            else if (data.field_type == 'Time' || data.field_type == 'time') {
                                var tableRow = `
                                <tr id="tr_${newSequence}" class="table-warning">
                                <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                <td>${localStorage.getItem('id_number') ? localStorage.getItem('id_number') : 'xxxx'}</td>
                                <td scope="row">${newSequence}</td>
                                <td>
                                    <input type="number" id="wafer_number_from_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                </td>
                                <td>
                                    <input type="number" id="wafer_number_to_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                </td>
                                <td>${data.detail_description ? data.detail_description : (data.condition_description ? data.condition_description : data.process_condition)}</td>
                                <td>
                                    <input type="time" oninput="calculateBlade(${data.with_judgement}, ${newSequence})" class="form-control" value="${data.actual_value ? data.actual_value : ''}" id="actual_value_${newSequence ? newSequence : newSequence}" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}" required>
                                </td>
                                <td id="target_value_${newSequence}">${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                <td id="min_value_${newSequence}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                <td id="max_value_${newSequence}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                <td id="condition_judgement_${newSequence}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${newSequence})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                <td class="d-none">${data.with_judgement}</td>
                                </tr>
                            `;
                                tableBody.innerHTML += tableRow;
                            }
                            else if (data.field_type == 'Check Box' || data.field_type == 'CheckBox' || data.field_type == 'Checkbox' || data.field_type == 'Check box') {
                                var tableRow = `
                                <tr id="tr_${newSequence}" class="table-warning">
                                <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                <td>${localStorage.getItem('id_number') ? localStorage.getItem('id_number') : 'xxxx'}</td>
                                <td scope="row">${newSequence}</td>
                                <td>
                                    <input type="number" id="wafer_number_from_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                </td>
                                <td>
                                    <input type="number" id="wafer_number_to_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                </td>
                                <td>${data.detail_description ? data.detail_description : (data.condition_description ? data.condition_description : data.process_condition)}</td>
                                <td>
                                    <input type="checkbox" class="form-check-input" id="actual_value_${newSequence ? newSequence : newSequence}" value="${data.actual_value ? data.actual_value : 0}" onchange="onchange_checkbox(${newSequence ? newSequence : newSequence}, ${data.with_judgement})" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}">
                                </td>
                                <td>${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                <td id="min_value_${newSequence}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                <td id="max_value_${newSequence}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                <td id="condition_judgement_${newSequence}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${newSequence})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                <td class="d-none">${data.with_judgement}</td>
                                </tr>
                            `;
                                tableBody.innerHTML += tableRow;
                                const checkbox = document.getElementById(`actual_value_${newSequence}`);
                                if (parseInt(checkbox.value) > 0) {
                                    checkbox.setAttribute('checked', 'true');
                                }
                            }
                            else if (data.field_type == 'Date & Time') {
                                var tableRow = `
                                <tr id="tr_${newSequence}" class="table-warning">
                                <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                <td>${localStorage.getItem('id_number') ? localStorage.getItem('id_number') : 'xxxx'}</td>
                                <td scope="row">${newSequence}</td>
                                <td>
                                    <input type="number" id="wafer_number_from_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                </td>
                                <td>
                                    <input type="number" id="wafer_number_to_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                </td>
                                <td>${data.detail_description ? data.detail_description : (data.condition_description ? data.condition_description : data.process_condition)}</td>
                                <td>
                                    <input type="datetime-local" class="form-control" id="actual_value_${newSequence ? newSequence : newSequence}" value="" data-bs-field_type="${data.field_type}">
                                </td>
                                <td>${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                <td id="min_value_${newSequence}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                <td id="max_value_${newSequence}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                <td id="condition_judgement_${newSequence}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${newSequence})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                <td class="d-none">${data.with_judgement}</td>
                                </tr>
                            `;
                                tableBody.innerHTML += tableRow;
                            } else if (data.field_type === 'Combo Box') {
                                var tableRow = `
                                <tr id="tr_${newSequence}" class="table-warning">
                                <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                <td>${localStorage.getItem('id_number') ? localStorage.getItem('id_number') : 'xxxx'}</td>
                                <td scope="row">${newSequence}</td>
                                <td>
                                    <input type="number" id="wafer_number_from_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                </td>
                                <td>
                                    <input type="number" id="wafer_number_to_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                </td>
                                <td>${data.detail_description ? data.detail_description : (data.condition_description ? data.condition_description : data.process_condition)}</td>
                                <td>
                                    <select class="form-control" id="actual_value_${newSequence ? newSequence : newSequence}" onchange="onchange_select(${newSequence ? newSequence : newSequence}, ${data.with_judgement})" data-bs-field_type="${data.field_type}" data-bs-option_value="${data.option_value}" data-bs-with_judgement="${data.with_judgement}">
                                    </select>
                                </td>
                                <td id="target_value_${newSequence}">${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                <td id="min_value_${newSequence}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                <td id="max_value_${newSequence}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                <td id="condition_judgement_${newSequence}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${newSequence})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                <td class="d-none">${data.with_judgement}</td>
                                </tr>
                            `;
                                tableBody.innerHTML += tableRow;
                                const select = document.getElementById(`actual_value_${newSequence ? newSequence : newSequence}`);
                                if (data.option_value) {
                                    const options = data.option_value.split("|");
                                    const default_option = `<option selected>Open this select menu</option>`;
                                    select.innerHTML += default_option;
                                    for (let i = 0; i < options.length; i++) {
                                        const option = `
                                        <option id="opt_${i}" value="${options[i].trim()}">
                                            ${options[i].trim()}
                                        </option>`;
                                        select.innerHTML += option;
                                        if (data.actual_value == options[i].trim()) {
                                            if (debugging_mode) {
                                                console.log(select.querySelector(`#opt_${i}`));
                                            }

                                            select.querySelector(`#opt_${i}`).setAttribute('selected', 'selected');
                                        }
                                    }
                                }
                            }
                            else {
                                var tableRow = `
                                <tr id="tr_${newSequence}" class="table-warning">
                                <td style="display: none;">${data.condition_item_id ? data.condition_item_id : data.condition_prd_id}</td>
                                <td>${localStorage.getItem('id_number') ? localStorage.getItem('id_number') : 'xxxx'}</td>
                                <td scope="row">${newSequence}</td>
                                <td>
                                    <input type="number" id="wafer_number_from_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_from ? data.wafer_number_from : data.wafer_start ? data.wafer_start : wafer_number_from}">
                                </td>
                                <td>
                                    <input type="number" id="wafer_number_to_${newSequence ? newSequence : newSequence}" class="form-control" value="${data.wafer_number_to ? data.wafer_number_to : data.wafer_end ? data.wafer_end : wafer_number_to}">
                                </td>
                                <td>${data.detail_description ? data.detail_description : (data.condition_description ? data.condition_description : data.process_condition)}</td>
                                <td>
                                    <input type="number" oninput="calculate(${data.with_judgement}, ${newSequence})" class="form-control" value="${data.actual_value ? data.actual_value : ''}" id="actual_value_${newSequence ? newSequence : newSequence}" data-bs-field_type="${data.field_type}" data-bs-with_judgement="${data.with_judgement}" required>
                                </td>
                                <td>${data.typical_value ? data.typical_value : data.target_value ? data.target_value : ''}</td>
                                <td id="min_value_${newSequence}">${data.min_value ? data.min_value : data.minimum_value}</td>
                                <td id="max_value_${newSequence}">${data.max_value ? data.max_value : data.maximum_value}</td>
                                <td id="condition_judgement_${newSequence}">${data.condition_judgement ? data.condition_judgement : ''}</td>
                                <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${newSequence})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                <td class="d-none">${data.with_judgement}</td>
                                </tr>
                            `;
                                tableBody.innerHTML += tableRow;
                            }
                        }
                        document.getElementById('specialInstruction').disabled = true;
                        const div = document.getElementById('remarksDiv');
                        const textArea = `<textarea class="form-control" placeholder="Leave a comment here" id="remarksInput"></textarea>`;
                        div.innerHTML = textArea;
                    }
                }
            })
            .catch(error => {
                if (debugging_mode) {
                    console.log(error);
                }

            })
    })


    getClosedSubProcess();
    $('#viewIcModal').on('shown.bs.modal', function (e) {
        const parts_number = document.getElementById('partsNumber').innerHTML;
        const ic_attachment_container = document.getElementById('IcAttachment');
        const second_modal_btn = document.getElementById('view_ic_attachment_modal');
        const iframe_div = document.getElementById('iframe_div');
        const loading_content = document.getElementById('loading_content');
        const params = {
            parts_number: parts_number,
            get_ic_data: 'true'
        };
        const url = new URL(fetchURL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url.toString(), {
            method: 'GET'
        })
            .then(response => response.json())
            .then(datas => {
                if (debugging_mode) {
                    console.log(datas);
                }

                if (datas) {
                    if (datas.success) {
                        ic_attachment_container.innerHTML = '';
                        for (let data of datas.data) {
                            let card = `<div class="col text-break text-wrap col-md-6">
                                        <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">${data.doc_document_title}</h5>
                                            <p class="card-text ">${data.doc_document_number}</p>
                                                <input type="text" class="form-control d-none" id="input_path" name="input_path" value="${data.doc_actual_directory_distribution}">
                                                <a href="#" class="btn btn-primary view_ic" type="submit" id="view_ic_button" name="view_ic_button" data-bs-Ic_attachment="${data.doc_actual_directory_distribution}">View</a>
                                        </div>
                                        </div>
                                    </div>`;
                            ic_attachment_container.innerHTML += card;
                            const btn = document.querySelectorAll('.view_ic');
                            for (let b of btn) {
                                b.addEventListener('click', () => {
                                    iframe_div.innerHTML = '';
                                    const file = b.getAttribute('data-bs-Ic_attachment');
                                    loading_content.classList.remove('d-none');
                                    const get_file = new FormData();
                                    get_file.append('path', file);
                                    get_file.append('view_ic_button', 'true');
                                    fetch(fetchIC, {
                                        method: 'POST',
                                        body: get_file
                                    })
                                        .then(response => response.json())
                                        .then(datas => {
                                            if (debugging_mode) {
                                                console.log(datas);
                                            }
                                            if (datas) {
                                                if (datas.success) {
                                                    window.location.href = `https://172.16.2.13/TPC_VER2/New folder/index2.php?PATH=${datas.path}`;
                                                    // window.location.href = `https://172.16.2.13/TPC_VER2/New folder/index2.php?PATH=${datas.path}`;
                                                } else {
                                                    showToast(datas.message, 'frontend/images/file_off.png');
                                                }
                                            }
                                        })
                                        // .then(response => {
                                        //     // Check if response is successful
                                        //     if (!response.ok) {
                                        //         throw new Error('Network response was not ok');
                                        //     }
                                        //     loading_content.classList.add('d-none');
                                        //     // Create a blob from the response
                                        //     return response.blob();
                                        // })
                                        // .then(blob => {
                                        //     // Create a blob URL
                                        //     const url = URL.createObjectURL(blob);
                                        //     console.log(url);
                                        //     // window.location.href = `https://172.16.2.120/debug/New folder/index2.php?PATH=${file}`;
                                        //     // console.log(url);
                                        //     // // Display the PDF in an iframe
                                        //     // const pdfViewer = document.createElement('iframe');
                                        //     // pdfViewer.src = url + '#toolbar=0';
                                        //     // pdfViewer.style.width = '100%';
                                        //     // pdfViewer.style.height = '600px';
                                        //     // iframe_div.appendChild(pdfViewer);
                                        // })
                                        .catch(error => {
                                            loading_content.classList.remove('d-none');
                                            console.error('Fetch error:', error);
                                        });

                                    $('#viewICAttachmentModal').modal('show');
                                    $('#viewIcModal').modal('hide');
                                    // const ip = "172.16.2.16";
                                    // const file2 = "https://172.16.2.13/TPC-endpoint/uploads/DISTR_RO-TCI-WSDP-000020VA-00-External Doc - For Deletion 121623.pdf#toolbar=0";
                                    // const file_path = file2.split(" / ");
                                    // console.log(file_path[0]);
                                    // var iframe = `<iframe id="fileViewer" src="${file2}" width="100%" height="500px"></iframe>`;
                                    // iframe_div.innerHTML += iframe;
                                    second_modal_btn.addEventListener('click', () => {
                                        $('#viewIcModal').modal('show');
                                        $('#viewICAttachmentModal').modal('hide');
                                    });
                                });
                            }
                        }
                    }
                }
            })
            .catch(error => {
                if (debugging_mode) {
                    console.log(error);
                }

            })
        $(this).off('shown.bs.modal');
    });
    $('#viewHiddenModal').on('shown.bs.modal', function (e) {
        const modal_body = document.getElementById('modalBody');
        let count = 0;
        modal_body.innerHTML = '';
        for (let data of thisData) {
            if (data.sequence_number == 0) {
                count++;
                if (debugging_mode) {
                    console.log(data.sequence_number);
                }

                const placeholder = `
                    <div class="col text-break text-wrap col-md-3 d-flex p-2">
                        <div class="card p-2 w-100">
                        <div class="card-body">
                            <h5 class="card-title">${count}) ${data.key_code}</h5>
                            <p class="card-text ">${data.SubPname}</p>
                                <input type="text" class="form-control d-none" id="input_path" name="input_path" value="${data.SubPname}">
                        </div>
                        </div>
                    </div>`;
                modal_body.innerHTML += placeholder;
            }
        }
    });
}
