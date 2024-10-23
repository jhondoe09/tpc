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
        <table class="table table-hover table-sm table-bordered">
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
<!-- Remarks details with paragraph tag -->
<div class="col-md-6 mx-auto">
    <p class="text-break" style="text-align: center;">Remarks: PZ6846B1(1)-, Applied Mask: RCT-15G 6667</p>
</div>
<script>
    // let section_description = localStorage.getItem('sectionDescription');
    // let lot_number = localStorage.getItem('lotNo');
    // let parts_number = localStorage.getItem('partsNumber');
    // let revision_number = localStorage.getItem('revisionNumber');
    // let assignment_id = localStorage.getItem('assign_id');
    // let item_code = localStorage.getItem('itemCode');
    // let sampling = localStorage.getItem('sampling');
    // let uncontrolled = localStorage.getItem('uncontrolled');
    // let status = localStorage.getItem('status');
    // let SubPid = localStorage.getItem('subPid');
    // let section_id = localStorage.getItem('sectionId');
    // let date_issued = localStorage.getItem('dateIssued');
    // let wafer_from = localStorage.getItem('wafer_from');
    // let wafer_to = localStorage.getItem('wafer_to');
    // let quantity = localStorage.getItem('quantity');
    // document.getElementById('dateIssued').textContent = date_issued;
    // document.getElementById('partsNumber').textContent = parts_number;
    // document.getElementById('waferNumber').textContent = wafer_from + '`' + wafer_to;
    // document.getElementById('quantity').textContent = quantity;
</script>