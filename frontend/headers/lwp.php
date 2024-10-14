<div class="container text-left">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div class="col"><strong>Surface:</strong></div>
        <div class="col">
            <p id="surface"></p>
        </div>
        <div class="col"><strong>K-Value:</strong></div>
        <div class="col">
            <p id="k_value"></p>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div class="col"><strong>Thickness:</strong></div>
        <div class="col">
            <p id="thickness"></p>
        </div>
        <div class="col"><strong>Lot No:</strong></div>
        <div class="col">
            <p id="lot_number"></p>
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
                        document.getElementById('surface').textContent = data.surface;
                        document.getElementById('k_value').textContent = data.k_value;
                        document.getElementById('thickness').textContent = data.thickness;
                        document.getElementById('lot_number').textContent = data.lot_number;
                    }
                }
            }
        })
        .catch(error => {
            console.log(error);
        })
</script>