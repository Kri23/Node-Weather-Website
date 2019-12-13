const weatherForm = document.querySelector('form');
const msg = document.getElementById('msg');
const search = document.getElementById('find');


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    let loc = search.value;
    msg.style.display = 'inherit';
    msg.innerHTML = 'Loading...';
    document.querySelector('body').style.cursor = 'progress';
    const url = '/weather?address=' + encodeURIComponent(loc);
    fetch(url).then((response) => {
        response.json().then((data) =>{
            if(data.Error){
                document.querySelector('body').style.cursor = 'initial';
                msg.innerHTML = data.Error;
            }else{
                const {Longitude,Latitude,Location,Temperature,Chances_Of_Rain} = data;
                let dispMsg = "Your Location is "+Location+".<br>Latitude : "+Latitude+".<br>Longitude : "+Longitude+".<br>Its "+Temperature+" Out There.<br>And "+Chances_Of_Rain+" Chances of Raining.";
                document.querySelector('body').style.cursor = 'initial';
                msg.innerHTML = dispMsg;
            }  
        })
    })
})