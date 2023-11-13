// DEBUGGING
// const fetchURL = 'https://172.16.2.61/tpc_ver2/backend/query/queries.php';
// const fetchURLQuery = 'https://172.16.2.61/tpc_ver2/backend/endpoint/query.php';
// FOR DEPLOYMENT
const fetchURL = 'https://172.16.2.13/tpc_ver2/backend/query/queries.php';
const fetchURLQuery = 'https://172.16.2.13/tpc_ver2/backend/endpoint/query.php';

console.log(`JAIRUSKIE BAYOTSKIE INITIALIZED SUCCESSFULLY!`);
const thisData = JSON.parse(localStorage.getItem('myData'));
if (localStorage.getItem('patWaferFrom') && localStorage.getItem('patWaferTo')) {
    const patWaferFrom = localStorage.getItem('patWaferFrom');
    const patWaferTo = localStorage.getItem('patWaferFrom');
    console.log(`JAI FROM${patWaferFrom}, JAI TO ${patWaferTo}`);
}
else {
    const patWaferFrom = localStorage.getItem('patWaferFrom');
    const patWaferTo = localStorage.getItem('patWaferFrom');
    console.log(`JAI FROM${patWaferFrom}, JAI TO ${patWaferTo}`);
}
console.log(thisData);
disabledDoneBtn();
disabledSaveBtn();
var sidebar = document.getElementById('sidebar');
var count = 0;
var countString
for (let data of thisData) {
    // sidebar
    document.getElementById('itemCode').textContent = data.item_code;
    document.getElementById('revisionNo').textContent = data.revision_number;
    document.getElementById('section').textContent = data.section_code;

    // headers
    document.getElementById('sectionDescription').textContent = data.section_description;
    document.getElementById('formAssignment').textContent = `Form Assignment: ${data.assignment_id}`;
    document.getElementById('lotNo').textContent = data.lot_number;
    document.getElementById('partsNumber').textContent = data.item_parts_number;
    document.getElementById('quantity').textContent = parseFloat(data.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('dateIssue').textContent = data.date_issued;

    count++;
    var subPname = data.SubPname;
    if (subPname.length > 28) {
        // subPname = subPname.substring(0, 27) + '..';
        subPname = subPname.substring(0, 25);
    }
    else {
        subPname = subPname.substring(0, 28);
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
    data-bs-title="${data.Pname} - ${data.SubPname} ${reworked == true ? '(Reworked)' : ''}" 
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
    >
    ${countString}) ${subPname}
    </button>`;
    // if(data.status == 'Inactive')
    // {
    //     console.log(button);
    // }
    sidebar.innerHTML += button;

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

}
const buttons = document.querySelectorAll(`#btn_process`);
console.log(buttons);
for (let btn of buttons) {
    if (btn.getAttribute('data-sub_status') == 'Inactive' && btn.getAttribute('data-status') != 'Done') {
        btn.insertAdjacentHTML('beforeend', '<span class="material-symbols-outlined aligned-bottom">info</span>');
    }
}
disableEnableBtn();
disabledBatchProcessBtn();
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
// Sidebar Button Process Event
document.querySelectorAll('.btn_process').forEach(button => {
    button.addEventListener('click', () => {
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
        // console.log(button);
        localStorage.setItem('SUBPID', buttonSubPid);
        localStorage.setItem(`subPname`, btnSubPname);
        localStorage.setItem('buttonSectionId', button.dataset.section_id);
        localStorage.setItem('buttonAssignmentId', button.dataset.assignment_id);
        localStorage.setItem('buttonMainProdId', button.dataset.main_prd_id);
        localStorage.setItem('buttonSequenceNumber', buttonSequenceNumber);
        localStorage.setItem('buttonBatchType', buttonBatchType);
        localStorage.setItem('buttonResultType', buttonResultType);
        localStorage.setItem('SubProcessStatus', buttonStatus);
        getYieldPercentage(buttonSubPid, buttonFormAssignment);
        if (buttonStatus == 'Open') {
            enabledDoneBtn();
            enabledSaveBtn();
            enabledBatchProcessBtn();
            document.getElementById('subProcessStatus').classList.remove('text-bg-danger');
            document.getElementById('subProcessStatus').classList.remove('text-bg-success');
            document.getElementById('subProcessStatus').classList.add('text-bg-info');
        }
        else if (buttonStatus == 'Done') {
            disabledDoneBtn();
            disabledSaveBtn();
            enabledBatchProcessBtn();
            // disabledBatchProcessBtn();
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
        const attachmentData = new FormData();
        attachmentData.append('subPid', buttonSubPid);
        attachmentData.append('assignment_id', buttonFormAssignment);
        attachmentData.append('attached', 'true');

        fetch(fetchURL, {
            method: 'POST',
            body: attachmentData
        })
            .then(response => response.json())
            .then(attached_data => {
                console.log(attached_data);
                if (attached_data.length > 1) {
                    let attachment_count = 0
                    // console.log(badger);
                    for (let data of attached_data) {
                        attachment_count++;
                        badger.textContent = attachment_count;
                        var directory = data.actual_file_directory;
                        var fileAttach = data.file_name;
                        // badger.textContent = data.actual_value;
                        if (data.file_name > 12) {
                            fileAttach = data.file_name.substring(0, 12) + '...';
                        }
                        else {
                            fileAttach = data.file_name.substring(0, 12);
                        }
                        var div =
                            `<div class="attachment" id="attachment">
                                <div class="card" data-bs-toggle="tooltips" data-bs-title="${data.file_name}" data-filename="${data.file_name}">
                                    <a class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-file="${directory}" data-remarks="${data.attachment_remarks}"  data-bs-title="${data.file_name}">
                                        <div class="card-body">
                                        <img src="frontend/assets/images/description_FILL0_wght200_GRAD0_opsz48.png" alt="Description">
                                        
                                        </div>
                                    </a>
                                    
                                </div>
                                <p id="file_name">${fileAttach}</p>
                            </div>`

                        divContainer.innerHTML += div;
                    }
                }
                else {
                    const p = `<p class="lead">File attachment(s) are not available!</p>`;
                    divContainer.innerHTML = p;
                }
            })


        const conditionData = new FormData();
        const lot_Number = localStorage.getItem('lotNo');
        const parts_Number = localStorage.getItem('partsNumber');
        const revision_Number = localStorage.getItem('revisionNumber');
        const item_code = localStorage.getItem('itemCode');
        const assign_id = localStorage.getItem('assign_id');
        console.log(lot_Number, parts_Number, revision_Number, item_code, assign_id, buttonSubPid);
        conditionData.append('subPid', buttonSubPid);
        conditionData.append('itemPartsNumber', parts_Number);
        conditionData.append('itemCode', item_code);
        conditionData.append('revisionNumber', revision_Number);
        conditionData.append('lotNumber', lot_Number);
        conditionData.append('assignId', assign_id);
        conditionData.append('btn_process', 'true');
        fetch(fetchURL, {
            method: 'POST',
            body: conditionData
        })
            .then(response => response.json())
            .then(fetchedData => {
                console.log(fetchedData);
                const operatorDiv = document.getElementById('divOperatorTbody');
                operatorDiv.innerHTML = '';
                for (let data of fetchedData) {
                    if (data == '0' || data == null) {
                        operatorDiv.innerHTML = '';
                    }
                    else {
                        localStorage.setItem('batchOperatorId', data.batch_operator_id);
                        // operatorDiv.style.display = "block";
                        var tr =
                            `<tr class="table_middle" id="table_middle_${data.operator_number}" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}" data-id_number="${data.id_number}" data-waferFrom="${data.wafer_number_from}" data-waferTo="${data.wafer_number_to}">
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
                        // var table =
                        //     `<table class="table table-borderless table-sm" id="table_middle_${data.id_number}" style="font-size: 12px;">
                        //         <tbody class="batchOperatorTBody" id="batchOperatorTBody_${data.id_number}" data-batchOperatorTBody="batchOperatorTBody_${data.id_number}">
                        //             <tr>
                        //                 <td><button type="button" class="btn btn-outline-none" id="edit_${data.id_number}" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><span class="material-symbols-outlined aligned-bottom">edit</span></button></td>
                        //                 <td><strong>Operator ${data.operator_number}</strong></td>
                        //                 <td class="text-start table_middle" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">ID No: </td>
                        //                 <td class="text-start table_middle" id="idNo" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">${data.id_number}</p></td>
                        //                 <td class="text-start table_middle" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">Date & Time Start: </td>
                        //                 <td class="text-start table_middle" id="dateTimeStart" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">${data.time_start}</p></td>
                        //                 <td class="text-start table_middle" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">Date & Time End: </td>
                        //                 <td class="text-start table_middle" id="dateTimeEnd" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">${data.time_end}</p></td>
                        //                 <td class="text-start table_middle" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">Total Time Duration: </td>
                        //                 <td class="text-start table_middle" id="totalTimeDuration" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">${data.total_time}</p></td>
                        //             </tr>
                        //             <tr>
                        //                 <td><button type="button" class="btn btn-outline-none" id="check_${data.id_number}" data-batchNumber="${data.batch_number}"><span class="material-symbols-outlined aligned-bottom">select_check_box</span></button></td>
                        //                 <td></td>
                        //                 <td class="text-start table_middle" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">Name: </td>
                        //                 <td class="text-start table_middle" id="operatorName" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">${data.operator_name}</p></td>
                        //                 <td class="text-start table_middle" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">Batch ID:</td>
                        //                 <td class="text-start table_middle" id="batchId" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">${data.batch_number}</p></td>
                        //                 <td class="text-start table_middle" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">Total Batch Processed: </td>
                        //                 <td class="text-start table_middle" id="batchProcessed" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">${data.line_number}</p></td>
                        //                 <td class="text-start table_middle" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">Checked By:</td>
                        //                 <td class="text-start table_middle" id="checkedBy" data-idNumber="${data.id_number}" data-batchNumber="${data.batch_number}" data-operatorNumber="${data.operator_number}">${data.operator_name ?? ''}</p></td>
                        //             </tr>
                        //         </tbody>
                        //     </table>   
                        //     <hr>`;

                        operatorDiv.innerHTML += tr;
                    }
                    const editButton = document.querySelectorAll('.table_middle');
                    for (let editBtn of editButton) {
                        editBtn.addEventListener('click', function () {
                            let idniJairus = editBtn.getAttribute('data-id_number');
                            let operator_number = editBtn.getAttribute('data-operatorNumber');
                            localStorage.setItem('data_id_number', idniJairus);
                            let table = document.getElementById(`table_middle_${operator_number}`);

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
                    // console.log(table);
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
                        let tbody = document.getElementById(`table_middle_${batchOperatorNumber}`);
                        if (lastClickedTable) {
                            lastClickedTable.classList.remove('table-info');
                        }
                        tbody.classList.add('table-info');
                        lastClickedTable = tbody;
                    });
                }
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
            console.log(fetched);
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
                    console.log(resData);
                })
                .catch(error => {
                    console.error(error);
                })
            for (let data of fetched) {
                // localStorage.setItem('save_assignId', data.assignment_id);
                // localStorage.setItem('save_lotNumber', data.lot_number);
                // localStorage.setItem('save_partsNumber', data.parts_number);
                // localStorage.setItem('save_revisionNumber', data.revision_number);
                saveDatas(item_code, sectionId, sub_pid, idNumber, batchNumber, batchOperatorNumber, data.assignment_id, data.lot_number, data.parts_number, data.revision_number);
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
    if (subPid != null) {
        if (buttonBatchType != null) {
            // var w = 1280;
            // var h = 600;
            // var left = (screen.width/2)-(w/2);
            // var top = (screen.height/2)-(h/2);
            if (buttonBatchType == 'Standard') {
                // DEBUGGING
                window.open(`https://172.16.2.61/batch_process_ver2/standard.html?SubPid=${subPid}&AssignmentId=${assign_id}`);
                // DEPLOYMENT
                // window.open(`https://172.16.2.13/batch_process_ver2/standard.html?SubPid=${subPid}&AssignmentId=${assign_id}`);


                // window.location.href = `https://172.16.2.61/tpc/index.html?SubPid=${subPid}&AssignmentId=${assign_id}`;

                // window.open(`https://172.16.2.13/batch_process_ver2/standard.html?SubPid=${subPid}&AssignmentId=${assign_id}`, "TPC Batch Process[Standard]", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
            }
            else {
                // http://172.16.2.61/tpc/index.html?SubPid=95&AssignmentId=60
                // window.location.href = `http://172.16.2.61/tpc/cci.html`;

                // DEBUGGING
                // window.open(`https://172.16.2.61/tpc/index.html?SubPid=${subPid}&AssignmentId=${assign_id}`);
                // DEPLOYMENT
                // window.open(`https://172.16.2.13/tpc/index.html?SubPid=${subPid}&AssignmentId=${assign_id}`);

                // REFACTOR
                // DEBUGGING
                window.open(`https://172.16.2.61/batch_process_ver2/parallel.html?SubPid=${subPid}&AssignmentId=${assign_id}`);
                // DEPLOYMENT
                // window.open("https://172.16.2.13/batch_process_ver2/parallel.html?SubPid=${subPid}&AssignmentId=${assign_id}", "TPC Batch Process[Parallel]", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
                // window.open(`https://172.16.2.13/batch_process_ver2/parallel.html?SubPid=${subPid}&AssignmentId=${assign_id}`);
            }
        }
        // const lot_Number = localStorage.getItem('lotNo');
        // const parts_Number = localStorage.getItem('partsNumber');
        // const revision_Number = localStorage.getItem('revisionNumber');
        // const sampling = localStorage.getItem('sampling');
        // const status = localStorage.getItem('status');
        // const uncontrolled = localStorage.getItem('uncontrolled');
        // window.location.href = `http://172.16.2.101/tpc/index.html?SubPid=${subPid}&LotNumber=${lot_Number}&PartsNumber=${parts_Number}&RevisionNumber=${revision_Number}&AssignmentId=${assign_id}`;
        // window.location.href = `http://172.16.2.61/tpc/index.html?SubPid=${subPid}&AssignmentId=${assign_id}`;
        // window.open(`http://172.16.2.61/tpc/index.html?SubPid=${subPid}&AssignmentId=${assign_id}`);
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
    // let assignment_id = localStorage.getItem('save_assignId');
    // let lot_number = localStorage.getItem('save_lotNumber');
    // let parts_number = localStorage.getItem('save_partsNumber');
    // let revision_number = localStorage.getItem('save_revisionNumber');
    let sequence_no = 0;
    let percent = 0;
    let ng_tally = 0;
    let sampling = localStorage.getItem(`sampling_in`);
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
            // console.log('INPUT');
            actual_value = td_element[6].querySelector('input').value;
            field_type = td_element[6].querySelector(`input`).getAttribute(`data-bs-field_type`);
            with_judgement = td_element[6].querySelector(`input`).getAttribute(`data-bs-with_judgement`)
            option_value = '';
        }
        else if (td_element[6].querySelector('select')) {
            // console.log('select');
            actual_value = td_element[6].querySelector('select').value;
            field_type = td_element[6].querySelector(`select`).getAttribute(`data-bs-field_type`);
            option_value = td_element[6].querySelector(`select`).getAttribute(`data-bs-option_value`);
            with_judgement = td_element[6].querySelector(`select`).getAttribute(`data-bs-with_judgement`)
            // console.log(option_value);
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
        formSaveConditionsData.append(`condition_item_id_2`, condition_item_id);
        formSaveConditionsData.append('saveItems', 'true');

        for (const [key, value] of formSaveConditionsData.entries()) {
            console.log(`${key}: ${value}`);
        }
        fetch(fetchURL, {
            method: 'POST',
            body: formSaveConditionsData
        })
            .then(response => response.json())
            .then(savedData => {
                console.log(savedData);
                const span_saving_data = document.getElementById(`span_saving_data`);
                let thisPer;
                if (savedData.success) {
                    // console.log(main_tbl_tr.length);
                    $(`#spinnerModal`).modal('show');
                    if (percent < main_tbl_tr.length) {
                        percent++;
                        thisPer = (percent / main_tbl_tr.length) * 100;
                        span_saving_data.textContent = `Saving Data (${thisPer.toFixed(2)} %)`;
                        // console.log(percent);
                        if (percent == main_tbl_tr.length) {
                            let timerInterval
                            Swal.fire({
                                title: 'Done!',
                                html: `${percent} / ${main_tbl_tr.length} data has been saved succesfully.`,
                                timer: 1000,
                                timerProgressBar: true,
                                didOpen: () => {
                                    Swal.showLoading()
                                    // const b = Swal.getHtmlContainer().querySelector('b')
                                    // timerInterval = setInterval(() => {
                                    // b.textContent = Swal.getTimerLeft()
                                    // }, 100)
                                },
                                willClose: () => {
                                    clearInterval(timerInterval)
                                }
                            }).then((result) => {
                                /* Read more about handling dismissals below */
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    // console.log('I was closed by the timer')
                                    console.log('DONE');
                                    main_table.innerHTML = '';
                                    $(`#spinnerModal`).modal('hide');
                                    percent = 0;
                                    thisPer = 0;
                                    enabledSaveBtn();
                                    console.log(localStorage.getItem('subPname'));
                                    if (localStorage.getItem('subPname') === "NG Tally") {
                                        ng_tally += parseInt(actual_value);

                                        if (ng_tally < sampling) {
                                            Swal.fire({
                                                title: "Message Prompt!",
                                                text: `NG Tally (${ng_tally}) is less than Sampling in (${sampling})!`,
                                                icon: "info"
                                            });
                                        }
                                        else if (ng_tally > sampling) {
                                            Swal.fire({
                                                title: "Message Prompt!",
                                                text: `NG Tally (${ng_tally}) is greater than Sampling in (${sampling})!`,
                                                icon: "info"
                                            });
                                        }
                                        else if (ng_tally == sampling) {
                                            Swal.fire({
                                                title: "Message Prompt!",
                                                text: `NG Tally (${ng_tally}) is equal to Sampling in (${sampling})!`,
                                                icon: "info"
                                            });
                                        }
                                    }
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
                console.log(error);
            }
            );



        //     if(data.success == true)
        //         {
        //         let timerInterval
        //         Swal.fire({
        //             html: data.message,
        //             timer: 1000,
        //             icon: 'success',
        //             showConfirmButton: false,
        //             timerProgressBar: true,
        //             allowOutsideClick: false,
        //             didOpen: () => {
        //             Swal.showLoading()
        //             },
        //             willClose: () => {
        //             clearInterval(timerInterval)
        //             }
        //         }).then((result) => {
        //             if (result.dismiss === Swal.DismissReason.timer) {
        //               location.reload(true);
        //             }
        //         })
        //         }
        //         else
        //         {
        //         let timerInterval
        //         Swal.fire({
        //             html: data.message,
        //             timer: 1000,
        //             icon: 'error',
        //             showConfirmButton: false,
        //             timerProgressBar: true,
        //             allowOutsideClick: false,
        //             didOpen: () => {
        //             // Swal.showLoading()
        //             },
        //             willClose: () => {
        //             clearInterval(timerInterval)
        //             }
        //         }).then((result) => {
        //             if (result.dismiss === Swal.DismissReason.timer) {
        //             //   location.reload(true);
        //             }
        //         })
        //         }

    }
    // var rows = table.getElementsByTagName('tr');
    // var formSaveData = [];
    // let field_type;
    // let sequence_no = 0;
    // let option_value;
    // let with_judgement;
    // for (let i = 0; i < rows.length; i++) {
    //     sequence_no ++;
    //     var row = rows[i];
    //     var cells = row.getElementsByTagName('td');
    //     var actualValue;
    //     if (cells[6].querySelector('input')) {
    //         actualValue = cells[6].querySelector('input').value;
    //         field_type = cells[6].querySelector(`input`).getAttribute(`data-bs-field_type`);
    //         with_judgement = cells[6].querySelector(`input`).getAttribute(`data-bs-with_judgement`)
    //         option_value = '';
    //     }
    //     else if (cells[6].querySelector('select')) {
    //         actualValue = cells[6].querySelector('select').value;
    //         field_type = cells[6].querySelector(`select`).getAttribute(`data-bs-field_type`);
    //         option_value = cells[6].querySelector(`select`).getAttribute(`data-bs-option_value`);
    //         with_judgement = cells[6].querySelector(`select`).getAttribute(`data-bs-with_judgement`)
    //         console.log(option_value);
    //     }
    //     else {
    //         actualValue = '';
    //         option_value = '';
    //         with_judgement = '';
    //     }
    //     var rowData = {
    //         field_type: field_type,
    //         item_code: item_code,
    //         section_id: sectionId,
    //         sub_pid: sub_pid,
    //         id_number: idNumber,
    //         batch_number: batchNumber,
    //         batch_operator_number: batchOperatorNumber,
    //         assignment_id: assignment_id,
    //         lot_number: lot_number,
    //         parts_number: parts_number,
    //         revision_number: revision_number,
    //         condition_item_id: cells[0].textContent,
    //         id_no: cells[1].textContent,
    //         // sequence_no: cells[2].textContent,
    //         sequence_no : sequence_no,
    //         wafer_start: cells[3].querySelector('input').value ?? null,
    //         wafer_end: cells[4].querySelector('input').value ?? null,
    //         condition: cells[5].textContent,
    //         actual_value: actualValue ?? null,
    //         target_value: cells[7].textContent,
    //         min_value: cells[8].textContent,
    //         max_value: cells[9].textContent,
    //         judgement: cells[10].textContent,
    //         option_value : option_value ?? '',
    //         with_judgement : with_judgement ?? ''
    //     };
    //     formSaveData.push(rowData);
    // }

    // const formSaveConditionsData = new FormData();
    // const formDataArray = [
    // 'field_type',
    // 'item_code',
    // 'ectionId',
    // 'ub_pid',
    // 'id_number',
    // 'batch_number',
    // 'batch_operator_number',
    // 'assignment_id',
    // 'lot_number',
    // 'parts_number',
    // 'evision_number',
    // 'condition_item_id',
    // 'id_no',
    // 'equence_no',
    // 'wafer_start',
    // 'wafer_end',
    // 'condition',
    // 'actual_value',
    // 'target_value',
    // 'in_value',
    // 'ax_value',
    // 'judgement',
    // 'option_value',
    // 'with_judgement',
    // 'condition_item_id_2',
    // 'aveItems'
    // ];

    // for (let j = 0; j < formSaveData.length; j++) {
    // for (let i = 0; i < formDataArray.length; i++) {
    //     const key = `${formDataArray[i]}_${j}`;
    //     const value = formSaveData[j][formDataArray[i]];
    //     formSaveConditionsData.append(key, value);
    // }
    // }
    // // console.log(formSaveConditionsData);
    // for (const [key, value] of formSaveConditionsData.entries()) 
    // {
    //     console.log(`${key}: ${value}`);
    // }
    // const formSaveConditionsData = new FormData();
    // for (let j = 0; j < formSaveData.length; j++) {
    //     formSaveConditionsData.append(`field_type_${j}`, formSaveData[j].field_type);
    //     formSaveConditionsData.append(`item_code_${j}`, formSaveData[j].item_code);
    //     formSaveConditionsData.append(`section_id_${j}`, formSaveData[j].sectionId);
    //     formSaveConditionsData.append(`sub_pid_${j}`, formSaveData[j].sub_pid);
    //     formSaveConditionsData.append(`id_number_${j}`, formSaveData[j].id_number);
    //     formSaveConditionsData.append(`batch_number_${j}`, formSaveData[j].batch_number);
    //     formSaveConditionsData.append(`batch_operator_number_${j}`, formSaveData[j].batch_operator_number);
    //     formSaveConditionsData.append(`assignment_id_${j}`, formSaveData[j].assignment_id);
    //     formSaveConditionsData.append(`lot_number_${j}`, formSaveData[j].lot_number);
    //     formSaveConditionsData.append(`parts_number_${j}`, formSaveData[j].parts_number);
    //     formSaveConditionsData.append(`revision_number_${j}`, formSaveData[j].revision_number);
    //     formSaveConditionsData.append(`condition_item_id_${j}`, formSaveData[j].condition_item_id);
    //     formSaveConditionsData.append(`id_no_${j}`, formSaveData[j].id_no);
    //     formSaveConditionsData.append(`sequence_no_${j}`, formSaveData[j].sequence_no);
    //     formSaveConditionsData.append(`wafer_start_${j}`, formSaveData[j].wafer_start);
    //     formSaveConditionsData.append(`wafer_end_${j}`, formSaveData[j].wafer_end);
    //     formSaveConditionsData.append(`condition_${j}`, formSaveData[j].condition);
    //     formSaveConditionsData.append(`actual_value_${j}`, formSaveData[j].actual_value);
    //     formSaveConditionsData.append(`target_value_${j}`, formSaveData[j].target_value);
    //     formSaveConditionsData.append(`min_value_${j}`, formSaveData[j].min_value);
    //     formSaveConditionsData.append(`max_value${j}`, formSaveData[j].max_value);
    //     formSaveConditionsData.append(`judgement_${j}`, formSaveData[j].judgement);
    //     formSaveConditionsData.append(`option_value_${j}`, formSaveData[j].option_value);
    //     formSaveConditionsData.append(`with_judgement_${j}`, formSaveData[j].with_judgement);

    //     formSaveConditionsData.append(`condition_item_id_2`, formSaveData[j].condition_item_id);
    //     formSaveConditionsData.append('saveItems', 'true');
    // }
    // // console.log(JSON.stringify(formSaveConditionsData));
    // // for (const [key, value] of formSaveConditionsData.entries()) {
    // //     console.log(`${key}: ${value}`);
    // // }
    // fetch(fetchURL, {
    //     method: 'POST',
    //     body: formSaveConditionsData
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         if(data.success == true)
    //             {
    //               let timerInterval
    //               Swal.fire({
    //                 html: data.message,
    //                 timer: 1000,
    //                 icon: 'success',
    //                 showConfirmButton: false,
    //                 timerProgressBar: true,
    //                 allowOutsideClick: false,
    //                 didOpen: () => {
    //                   Swal.showLoading()
    //                 },
    //                 willClose: () => {
    //                   clearInterval(timerInterval)
    //                 }
    //               }).then((result) => {
    //                 if (result.dismiss === Swal.DismissReason.timer) {
    //                 //   location.reload(true);
    //                 }
    //               })
    //             }
    //             else
    //             {
    //               let timerInterval
    //               Swal.fire({
    //                 html: data.message,
    //                 timer: 1000,
    //                 icon: 'error',
    //                 showConfirmButton: false,
    //                 timerProgressBar: true,
    //                 allowOutsideClick: false,
    //                 didOpen: () => {
    //                   // Swal.showLoading()
    //                 },
    //                 willClose: () => {
    //                   clearInterval(timerInterval)
    //                 }
    //               }).then((result) => {
    //                 if (result.dismiss === Swal.DismissReason.timer) {
    //                 //   location.reload(true);
    //                 }
    //               })
    //             }
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     }
    //     );
    console.log(ng_tally);
}



// Scan ID Event
// function scanId() {
//     let is_event = false; // for check just one event declaration
//     let input = document.getElementById("scanId");
//     input.addEventListener("focus", function () {
//         if (!is_event) {
//             is_event = true;
//             input.addEventListener("keypress", function (e) {
//                 setTimeout(function () {
//                     if (e.keyCode == 13) {
//                         // scanner(input.value); // use value as you need
//                         // input.select();
//                         operatorValidate(input.value);
//                     }
//                 }, 500)
//             })
//         }
//     });
//     // document.addEventListener("keypress", function (e) {
//     //     if (e.target.tagName !== "INPUT") {
//     //         input.focus();
//     //         // operatorValidate();
//     //     }
//     // });
// }

// function scanner(value) {
//     if (value == '') return;
//     console.log(value)
// }

function scanId() {
    // document.getElementById('onIdScan').addEventListener("click", function (e) {
    //     setTimeout(function () {
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
            /* Read more about handling dismissals below */
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
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                $("#main_table").load(" #main_table > *");
                document.getElementById('closeModal').click();
            }
        })
    }
    // }, 1000)
    // });
}


// function clearField()
// {
//     document.getElementById('scanId').value = '';
// }

function operatorValidate() {
    let valid = true;
    let current_operator_id = document.getElementById('scanId').value;
    let id_number = localStorage.getItem('data_id_number');
    let newId = `00${id_number}`;
    console.log(current_operator_id);
    if (current_operator_id == newId || current_operator_id == id_number) {
        valid = true;
        // document.getElementById('closeModal').click(); 
    }
    else {
        valid = false;
        // document.getElementById('closeModal').click(); 
        // document.getElementById('scanId').value = '';
        // localStorage.setItem('data_id_number', null);
    }
    // console.log(`id_number: ${id_number}
    //     current: ${current_operator_id}
    // `);

    // $('#staticBackdrop').modal('dismmiss')
    // $('body').removeClass('modal-open');
    // $('.modal-backdrop').remove();

    // if(valid)
    // {
    //     let timerInterval
    //     Swal.fire({
    //     title: 'Success!',
    //     text: 'Operator ID is Valid!',
    //     icon: 'success',
    //     timer: 1000,
    //     timerProgressBar: true,
    //     didOpen: () => {
    //         Swal.showLoading()
    //         timerInterval = setInterval(() => {
    //         }, 100)
    //     },
    //     willClose: () => {
    //         clearInterval(timerInterval)
    //     }
    //     }).then((result) => {
    //     /* Read more about handling dismissals below */
    //     if (result.dismiss === Swal.DismissReason.timer) {
    //         console.log('I was closed by the timer')
    //     }
    //     })
    // }
    // else
    // {
    //     let timerInterval
    //     Swal.fire({
    //     title: 'Error!',
    //     text: 'Operator ID is Invalid!',
    //     icon: 'error',
    //     timer: 1000,
    //     timerProgressBar: true,
    //     didOpen: () => {
    //         Swal.showLoading()
    //         timerInterval = setInterval(() => {
    //         }, 100)
    //     },
    //     willClose: () => {
    //         clearInterval(timerInterval)
    //     }
    //     }).then((result) => {
    //     /* Read more about handling dismissals below */
    //     if (result.dismiss === Swal.DismissReason.timer) {
    //         console.log('I was closed by the timer')
    //     }
    //     })
    // }
    // document.getElementById('scanId').value = '';
    // localStorage.setItem('data_id_number', null);
    return valid;
}
// function validateTextInput(sequenceNumber)
// {
//     let textValid = true;
//     let waferInputs = document.querySelectorAll('table input');
//     for(let inputs of waferInputs)
//     {
//         const row = inputs.closest('tr');
//         const waferNumberFromInput = row.querySelector(`input#wafer_number_from_${sequenceNumber}`);
//         const waferNumberToInput = row.querySelector(`input#wafer_number_to_${sequenceNumber}`);
//         let waferFromValue = onlyLettersAndNumbers(waferNumberFromInput.value);
//         let waferToValue = onlyLettersAndNumbers(waferNumberToInput.value);
//         // console.log(`waferNumberFromInput: ${waferNumberFromInput.value}
//         // waferNumberToInput${waferNumberToInput.value}
//         // `);
//         let formattedValue1 = waferFromValue.toLocaleString();
//         let formattedValue2 = waferToValue.toLocaleString();
//         waferNumberFromInput.value = formattedValue1;
//         waferNumberToInput.value = formattedValue2;
//         console.log(onlyLettersAndNumbers(formattedValue1));
//     }


// }

// function onlyLettersAndNumbers(str) {
//     return /^[-+]?[0-9]+$/.test(str);
//   }
// Validate Inputs Function
function validate() {
    let isValid = true;
    let tableInputs = document.querySelectorAll('table input[type="number"]');
    //   console.log(tableInputs);
    for (let tableInput of tableInputs) {
        const actualValue = parseFloat(tableInput.value);
        const row = tableInput.closest('tr');
        const sequenceNumber = row.querySelector('td[scope="row"]').textContent;
        const waferNumberFromInput = row.querySelector(`input#wafer_number_from_${sequenceNumber}`);
        const waferNumberToInput = row.querySelector(`input#wafer_number_to_${sequenceNumber}`);
        const waferFromValue = parseFloat(waferNumberFromInput.value);
        const waferToValue = parseFloat(waferNumberToInput.value);
        // console.log(`wafer form ${waferFromValue}, wafer to ${waferToValue} , actual value${actualValue}`);
        // if(isNaN(waferFromValue) && isNaN(waferToValue) && isNaN(actualValue))
        // {
        //   waferNumberFromInput.classList.add('is-invalid');
        //   waferNumberToInput.classList.add('is-invalid');
        //   tableInput.classList.add('is-invalid');
        //   isValid = false;
        // }
        // else
        // {
        //   waferNumberFromInput.classList.remove('is-invalid');
        //   waferNumberToInput.classList.remove('is-invalid');
        //   tableInput.classList.remove('is-invalid');
        //   // waferNumberFromInput.classList.add('is-valid');
        //   // waferNumberToInput.classList.add('is-valid');
        //   // tableInput.classList.add('is-valid');
        // }
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
        // if(isNaN(actualValue))
        // {
        //   tableInput.classList.add('is-invalid');
        //   isValid = false;
        // }
        // else
        // {
        //   tableInput.classList.remove('is-invalid');
        // }
    }
    return isValid;
}
// Done Process Function
function doneProcess() {
    let buttonSectionId = localStorage.getItem('buttonSectionId');
    let buttonAssignmentId = localStorage.getItem('buttonAssignmentId');
    let buttonMainProdId = localStorage.getItem('buttonMainProdId');
    let buttonSequenceNumber = localStorage.getItem('buttonSequenceNumber');

    const doneProcessData = new FormData();

    doneProcessData.append('section_id', buttonSectionId);
    doneProcessData.append('assignment_id', buttonAssignmentId);
    doneProcessData.append('main_prod_id', buttonMainProdId);
    doneProcessData.append('sequence_number', buttonSequenceNumber);
    doneProcessData.append('doneProcess', 'true');

    fetch(fetchURL, {
        method: 'POST',
        body: doneProcessData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let item_code = localStorage.getItem('itemCode');
            let parts_number = localStorage.getItem('partsNumber');
            let lot_number = localStorage.getItem('lotNo');
            let date_issued = localStorage.getItem('dateIssued');
            let revision_number = localStorage.getItem('revisionNumber');
            let sectionId = localStorage.getItem('sectionId');
            let assign_id = localStorage.getItem('assign_id');
            // console.log(`item_code${item_code},parts_number ${parts_number}, lot_number${lot_number}, date_issued${date_issued},revision_number ${revision_number}`);

            const refreshData = new FormData();
            refreshData.append('item_code', item_code);
            refreshData.append('parts_number', parts_number);
            refreshData.append('lot_number', lot_number);
            refreshData.append('date_issued', date_issued);
            refreshData.append('revision_number', revision_number);
            refreshData.append('assignment_id', assign_id);
            refreshData.append('QrSubmitBtn', 'true');
            fetch(fetchURL, {
                method: 'POST',
                body: refreshData
            })
                .then(response => response.json())
                .then(thisData => {
                    localStorage.setItem('myData', JSON.stringify(thisData));
                    let timerInterval
                    Swal.fire({
                        html: data.message,
                        timer: 1000,
                        icon: 'success',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        didOpen: () => {
                            // Swal.showLoading()
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
                        }
                    })
                })
        })
        .catch(error => {
            console.log(error);
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
            // button.insertAdjacentHTML('beforeend','<img src="frontend/assets/images/lock_open_FILL0_wght200_GRAD0_opsz24.png" alt="Enable Process">')
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
            // const sequenceNumber = row.querySelector('td[scope="row"]').textContent;
            const minValueElement = row.querySelector(`td#min_value_${sequence_number}`);
            const minValue = minValueElement ? parseFloat(minValueElement.textContent) : null;
            const maxValueElement = row.querySelector(`td#max_value_${sequence_number}`);
            const maxValue = maxValueElement ? parseFloat(maxValueElement.textContent) : null;
            const judgement = row.querySelector(`td#condition_judgement_${sequence_number}`);
            if (judgement) {
                // if (minValue != null && maxValue != null && actualValue != null || (minValue != 0 && maxValue != 0 && actualValue != 0))
                // {
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
                // }
            }
        }
    }
}
// Calculate Blade Text
function calculateBlade(with_judgement, sequence_number) {
    if (with_judgement == 1 || with_judgement == '1') {
        let waferInput = document.getElementById(`actual_value_${sequence_number}`);
        let targetVal = document.getElementById(`target_value_${sequence_number}`).textContent;
        let newTargetVal = targetVal.toLowerCase();
        let inputVal = waferInput.value;
        const judgment = document.getElementById(`condition_judgement_${sequence_number}`);
        if (inputVal == targetVal || inputVal == newTargetVal) {
            judgment.textContent = 'Pass'
            judgement.classList.remove('text-danger');
            judgement.classList.add('text-success');
            // console.log('JAI GAY');
        }
        else {
            judgment.textContent = 'Fail'
            judgement.classList.remove('text-success');
            judgement.classList.add('text-danger');
            // console.log('JAI GAY GIHAPON');
        }
    }
}
// Checkbox onclick function
function onchange_checkbox(sequence_number, with_judgement) {
    console.log(sequence_number);
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
    console.log(checkbox.value);
}

function onchange_select(sequence_number, with_judgement) {
    console.log(with_judgement);
    const actual_value = document.getElementById(`target_value_${sequence_number}`);
    const select = document.getElementById(`actual_value_${sequence_number}`);
    const judgement = document.getElementById(`condition_judgement_${sequence_number}`);
    let data = actual_value.textContent;
    let result = data.includes("|");
    if (with_judgement > 0) {
        if (result) {
            console.log(select.value.trim());
            console.log(actual_value.textContent);
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
                // console.log(actual_value.textContent);
                // console.log(select.value);
            }
            else {
                // console.log(actual_value.textContent);
                // console.log(select.value);
                judgement.textContent = 'Fail';
                judgement.classList.remove('text-success');
                judgement.classList.add('text-danger');
            }
        }
    }
    // console.log(data);
}

// Table Click Function
function tableClick(id_number, sub_pid, item_parts_number, item_code, revision_number, lot_number, assign_id, operator_number, wafer_number_from, wafer_number_to, batch_number) {

    // console.log(`Operator ID: ${operator_id},
    // SubPid: ${subPid},
    // Item Parts Number: ${item_parts_number},
    // Item Code: ${item_code},
    // Revision Number: ${revision_number},
    // Lot Number: ${lot_number}`);
    operatorValidate();
    let operatorValidity = operatorValidate();
    const tableData = new FormData();
    tableData.append('idNumber', id_number);
    tableData.append('subPid', sub_pid);
    tableData.append('itemPartsNumber', item_parts_number);
    tableData.append('itemCode', item_code);
    tableData.append('revisionNumber', revision_number);
    tableData.append('lotNumber', lot_number);
    tableData.append('assignId', assign_id);
    tableData.append('operator_number', operator_number);
    tableData.append('batch_number', batch_number)
    tableData.append('tableClicked', 'true');

    fetch(fetchURL, {
        method: 'POST',
        body: tableData
    })
        .then(response => response.json())
        .then(returnedData => {
            console.log(returnedData);

            const tableBody = document.getElementById('table');
            if (returnedData[0] == '0' || returnedData[0] == null) {
                console.log('WLAY SUD');
                tableBody.innerHTML = '';
            }
            else {
                tableBody.innerHTML = '';
                let newSequence = 0;
                let tableStatus = localStorage.getItem('SubProcessStatus');
                for (let data of returnedData) {
                    // console.log(data.field_type_selection);
                    newSequence++;
                    if (tableStatus == 'Open' && operatorValidity) {
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
                                    <td><button type="button" class="btn btn-outline-none" onclick="addRow(${data.with_judgement}, ${data.sequence_number})"><span class="material-symbols-outlined">shadow_add</span></button></td>
                                </tr>
                                `;
                                tableBody.innerHTML += tableRow;
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
                                    </tr>
                                `;
                                tableBody.innerHTML += tableRow;
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
                                    </tr>
                                `;
                                tableBody.innerHTML += tableRow;
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
                                    </tr>
                                `;
                                tableBody.innerHTML += tableRow;
                            }
                            else if (data.field_type == 'Check Box' || data.field_type == 'CheckBox') {
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
                                    </tr>
                                `;
                                tableBody.innerHTML += tableRow;
                                const checkbox = document.getElementById(`actual_value_${data.sequence_number}`);
                                // console.log(checkbox.value);
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
                                    </tr>
                                `;
                                tableBody.innerHTML += tableRow;
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
                                    </tr>
                                `;
                                tableBody.innerHTML += tableRow;
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
                                </tr>
                            `;


                            // const field_id = data.field_id;
                            // const post = new FormData();
                            // post.append('field_id', field_id);
                            // fetch('https://172.16.2.13/tpc_sample/backend/endpoint/fieldSub.php', {
                            //     method: 'POST',
                            //     body: post
                            // })
                            //     .then(response => response.json())
                            //     .then(data3 => {
                            //         console.log(data3);
                            // console.log(select);
                            // const select = document.getElementById(`field_sub_${data.sequence_number ? data.sequence_number : data.sequence_number}`);
                            // console.log(select);
                            // // for(let i = 0; i < options.length; i ++)
                            // // {

                            // // const option = options.map(item => `
                            // // <option value="${item.field_selection_description}">
                            // //     ${item.field_selection_description}
                            // // </option>
                            // // `).join("");
                            // // select.innerHTML = option;
                            // // }
                            //     })

                            // const tableBody = document.querySelector('#main_table tbody');

                            tableBody.innerHTML += tableRow;
                            const select = document.getElementById(`actual_value_${data.sequence_number ? data.sequence_number : data.sequence_number}`);
                            // console.log(data.option_value);
                            if (data.option_value) {
                                const options = data.option_value.split("|");
                                const default_option = `<option selected>Open this select menu</option>`;
                                select.innerHTML += default_option;
                                for (let i = 0; i < options.length; i++) {
                                    // console.log(options);
                                    const option = `
                                        <option id="opt_${i}" value="${options[i].trim()}">
                                            ${options[i].trim()}
                                        </option>`;
                                    select.innerHTML += option;
                                    if (data.actual_value == options[i].trim()) {
                                        console.log(select.querySelector(`#opt_${i}`));
                                        select.querySelector(`#opt_${i}`).setAttribute('selected', 'selected');
                                        // select.querySelector(`option`).setAttribute('selected', 'selected');
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
                            // console.log(wafer_from);
                            // console.log(wafer_to);
                            wafer_from.readOnly = true;
                            wafer_from.classList.add('bg-light');
                            wafer_to.readOnly = true;
                            wafer_to.classList.add('bg-light');
                        }
                    }
                    else {
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
                            <td></td>
                            <td>${data.min_value ? data.min_value : data.minimum_value}</td>
                            <td>${data.max_value ? data.max_value : data.maximum_value}</td>
                            <td>${data.condition_judgement ? data.condition_judgement : ''}</td>
                            </tr>
                            `;
                            tableBody.innerHTML += tableRow;
                            const div = document.getElementById('remarksDiv');
                            const p = `<p class="text-start" style="text-align: left;">${data.tpc_sub_remarks ? data.tpc_sub_remarks : ''}</p>`;
                            div.innerHTML = p;
                        }
                        else {
                            // tableBody.innerHTML = '';
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
                                </tr>
                            `;
                            tableBody.innerHTML += tableRow;
                            const div = document.getElementById('remarksDiv');
                            const p = `<p class="text-start" style="text-align: left;">${data.tpc_sub_remarks ? data.tpc_sub_remarks : ''}</p>`;
                            div.innerHTML = p;
                        }
                    }
                }

            }
        })
}


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
    console.log(add_row_with_judgement.value);
    // console.log(td);
    insert_btn.addEventListener('click', function () {
        event.preventDefault();
        const tableBody = document.getElementById('table');
        let total_tr = tableBody.querySelectorAll(`tr`).length;
        // console.log(total_tr);
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
            console.log(tr);
            const total_wafer_length = parseInt(row_end.value) - parseInt(row_start.value) + 1;
            let row_count = row_end.value;
            for (let i = 0; i < total_wafer_length; i++) {
                total_tr++;
                let tag = td[6].querySelector(`#actual_value_${add_row_sequence.value}`).tagName;
                console.log(tag);
                let field_type = td[6].querySelector(`#actual_value_${add_row_sequence.value}`).getAttribute(`data-bs-field_type`);
                // console.log(field_type);
                if (tag == 'SELECT') {
                    let option_value = td[6].querySelector(`#actual_value_${add_row_sequence.value}`).getAttribute(`data-bs-option_value`);
                    // console.log(option_value);
                    var tableRow = `
                    <tr class="table-primary" id="tr_${total_tr}">
                        <td style="display: none;">${td[0].textContent}</td>
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
                    </tr>
                        `;
                    tr.insertAdjacentHTML('afterend', tableRow);
                    // console.log(select);
                    const select = document.getElementById(`actual_value_${total_tr}`);
                    // const default_option = `<option selected>Open this select menu</option>`;
                    // select.innerHTML += default_option;
                    let options = td[6].querySelectorAll(`option`);
                    for (let j = 0; j < options.length; j++) {
                        // console.log(options[j].innerText);
                        const opt = `
                            <option value="${options[j].innerText.trim()}">
                                ${options[j].innerText.trim()}
                            </option>`;
                        select.innerHTML += opt;
                    }
                }
                else {
                    if (td[6].querySelector(`input`).type == 'checkbox') {
                        var tableRow = `
                        <tr class="table-primary" id="tr_${total_tr}">
                            <td style="display: none;">${td[0].textContent}</td>
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
                                <input type="${td[6].querySelector(`input`).type}" onchange="onchange_checkbox(${total_tr}, ${add_row_with_judgement.value})" class="${td[6].querySelector('input').classList}" value="${td[6].querySelector(`input`).value}" id="actual_value_${total_tr}" data-bs-field_type="${field_type}" data-bs-with_judgement="${add_row_with_judgement.value}" required>
                            </td>
                            <td id="target_value_${total_tr}">${td[7].textContent}</td>
                            <td id="min_value_${total_tr}">${td[8].textContent}</td>
                            <td id="max_value_${total_tr}">${td[9].textContent}</td>
                            <td id="condition_judgement_${total_tr}"></td>
                            <td><button type="button" class="btn btn-outline-none" onclick="removeRow(${total_tr})"><span class="material-symbols-outlined">shadow_minus</span></button></td>
                        </tr>`;
                    }
                    else {
                        var tableRow = `
                        <tr class="table-primary" id="tr_${total_tr}">
                            <td style="display: none;">${td[0].textContent}</td>
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
                            <td id="condition_judgement_${total_tr}"></td>
                            <td><button type="button" class="btn btn-outline-none" onclick="removeRow(${total_tr})"><span class="material-symbols-outlined">shadow_minus</span></button></td>
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



    // const newRow = document.createElement('tr');
    // for (let i = 0; i < tr.cells.length; i++) {
    // const cell = tr.cells[i].cloneNode(true);
    // newRow.appendChild(cell);
    // }
    // tr.insertAdjacentElement('afterend', newRow);
    // for(let i = 0; i < 1; i ++)
    // {   
    //     var tableRow = `
    //     <tr>
    //     <td style="display: none;">${td[0].textContent}</td>
    //     <td>${td[1].textContent}</td>
    //     <td scope="row">${sequence_number}</td>
    //     <td>
    //         <input type="number" id="wafer_number_from_${sequence_number}" class="form-control" value="${td[3].textContent}">
    //     </td>
    //     <td>
    //         <input type="number" id="wafer_number_to_${sequence_number}" class="form-control" value="${td[4].textContent}">
    //     </td>
    //     <td>${td[5].textContent}</td>
    //     <td>
    //         <input type="date" oninput="calculateBlade(${with_judgement}, ${sequence_number})" class="form-control" value="${td[6].textContent}" id="actual_value_${sequence_number}" required>
    //     </td>
    //     <td id="target_value_${sequence_number}">${td[7].textContent}</td>
    //     <td id="min_value_${sequence_number}">${td[8].textContent}</td>
    //     <td id="max_value_${sequence_number}">${td[9].textContent}</td>
    //     <td id="condition_judgement_${sequence_number}">${td[10].textContent}</td>
    //     </tr>
    //     `;
    //     console.log(tableRow)
    //     tr.insertAdjacentHTML('afterend', tableRow);
    // }

    // tableBody.innerHTML += tr;
    // tr.insertAdjacentElement('afterend', tr);
}

function removeRow(sequence_number) {
    const tr = document.getElementById(`tr_${sequence_number}`);
    // console.log(tr);
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
    // let ID = document.getElementById('IdScan').value;
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
            console.log(datas);
            let valid = false;
            const openBtn = document.getElementById('subProcessOpen');
            for (let data of datas) {
                console.log(data.role_open_process);
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
const openBtn = document.getElementById('subProcessOpen');
openBtn.addEventListener('click', function () {
    event.preventDefault();
    const subProcessID = document.getElementById('subProcessSelect').value;
    const subData = new FormData();
    subData.append('main_prd_id', subProcessID);
    subData.append('openSubProcess', 'true');
    fetch(fetchURLQuery,
        {
            method: 'POST',
            body: subData
        })
        .then(response => response.json())
        .then(datas => {
            console.log(datas);
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

                        // console.log(`item_code${item_code},parts_number ${parts_number}, lot_number${lot_number}, date_issued${date_issued},revision_number ${revision_number}`);

                        const refreshData = new FormData();
                        refreshData.append('item_code', item_code);
                        refreshData.append('parts_number', parts_number);
                        refreshData.append('lot_number', lot_number);
                        refreshData.append('date_issued', date_issued);
                        refreshData.append('revision_number', revision_number);
                        refreshData.append('assignment_id', assign_id);
                        refreshData.append('QrSubmitBtn', 'true');
                        fetch(fetchURL, {
                            method: 'POST',
                            body: refreshData
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                localStorage.setItem('myData', JSON.stringify(data));
                                localStorage.setItem('sectionId', JSON.stringify(sectionId));
                                // const thisData2 = JSON.parse(localStorage.getItem('myData'));
                                // console.log(thisData2);
                                if (localStorage.getItem('myData') != null || localStorage.getItem('myData') != 0) {
                                    // saveBtn.click();
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
            console.log(datas);
            for (let data of datas) {
                const option = `<option value="${data.main_prd_id}">${data.SubPname ? data.SubPname : ''}</option>`
                select.innerHTML += option;
            }
            // if(datas[0] == null || datas[0] == 0)
            // {

            //     const iframe = `<iframe width="1280" height="720" src="https://www.youtube.com/embed/u-dEnJpCGAQ" title="Wildlife - The Fascinating World of Wild Animals | Full Series | Free Documentary Nature" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
            //     document.getElementById(`main_content`).innerHTML = iframe;
            // }
        })
        .catch(error => {
            console.error(error);
            // if(error)
            // {
            //     const iframe = `<iframe width="1280" height="720" src="https://www.youtube.com/embed/u-dEnJpCGAQ" title="Wildlife - The Fascinating World of Wild Animals | Full Series | Free Documentary Nature" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
            //     document.getElementById(`main_content`).innerHTML += iframe;
            // }
        });
}
function getYieldPercentage(SubPid, assignment_id) {
    const getYieldData = new FormData();
    getYieldData.append('SubPid', SubPid);
    getYieldData.append('assignment_id', assignment_id);
    getYieldData.append('getYield', 'true');
    fetch(fetchURL, {
        method: 'POST',
        body: getYieldData
    })
        .then(response => response.json())
        .then(datas => {
            console.log(datas);
            if (datas) {
                for (let data of datas) {
                    if (data.quantity_in != '' && data.quantity_out != '' || data.quantity_in != 'null' && data.quantity_out != 'null') {
                        const dataYield = (parseInt(data.quantity_out) / parseInt(data.quantity_in)) * 100;
                        document.getElementById('dataYieldSpan').textContent = `Yield: ${dataYield.toFixed(2) ? dataYield.toFixed(2) : 0}%`
                        if (isNaN(dataYield)) {
                            document.getElementById('dataYieldSpan').textContent = `Yield: 0%`
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
            console.log(error);
        })
}
getClosedSubProcess();
