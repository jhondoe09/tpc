<link href="./frontend/css/cwp_grid.css" rel="stylesheet" crossorigin="anonymous">
<link href="./frontend/layouts/links.php" rel="stylesheet" crossorigin="anonymous">
<div class="table-responsive row">
  <table class="table table-borderless">
    <tbody>
      <div class="">
        <div class="grid-container">
          <!-- Lot No -->
          <div class="text-start"><strong>Lot No: </strong></div>
          <div id="lotNo" class="">W22H006</div>
          <!-- Parts Number -->
          <div class="text-start"><strong>Parts Number: </strong></div>
          <div id="partsNumber" class="">HCTWC34000-6</div>
          <!-- K-Value -->
          <div class="text-start"><strong>K-Value: </strong></div>
          <!-- <div id="kValue" class="">34000-6</div> -->
          <div id="kValue" class="">-</div>
          <!-- Date Issue -->
          <div class="text-start"><strong>Date Issue: </strong></div>
          <div class="date_data " id="dateIssue">2023-01-19 04:06:33 UTC</div>
          <!-- Material Lot No -->
          <div class="text-start"><strong>Material Lot No: </strong></div>
          <div id="materialLotNo" class="">WK22098SA-J059E</div>
          <!-- Wafer Size -->
          <div class="text-start"><strong>Wafer Size: </strong></div>
          <!-- <div id="waferSize" class="">MOD86FWUH1</div> -->
          <div id="waferSize" class="">-</div>
          <!-- Thicknes -->
          <div class="text-start"><strong>Thickness: </strong></div>
          <!-- <div id="thickness" class="">150 ± 10</div> -->
          <div id="thickness" class="">-</div>
          <!-- Seed Crystal Lot No -->
          <div class="seed_crystal text-start"><strong>Seed Crystal Lot No: </strong></div>
          <!-- <div class="seed_crystal_data " id="seedCrystalData">J059E</div> -->
          <div class="seed_crystal_data " id="seedCrystalData">-</div>
          <!-- Main Mat Lot No -->
          <div class="main_mat text-start"><strong>Main Mat Lot No: </strong></div>
          <!-- <div class="main_mat_data " id="mainMatData">47849</div> -->
          <div class="main_mat_data " id="mainMatData">-</div>
          <!-- Qty -->
          <div class="qty text-start"><strong>Qty: </strong></div>
          <div class="qty_data " id="quantity">129</div>
          <!-- Condition -->
          <div class="condition text-start"><strong>Condition: </strong></div>
          <!-- <div class="condition_data " id="condition">Medium</div> -->
          <div class="condition_data " id="condition">-</div>

        </div>
        <!-- End of grid-container -->
    </tbody>
  </table>
</div>
<!-- Ship details with paragraph tag -->
<div class="container text-center">
  <div class="row align-items-start">

    <div class="col-md-6 mx-auto">
      <p class="text-break" style="text-align: center; color: red;" id="remarks">Remarks: (Store in date 2022-09-29. CODHAM. Ship to USA. EGC 4334: Yield: 49%. Please use dainchi black cover. Ship to 9/7 to 8/24.)</p>
    </div>

  </div>
</div>
<script>
  let section = document.getElementById('section').textContent;
  const getHeaderData = new FormData();
  getHeaderData.append('assignment_id', localStorage.getItem('assign_id'));
  getHeaderData.append('section', section);
  getHeaderData.append('getHeader', 'true');
  fetch(fetchURL, {
      method: 'POST',
      body: getHeaderData
    })
    .then(response => response.json())
    .then(datas => {
      if (datas) {
        if (datas.success) {
          for (let data of datas.data) {
            console.log(data);
            document.getElementById('lotNo').textContent = data.lot_number;
            document.getElementById('partsNumber').textContent = data.item_parts_number;
            document.getElementById('kValue').textContent = data.k_value;
            document.getElementById('dateIssue').textContent = data.date_issued;
            document.getElementById('materialLotNo').textContent = data.material_lot_number;
            document.getElementById('waferSize').textContent = data.wafer_size;
            document.getElementById('thickness').textContent = data.thickness;
            document.getElementById('seedCrystalData').textContent = data.seed_crystal_lot_number;
            document.getElementById('mainMatData').textContent = data.main_material_lot_number;
            document.getElementById('quantity').textContent = data.quantity ? parseFloat(data.quantity).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) : "-";
            document.getElementById('condition').textContent = data.k_value_level;
            document.getElementById('remarks').textContent = data.remarks ? `Remarks: (${data.remarks})` : "Remarks: (-)      ";
          }
        }
      }
    })
    .catch(error => {
      console.log(error);
    })
</script>