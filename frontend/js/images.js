var modal = document.getElementById('exampleModal');
    var fileViewer = document.getElementById('fileViewer');
        modal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget;
            var file = button.getAttribute('data-file');
            var filePath = file;
            var fileName = filePath.split('/').pop();
            var fileExtension = file.split('.').pop().toLowerCase();
            var title = document.getElementById('modalTitle');
            var div = document.getElementById('content');
            var remarksUL = document.getElementById('remarksUL');
            var remarksText = button.getAttribute('data-remarks');
            var name = button.getAttribute('data-bs-title');
            title.textContent = name;
           
            if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'gif' || fileExtension === 'bmp' || fileExtension === 'tiff' || fileExtension === 'svg' || fileExtension === 'webp' || fileExtension === 'ico') 
            {
                div.innerHTML = '';
                remarksUL.innerHTML = '';
                var img = document.createElement('img');
                img.setAttribute('src', file);
                img.setAttribute('width','100%');
                img.setAttribute('height','500px');
                img.append();
                div.appendChild(img);
                
                var list = `<li>(${remarksText})</li>`
                remarksUL.innerHTML += list;
                
            } 
            else if(fileExtension === 'pdf')
            {
                div.innerHTML = '';
                remarksUL.innerHTML = '';
                var iframe = document.createElement('iframe');
                iframe.setAttribute('src', file);
                iframe.setAttribute('width','100%');
                iframe.setAttribute('height','500px');
                div.appendChild(iframe);

                var list = `<li>(${remarksText})</li>`
                remarksUL.innerHTML += list;
            }
            else if (fileExtension === 'doc' || fileExtension === 'docx' || fileExtension === 'ppt' || fileExtension === 'pptx' || fileExtension === 'xls' || fileExtension === 'xlsx')
            {
                div.innerHTML = '';
                remarksUL.innerHTML = '';
                var iframe2 = document.createElement('iframe');
                iframe2.setAttribute('src','https://drive.google.com/viewerng/viewer?url=/' + file);
                iframe2.setAttribute('width','100%');
                iframe2.setAttribute('height','500px');
                var p = document.createElement('p');
                p.innerHTML = "Sorry an error occured while displaying the attachment, do you want to download it instead? Click<a href=' "+file+" ' download> me </a>to download."
                div.appendChild(iframe2);
                div.appendChild(p);

                var list = `<li>(${remarksText})</li>`
                remarksUL.innerHTML += list;
            }
            else
            {
                div.innerHTML = '';
                remarksUL.innerHTML = '';
                var iframe2 = document.createElement('iframe');
                iframe2.setAttribute('src','https://drive.google.com/viewerng/viewer?url=/' + file);
                iframe2.setAttribute('width','100%');
                iframe2.setAttribute('height','500px');
                var p = document.createElement('p');
                p.innerHTML = "Sorry an error occured while displaying the attachment, do you want to download it instead? Click<a href=' "+file+" ' download> me </a>to download."
                div.appendChild(iframe2);
                div.appendChild(p);

                var list = `<li>(${remarksText})</li>`
                remarksUL.innerHTML += list;
            }
        });