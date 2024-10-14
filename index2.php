
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf/notyf.min.css">
<script src="https://cdn.jsdelivr.net/npm/notyf/notyf.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,200,0,-25" /> -->
<!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,300,1,0" /> -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
<body>
<button onclick="showToast('Sample Message')">Show Toast</button>
<button onclick="showNotyf('success')">Show Success</button>
<button onclick="showNotyf('error')">Show Error</button>
<button onclick="showNotyf('warning')">Show Warning</button>
<button onclick="showNotyf2()">Show Notyf</button>
<button onclick="showToastr()">Show Toast</button>
<h1>Database Connection Status</h1>
<div id="connection-status">Checking connection...</div>


<script>
  function showToastr() {
    toastr.success('This is a toast notification!', 'Success');
  }
</script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        let toastShown = false; 
        function showToast(message, icon) {
            // if (!toastShown) {
                // toastShown = true;
                Toastify({
                text: message,
                // duration: -1, //DILI MA WALA ANG TOAST
                duration : 5000,
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
                reconnect : 'true'
            }
            const url = new URL(fetchURL);
            Object.keys(param).forEach(key => url.searchParams.append(key, param[key]));
            fetch(url.toString(), {
                method : 'GET'
            }) 
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(!data.success){
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

        window.onload =  checkConnection();
    </script>
<script>
//   const notyf = new Notyf();

    const notyf2 = new Notyf({
        duration: 3000,
        ripple: false,
        position: {
            x: 'center',
            y: 'top',
        },
    });
    const notyf = new Notyf({
        duration: 3000,
        ripple: false,
        position: {
            x: 'center',
            y: 'top',
        },
        types: [
            {
            type: 'success',
            background: '#56810a',
            icon: {
                    className: 'material-symbols-outlined align-middle',
                    tagName: 'span',
                    text: 'check_circle',
                    color: 'white'
                },
            },
            {
            type: 'warning',
            background: '#ff5757',
            icon: {
                    className: 'material-symbols-outlined align-middle',
                    tagName: 'span',
                    text: 'warning',
                    color: 'white'
                }
            },
            {
            type: 'error',
            background: '#d30202',
            duration: 2000,
            icon: {
                    className: 'material-symbols-outlined align-middle',
                    tagName: 'span',
                    text: 'dangerous',
                    color: 'white'
                }
            }
        ]
        });

    function showNotyf2(){
        notyf2.success('Toast notification');
    }
    function showNotyf(new_type) {
        notyf.open({
            type: new_type,
            message: `<p class="text-white align-items-middle">${new_type} toast notification</p>`
        });
    }
</script>
</body>
</html>