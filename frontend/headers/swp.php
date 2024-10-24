<link rel="stylesheet" href="./frontend/css/swpgrid.css">

<div class="grid-container">
    <div class="container-fluid text-center">
        <div class="row row-cols-4">
            <div class="col">
                <label>Au Sputter Lot Number:</label>
            </div>
            <div class="col">
                <label id="auLotNumber">-</label>
            </div>
            <div class="col">
                <label>Date Issued:</label>
            </div>
            <div class="col">
                <label id="dateIssued">-</label>
            </div>
        </div>
    </div>
</div>
<div class="" style="margin-top: 5px;">
    <div class="table-responsive">
        <table class="table table-hover table-sm table-bordered border-dark">
            <thead>
                <tr>
                    <th scope="col">Parts Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Type</th>
                    <th scope="col">Tan Lot</th>
                    <th scope="col">Wafer no.</th>
                    <th scope="col">K Value</th>
                    <th scope="col">Thickness</th>
                    <th scope="col">Range</th>
                    <th scope="col">Surface</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Metallization Layer</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="partsNumber">-</td>
                    <td id="category">-</td>
                    <td id="type">-</td>
                    <td id="tanLot">-</td>
                    <td id="waferNumber">-</td>
                    <td id="kValue">-</td>
                    <td id="thickness">-</td>
                    <td id="range">-</td>
                    <td id="surface">-</td>
                    <td id="quantity">-</td>
                    <td id="layer">-</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="table-responsive">
    <table class="table table-sm table-bordered text-center border-dark">
        <thead id="t_head">

        </thead>
        <tbody id="tbody_2">

        </tbody>
    </table>
</div>
<!-- Remarks details with paragraph tag -->
<div class="col-md-6 mx-auto">
    <p class="text-break" style="text-align: center;" id="remarks">Remarks: PZ6846B1(1)-, Applied Mask: RCT-15G 6667</p>
</div>
<script>
    let section = document.getElementById('section').textContent;
    let auLotNumber = document.getElementById('auLotNumber').textContent;
    const wafer_number_from = localStorage.getItem('wafer_from');
    const wafer_number_to = localStorage.getItem('wafer_to');
    const params = {
        assignment_id: localStorage.getItem('assign_id'),
        section: section,
        getHeader: 'true'
    };
    const url = new URL(fetchURL);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    fetch(url.toString(), {
            method: 'GET'
        })
        .then(response => response.json())
        .then(datas => {
            if (datas) {
                console.log(datas);
                if (datas.success) {
                    for (let data of datas.data) {
                        console.log(data);
                        localStorage.setItem('header_data', JSON.stringify(data));
                        document.getElementById('auLotNumber').textContent = data.au_sputter_lot_number ? data.au_sputter_lot_number : data.lot_number ? data.lot_number.split('-')[0] : '-';
                        document.getElementById('partsNumber').textContent = data.item_parts_number ? data.item_parts_number : '-';
                        document.getElementById('category').textContent = data.category_1 ? data.category_1 : '-';
                        document.getElementById('type').textContent = data.type ? data.type : '-';
                        document.getElementById('tanLot').textContent = data.tan_lot_number ? data.tan_lot_number : '-';
                        document.getElementById('waferNumber').textContent = `${wafer_number_from} ~ ${wafer_number_to}` ? `${wafer_number_from} ~ ${wafer_number_to}` : '?';
                        document.getElementById('kValue').textContent = data.k_value ? data.k_value : '-';
                        document.getElementById('thickness').textContent = data.thickness ? data.thickness : '-';
                        document.getElementById('range').textContent = data.range_spec ? data.range_spec : '-';
                        document.getElementById('surface').textContent = data.surface ? data.surface : '-';
                        document.getElementById('quantity').textContent = data.quantity ? data.quantity : '-';
                        document.getElementById('layer').textContent = data.a_face + ',' + data.b_face ? data.a_face + ',' + data.b_face : '-';
                        document.getElementById('remarks').textContent = `Notes: ${data.notes ? data.notes : '-'}, Remarks: ${data.remarks ? data.remarks : '-'}, Remarks 1: ${data.remarks_1 ? data.remarks_1 : '-'}, Remarks 2: ${data.remarks_2 ? data.remarks_2 : '-'}, Remarks 3: ${data.remarks_3 ? data.remarks_3 : '-'}, Remarks 4: ${data.remarks_4 ? data.remarks_4 : '-'}`;
                    }
                }
                const myPromise = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(datas.success);
                    }, 1000);
                });

                myPromise
                    .then(handleFulfilledA)

                function handleFulfilledA(resolve) {
                    const obj = JSON.parse(localStorage.getItem('header_data'));
                    if (resolve) {

                        const au_lot_number = document.getElementById('auLotNumber').textContent;
                        const parts_number = document.getElementById('partsNumber').textContent;
                        const tan_lot = document.getElementById('tanLot');
                        const date_issued = document.getElementById('dateIssued');
                        let pcard_lot_number;

                        if (parts_number.includes('SK')) {
                            const param = {
                                sk_ln: au_lot_number,
                                sk_pn: parts_number,
                                wafer_number_to: wafer_number_to,
                                wafer_number_from: wafer_number_from,
                                getSKHeader: 'true'
                            };
                            const get_sk_url = new URL(fetchURL);
                            Object.keys(param).forEach(key => get_sk_url.searchParams.append(key, param[key]));
                            fetch(get_sk_url.toString(), {
                                    method: 'GET'
                                })
                                .then(response => response.json())
                                .then(datas => {
                                    console.log(datas);
                                    if (datas.success) {
                                        const t_header = document.getElementById('t_head');
                                        const tbody_2 = document.getElementById('tbody_2');
                                        let headers = '';
                                        let tbody2_th_1 = '';
                                        let tbody2_th_2 = '';
                                        t_header.innerHTML = '';
                                        tbody_2.innerHTML = '';

                                        //   Start of wafer number header
                                        for (let i = parseInt(wafer_number_from); i <= parseInt(wafer_number_to); i++) {
                                            headers += `<th scope="col">${i}</th>`;
                                        }
                                        const t_header_tr = `<tr><th scope="col">Wafer No</th>${headers}</tr>`;
                                        t_header.innerHTML += t_header_tr;
                                        // End of wafer number header
                                        for (let d of datas.data) {
                                            tbody2_th_1 += `<td>${d.metallized_ln}</td>`;
                                            tbody2_th_2 += `<td>${d.k_val}</td>`;
                                        }

                                        // Start of Material/metallized lot number header
                                        const tbody2_tr_1 = `<tr><th scope="col">Material/Metallized Lo</th>${tbody2_th_1}</tr>`;
                                        // End of Material/metallized lot number header

                                        //  Start of Material K-value header
                                        const tbody2_tr_2 = `<tr><th scope="row">Material K Value</th>${tbody2_th_2}</tr>`;
                                        // End of Material K-value header

                                        tbody_2.innerHTML += tbody2_tr_1;
                                        tbody_2.innerHTML += tbody2_tr_2;
                                    } else {
                                        const tbody_tr_2 = `<tr><td>No data</td></tr>`;
                                        tbody_2.innerHTML += tbody_tr_2;
                                    }
                                })
                                .catch(error => {
                                    console.error(error);
                                })
                        } else {
                            const params = {
                                auLotNumber: obj.au_sputter_lot_number,
                                wafer_number_from: wafer_number_from,
                                wafer_number_to: wafer_number_to,
                                getHeader2: 'true'
                            };
                            const url = new URL(fetchURL);
                            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                            fetch(url.toString(), {
                                    method: 'GET'
                                })
                                .then(response => response.json())
                                .then(datas => {
                                    console.log(datas);
                                    if (datas.success) {
                                        const t_header = document.getElementById('t_head');
                                        const tbody_2 = document.getElementById('tbody_2');
                                        let headers = '';
                                        let tbody2_th_1 = '';
                                        let tbody2_th_2 = '';
                                        t_header.innerHTML = '';
                                        tbody_2.innerHTML = '';

                                        for (let i = parseInt(wafer_number_from); i <= parseInt(wafer_number_to); i++) {
                                            headers += `<th scope="col">${i}</th>`;
                                        }
                                        const t_header_tr = `<tr><th scope="col">Wafer No</th>${headers}</tr>`;
                                        t_header.innerHTML += t_header_tr;

                                        for (let d of datas.data) {
                                            tbody2_th_1 += `<td>${d.std_material_lot_number}</td>`;
                                            tbody2_th_2 += `<td>${d.std_actual_kvalue}</td>`;
                                        }
                                        const tbody2_tr_1 = `<tr><th scope="col">Material/Metallized Lo</th>${tbody2_th_1}</tr>`;
                                        const tbody2_tr_2 = `<tr><th scope="row">Material K Value</th>${tbody2_th_2}</tr>`;

                                        tbody_2.innerHTML += tbody2_tr_1;
                                        tbody_2.innerHTML += tbody2_tr_2;

                                        date_issued.innerText = datas.data[0].std_pc_inputDate;
                                    } else {
                                        const tbody_tr_2 = `<tr><td>No data</td></tr>`;
                                        tbody_2.innerHTML += tbody_tr_2;
                                    }
                                })
                            if (wafer_number_from < 10) {
                                pcard_lot_number = obj.au_sputter_lot_number + '-0' + wafer_number_from + '~' + wafer_number_to;
                            } else {
                                pcard_lot_number = obj.au_sputter_lot_number + '-' + wafer_number_from + '~' + wafer_number_to;
                            }
                            const param2 = {
                                parts_number: parts_number,
                                pcard_lot_number: pcard_lot_number,
                                get_tan_lot: 'true'
                            };
                            const new_ur = new URL(fetchURL);
                            Object.keys(param2).forEach(key => new_ur.searchParams.append(key, param2[key]));
                            fetch(new_ur.toString(), {
                                    method: 'GET'
                                })
                                .then(response => response.json())
                                .then(datas => {
                                    if (datas.success) {
                                        for (let d of datas.data) {
                                            tan_lot.textContent = d.tan_lot_number;
                                        }
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        }
                    }
                }
            }
        })
        .catch(error => {
            console.error(error);
        })
</script>