// Footer
document.querySelector("#current-year").innerHTML = 
    `&copy ${new Date().getFullYear()}`;
document.querySelector("#last-modified").innerHTML = 
    `Last Update: ${document.lastModified}`;
