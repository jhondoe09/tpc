// var modal = document.getElementById('exampleModal');
// var fileViewer = document.getElementById('fileViewer');
// modal.addEventListener('show.bs.modal', function (event) {
//     var button = event.relatedTarget;
//     var file = button.getAttribute('data-file');
//     var file_name = button.getAttribute('data-bs-title');
//     var filePath = file;
//     var fileName = filePath.split('/').pop();
//     var fileExtension = file.split('.').pop().toLowerCase();
//     var title = document.getElementById('modalTitle');
//     var div = document.getElementById('content');
//     var remarksUL = document.getElementById(' remarksUL');
//     var remarksText = button.getAttribute('data-remarks');
//     var name = button.getAttribute('data-bs-title');
//     title.textContent = name;

//     if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'gif' || fileExtension === 'bmp' || fileExtension === 'tiff' || fileExtension === 'svg' || fileExtension === 'webp' || fileExtension === 'ico') {
//         div.innerHTML = '';
//         remarksUL.innerHTML = '';
//         var img = document.createElement('img');
//         img.setAttribute('src', file);
//         img.setAttribute('width', '100%');
//         img.setAttribute('height', '500px');
//         img.append();
//         div.appendChild(img);

//         var list = `<li>(${remarksText})</li>`
//         remarksUL.innerHTML += list;

//     }
//     else if (fileExtension === 'pdf') {
//         div.innerHTML = '';
//         remarksUL.innerHTML = '';
//         var iframe = document.createElement('iframe');
//         iframe.setAttribute('src', file);
//         iframe.setAttribute('width', '100%');
//         iframe.setAttribute('height', '500px');
//         div.appendChild(iframe);

//         var list = `<li>(${remarksText})</li>`
//         remarksUL.innerHTML += list;
//     }
//     else if (fileExtension === 'doc' || fileExtension === 'docx' || fileExtension === 'ppt' || fileExtension === 'pptx' || fileExtension === 'xls' || fileExtension === 'xlsx') {
//         div.innerHTML = '';
//         remarksUL.innerHTML = '';
//         var iframe2 = document.createElement('iframe');
//         var input = `

//         <form action="./backend/query/open.php" method="POST">
//             <div class="mb-3 form-check">
//                 <input type="input" class="form-control d-none" name="exampleCheck1" id="exampleCheck1" data-screen_width="${screen.width}" value="${file_name}">
//                 <input type="input" class="form-control d-none" name="width" value="${screen.width}">
//             </div>
//             <button type="submit" class="btn btn-primary" name="open_excel" id="open_excel">Submit</button>
//         </form>`;
//         // <iframe src='https://view.officeapps.live.com/op/embed.aspx?src=http://remote.url.tld/path/to/document.doc' width='1366px' height='623px' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
//         // <iframe src="https://docs.google.com/gview?url=http://remote.url.tld/path/to/document.doc&embedded=true"></iframe>
//         // iframe2.setAttribute('src','https://drive.google.com/viewerng/viewer?url=/' + file);
//         // iframe2.setAttribute('src', "https://view.officeapps.live.com/op/embed.aspx?src=" + file + "' width='100%' height='100%' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>");
//         iframe2.setAttribute('src', "https://docs.google.com/spreadsheets/d/1uzLuTvgChI1-m3I155pzp6AC_rLKyOYz/edit?gid=559051957#gid=559051957' width='100 % ' height='100 % ' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>");
//         // <iframe src="https://docs.google.com/gview?url=https://docs.google.com/spreadsheets/d/1uzLuTvgChI1-m3I155pzp6AC_rLKyOYz/edit?usp=sharing&ouid=106410408096981096842&rtpof=true&sd=true"></iframe>
//         iframe2.setAttribute('width', '100%');
//         iframe2.setAttribute('height', '500px');
//         var p = document.createElement('p');
//         p.innerHTML = "Sorry an error occured while displaying the attachment, do you want to download it instead? Click<a href=' " + file + "' download> me </a>to download."

//         // p.innerHTML = "Sorry an error occured while displaying the attachment, do you want to download it instead? Click<a href=' https://172.16.2.13/testTPC/Book2.htm' download> me </a>to download."
//         // p.innerHTML = "Sorry an error occured while displaying the attachment, do you want to download it instead? Click<a class='word' href='//docs.google.com/gview?url="+file+"&embedded=true'>Open a Word document in Fancybox</a>to download."

//         div.appendChild(iframe2);
//         div.innerHTML += input;
//         div.appendChild(p);

//         var list = `<li>(${remarksText})</li>`
//         remarksUL.innerHTML += list;
//     }
//     else {
//         div.innerHTML = '';
//         remarksUL.innerHTML = '';
//         var iframe2 = document.createElement('iframe');
//         iframe2.setAttribute('src', 'https://drive.google.com/viewerng/viewer?url=/' + file);
//         iframe2.setAttribute('width', '100%');
//         iframe2.setAttribute('height', '500px');
//         var p = document.createElement('p');
//         p.innerHTML = "Sorry an error occured while displaying the attachment, do you want to download it instead? Click<a href=' " + file + " ' download> me </a>to download."
//         div.appendChild(iframe2);
//         div.appendChild(p);

//         var list = `<li>(${remarksText})</li>`
//         remarksUL.innerHTML += list;
//     }
// });


var modal = document.getElementById('exampleModal');
var fileViewer = document.getElementById('fileViewer');
const googleFetchURL = 'https://172.16.2.13:8443/';
let counts = 0;
const path = '\\\\172.16.2.13\\htdocs\\TPC-endpoint\\uploads\\';
const closeAttachmentModal = document.getElementById('closeAttachmentModal');
modal.addEventListener('show.bs.modal', function (event) {
    while (counts < 1) {
        var button = event.relatedTarget;
        var file = button.getAttribute('data-file');
        var file_name = button.getAttribute('data-bs-title');
        var filePath = file;
        var fileName = filePath.split('/').pop();
        var fileExtension = file.split('.').pop().toLowerCase();
        var div = document.getElementById('content');
        var remarksUL = document.getElementById(' remarksUL');
        var remarksText = button.getAttribute('data-remarks');
        var google_drive_id = button.getAttribute('data-google_drive_id');
        var form_attachment_id = button.getAttribute('data-form_attachment_id');
        // var title = document.getElementById('modalTitle');
        // var name = button.getAttribute('data-bs-title');
        // const assignment_id = localStorage.getItem('assign_id');
        // const SubPid = localStorage.getItem('SUBPID');
        if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'gif' || fileExtension === 'bmp' || fileExtension === 'tiff' || fileExtension === 'svg' || fileExtension === 'webp' || fileExtension === 'ico') {
            div.innerHTML = '';
            remarksUL.innerHTML = '';
            var img = document.createElement('img');
            img.setAttribute('src', file);
            img.setAttribute('width', '100%');
            img.setAttribute('height', '500px');
            img.append();
            div.appendChild(img);

            var list = `<li>(${remarksText})</li>`
            remarksUL.innerHTML += list;

        }
        else if (fileExtension === 'pdf') {
            div.innerHTML = '';
            remarksUL.innerHTML = '';
            var iframe = document.createElement('iframe');
            iframe.setAttribute('src', file);
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '500px');
            div.appendChild(iframe);

            var list = `<li>(${remarksText})</li>`
            remarksUL.innerHTML += list;
        }
        else if (fileExtension === 'doc' || fileExtension === 'docx' || fileExtension === 'ppt' || fileExtension === 'pptx' || fileExtension === 'xls' || fileExtension === 'xlsx') {
            if (google_drive_id == null || google_drive_id == 'null' || google_drive_id == "null") {
                upload(form_attachment_id, path, file_name);
            } else {
                get_data(google_drive_id);
            }
            // div.innerHTML = '';
            // remarksUL.innerHTML = '';
            // var iframe2 = document.createElement('iframe');
            // var input = `

            //         <form action="./backend/query/open.php" method="POST">
            //             <div class="mb-3 form-check">
            //                 <input type="input" class="form-control d-none" name="exampleCheck1" id="exampleCheck1" data-screen_width="${screen.width}" value="${file_name}">
            //                 <input type="input" class="form-control d-none" name="width" value="${screen.width}">
            //             </div>
            //             <button type="submit" class="btn btn-primary" name="open_excel" id="open_excel">Submit</button>
            //         </form>`;
            // // <iframe src='https://view.officeapps.live.com/op/embed.aspx?src=http://remote.url.tld/path/to/document.doc' width='1366px' height='623px' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
            // // <iframe src="https://docs.google.com/gview?url=http://remote.url.tld/path/to/document.doc&embedded=true"></iframe>
            // // iframe2.setAttribute('src','https://drive.google.com/viewerng/viewer?url=/' + file);
            // // iframe2.setAttribute('src', "https://view.officeapps.live.com/op/embed.aspx?src=" + file + "' width='100%' height='100%' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>");
            // iframe2.setAttribute('src', "https://docs.google.com/spreadsheets/d/1uzLuTvgChI1-m3I155pzp6AC_rLKyOYz/edit?gid=559051957#gid=559051957' width='100 % ' height='100 % ' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>");
            // // <iframe src="https://docs.google.com/gview?url=https://docs.google.com/spreadsheets/d/1uzLuTvgChI1-m3I155pzp6AC_rLKyOYz/edit?usp=sharing&ouid=106410408096981096842&rtpof=true&sd=true"></iframe>
            // iframe2.setAttribute('width', '100%');
            // iframe2.setAttribute('height', '500px');
            // var p = document.createElement('p');
            // p.innerHTML = "Sorry an error occured while displaying the attachment, do you want to download it instead? Click<a href=' " + file + "' download> me </a>to download."

            // // p.innerHTML = "Sorry an error occured while displaying the attachment, do you want to download it instead? Click<a href=' https://172.16.2.13/testTPC/Book2.htm' download> me </a>to download."
            // // p.innerHTML = "Sorry an error occured while displaying the attachment, do you want to download it instead? Click<a class='word' href='//docs.google.com/gview?url="+file+"&embedded=true'>Open a Word document in Fancybox</a>to download."

            // div.appendChild(iframe2);
            // div.innerHTML += input;
            // div.appendChild(p);

            // var list = `<li>(${remarksText})</li>`
            // remarksUL.innerHTML += list;
        }
        else {
            div.innerHTML = '';
            remarksUL.innerHTML = '';
            var iframe2 = document.createElement('iframe');
            iframe2.setAttribute('src', 'https://drive.google.com/viewerng/viewer?url=/' + file);
            iframe2.setAttribute('width', '100%');
            iframe2.setAttribute('height', '500px');
            var p = document.createElement('p');
            p.innerHTML = "Sorry an error occured while displaying the attachment, do you want to download it instead? Click<a href=' " + file + " ' download> me </a>to download."
            div.appendChild(iframe2);
            div.appendChild(p);

            var list = `<li>(${remarksText})</li>`
            remarksUL.innerHTML += list;
        }
        console.log(filePath, fileName, google_drive_id);
        counts++;
    }
});

modal.addEventListener('hidden.bs.modal', event => {
    counts = 0;
})

function upload(form_attachment_id, path, file_name) {
    const uploadData = new FormData();
    uploadData.append('filePath', path);
    uploadData.append('fileName', file_name);
    fetch(googleFetchURL + 'upload', {
        method: 'POST',
        body: uploadData
    })
        .then(response => response.json())
        .then(datas => {
            console.log(datas);
            if (datas.success) {
                const file_id = datas.fileId;
                const updateData = new FormData();
                updateData.append('goole_drive_id', file_id);
                updateData.append('form_attachment_id', form_attachment_id);
                updateData.append('updateData', 'true');
                fetch(fetchURL, {
                    method: 'POST',
                    body: updateData
                })
                    .then(response => response.json())
                    .then(datas => {
                        console.log(datas);
                        if (datas.success) {
                            get_data(file_id);
                        }
                    })
            }
        })
        .catch(error => {
            console.log(error);
            if (error.message === 'Failed to fetch') {
                window.location = googleFetchURL;
            }
        })
}

function get_data(google_drive_id) {
    fetch(googleFetchURL + 'get_drive_data', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(datas => {
            console.log(datas);
            if (datas.success) {
                for (let d of datas.files) {
                    if (d.id === google_drive_id) {
                        //  CURRENT
                        const iframe = `<iframe src="https://docs.google.com/spreadsheets/d/${d.id}/edit?gid=344945898#gid=344945898" title="Google Sheet" width='100%' height='100%' frameborder='0'></iframe>`;
                        modal.innerHTML = iframe;

                        // ALTERNATIVE
                        // closeAttachmentModal.click();
                        // window.location.href = `https://docs.google.com/spreadsheets/d/${d.id}/edit?gid=344945898#gid=344945898`;
                    }
                }
            }
        })
        .catch(error => {
            if (error.message === 'Failed to fetch') {
                window.location = googleFetchURL;
            }
        })
}