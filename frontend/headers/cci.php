<link href="./frontend/css/cci_grid.css" rel="stylesheet" crossorigin="anonymous">

<div class="row align-items-start overflow-auto">
  <table class="table table-responsive">
    <div class="grid-container" style="text-align: left;">
      <!-- Order P/N -->
      <div><strong>Order P/N</strong></div>
      <div id="orderPn">-</div>
      <!-- Order Quantity -->
      <div><strong>Order Quantity</strong></div>
      <div id="orderQuantity">-</div>
      <!-- Model of Tray -->
      <div><strong>Model of Tray</strong></div>
      <div class="mdl_tray_data" id="modelOfTray">-</div>
      <!-- Part Number -->
      <div><strong>Part Number</strong></div>
      <div id="partsNumber">-</div>
      <!-- Quantity of Pack -->
      <div><strong>Quantity of Pack</strong></div>
      <div id="quantityOfPack">-</div>
      <!-- Original Qty Ln -->
      <div><strong>Original Qty Ln</strong></div>
      <div class="orig_data" id="originalQtyLn">-</div>
      <!-- Lot Number -->
      <div><strong>Lot Number</strong></div>
      <div id="lotNumber">-</div>
      <!-- Shipping Destination -->
      <div><strong>Shipping Destination</strong></div>
      <div id="shippingDestination">-</div>
      <!-- Std Thickness -->
      <div><strong>Std Thickness</strong></div>
      <div class="std_data" id="stdThickness">-</div>
      <!-- P/O Number -->
      <div><strong>P/O Number</strong></div>
      <div id="poNumber">-</div>
      <!-- Date of Delivery -->
      <div><strong>Date of Delivery</strong></div>
      <div id="dateOfDelivery">-</div>
      <!-- K Value -->
      <div><strong>K Value</strong></div>
      <div class="k_data" id="kValue">-</div>
      <!-- Customers P/N -->
      <div><strong>Customers P/N</strong></div>
      <div id="customersPn">-</div>
      <!-- EQI -->
      <div><strong>EQI</strong></div>
      <div id="eqi">-</div>
      <!-- Clip -->
      <div><strong>Clip</strong></div>
      <div class="clip_data" id="clip">-</div>
      <!-- Customer Name2 -->
      <div><strong>Customer Name2</strong></div>
      <div id="customerName2">-</div>
      <!-- Customer Name -->
      <div><strong>Customer Name</strong></div>
      <div id="customerName">-</div>
      <!-- Cover -->
      <div><strong>Cover</strong></div>
      <div class="last_cover_data" id="cover">-</div>
      <!-- Coc Number -->
    </div>
    <!-- End of grid-container -->
    <div class="container" style="text-align: left; border: 1px solid; border-top: none;">
      <div class="row">
        <div class="col">
          <label for=""><strong>VC:</strong></label>
        </div>
        <div class="col">
          <u id="vc">-</u>
        </div>
        <div class="col">
          <label for=""><strong>Insert Paper:</strong></label>
        </div>
        <div class="col">
          <p><u id="insertPaper">-</u></p>
        </div>
        <div class="col">
          <label for=""><strong>PoCat:</strong></label>
        </div>
        <div class="col">
          <p><u id="pocat">-</u></p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for=""><strong>VC Document No:</strong></label>
        </div>
        <div class="col">
          <p><u id="vcDocumentNo">-</u></p>
        </div>
        <div class="col">
        </div>
        <div class="col">
        </div>
        <div class="col">
          <label for=""><strong>IO Code:</strong></label>
        </div>
        <div class="col">
          <p><u id="ioCode">-</u></p>
        </div>
      </div>
    </div>

</div>
</table>
<!-- Grid -->

</div>
<!-- Ship details with paragraph tag -->



<div class="container text-center">
  <div class="row align-items-start">

    <div class="col-md-6 mx-auto">
      <p class="text-break" style="text-align: center;color: red;" id="remarks">Remarks: (Store in date 2022-09-29. CODHAM. Ship to USA. EGC 4334: Yield: 49%. Please use dainchi black cover. Ship to 9/7 to 8/24.)</p>
    </div>

  </div>
</div>
<script>
  let section = document.getElementById('section').textContent;
  const getHeaderData = new FormData();
  console.log(section);
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
            document.getElementById('orderPn').textContent = data.order_pn;
            document.getElementById('orderQuantity').textContent = data.order_quantity;
            document.getElementById('modelOfTray').textContent = data.tray_model;
            document.getElementById('partsNumber').textContent = data.item_parts_number;
            document.getElementById('quantityOfPack').textContent = data.quantity_of_pack;
            document.getElementById('originalQtyLn').textContent = data.original_quantity_in;
            document.getElementById('lotNumber').textContent = data.lot_number;
            document.getElementById('shippingDestination').textContent = data.shipping_destination;
            document.getElementById('stdThickness').textContent = data.std_thickness;
            document.getElementById('poNumber').textContent = data.po_number;
            document.getElementById('dateOfDelivery').textContent = data.delivery_date;
            document.getElementById('kValue').textContent = data.k_value;
            document.getElementById('customersPn').textContent = data.customer_pn;
            document.getElementById('eqi').textContent = data.eqi;
            document.getElementById('clip').textContent = data.clip;
            document.getElementById('customerName2').textContent = data.customer_name2;
            document.getElementById('customerName').textContent = data.customer_name;
            document.getElementById('cover').textContent = data.cover;
            document.getElementById('vc').textContent = "-";
            document.getElementById('insertPaper').textContent = "-";
            document.getElementById('pocat').textContent = data.po_cat;
            document.getElementById('ioCode').textContent = data.io_code;
            document.getElementById('remarks').textContent = `Remarks: (${data.remarks})`;
          }
        }
      }
    })
    .catch(error => {
      console.log(error);
    })
</script>