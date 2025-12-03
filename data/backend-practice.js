const xhr = new XMLHttpRequest();



xhr.addEventListener('load', ()=>{
    console.log('Response from backend:', xhr.response)
});
xhr.open('GET','https://supersimplebackend.dev') 
// a static methos to collect sth from the backend
xhr.open('GET','https://supersimplebackend.dev/products/first') 
xhr.response    
