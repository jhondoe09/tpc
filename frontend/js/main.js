const sectionId = localStorage.getItem('sectionId');

function likeMatch(pattern, subject) {
    pattern = pattern.replace(/%/g, '.*');
    const regex = new RegExp(`^${pattern}$`, 'i');
    return regex.test(subject);
}

if (likeMatch('%CWP%', sectionId) || likeMatch('%POL%', sectionId)) 
{
    var scriptSrc = './frontend/js/cwp.js';
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', scriptSrc);
    document.head.appendChild(scriptElement);
}
else if(likeMatch('%SWP%', sectionId)) 
{
    var scriptSrc = './frontend/js/swp.js';
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', scriptSrc);
    document.head.appendChild(scriptElement);
}
else
{
    var scriptSrc = './frontend/js/cwp.js';
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', scriptSrc);
    document.head.appendChild(scriptElement);
    // localStorage.clear();
    // window.location.href = 'index.php';
}