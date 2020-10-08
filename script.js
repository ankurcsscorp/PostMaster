console.log("Welcome to PostMaster App");

//Utilty function to get DOM element from string

//Submit button dissable
let dissableSubmit= () =>{
    let len= document.getElementById('inputURL').value;
    console.log(len);
    if(len.length < 5)
    {
        let submitbtn= document.getElementById("submit");
    submitbtn.addEventListener('click', (e)=>{
        e.preventDefault();
    })
}
}
let getElementFromFunction= (string) => {
    let div= document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}
    document.getElementById("contentTypeMain").style.display='none';
    document.getElementById("json_container").style.display='none';
//Request type according to that control content type and Enter json request
let  getRequest= document.getElementById("requestRadio1");
    getRequest.addEventListener('click', ()=>{
        document.getElementById("contentTypeMain").style.display='none';
        document.getElementById("json_container").style.display='none';
        document.getElementById("param_container").style.display='none';
        document.getElementById("param").style.display='none';
    })

    let  postRequest= document.getElementById("requestRadio2");
    postRequest.addEventListener('click', ()=>{
        document.getElementById("contentTypeMain").style.display='block';
        document.getElementById("json_container").style.display='block';
        
    })
//Initilize number of params
let addparamCount=0;

//Initially not disply param
document.getElementById("param_container").style.display='none';

// request type json, display node params
let jsonRadio= document.getElementById("contentRadio1");
    jsonRadio.addEventListener('click', ()=>{
    document.getElementById("param_container").style.display='none';
    document.getElementById("json_container").style.display='block';
    })

let paramRadio= document.getElementById("contentRadio2");
    paramRadio.addEventListener('click', ()=>{
    document.getElementById("json_container").style.display='none';
    document.getElementById("param_container").style.display='block';
    })
let addParam= document.getElementById("addParam");
    addParam.addEventListener('click',()=>{
    let param = document.getElementById("param");
    let string = `
    <div class="container" id="param_container">
            <form>
            <div class="form-row">
                <label for="unputURL" class="col-sm-2 col-form-label">Parameter ${addparamCount+2}</label>
              <div class="form-group col-md-4">
                <input type="text" class="form-control" id="contentKay${addparamCount+2}" placeholder="Enter the Parameter ${addparamCount+2} key..">
              </div>
              <div class="form-group col-md-4">
                <input type="text" class="form-control" id="contentValue${addparamCount+2}" placeholder="Enter the Parameter ${addparamCount+2} value..">
              </div>
              <button type="submit" class="btn btn-primary mb-2 deleteParam" >-</button>
            </div>
            </form>
    </div>
    `;
    let paramElement= getElementFromFunction(string);
    // console.log(paramElement);
    param.appendChild(paramElement);
    let deleteParam= document.getElementsByClassName('deleteParam');
    for(item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addparamCount++;
})

let submit= document.getElementById("submit");
    submit.addEventListener('click', ()=>{
        document.getElementById("responseField").innerHTML='Loading...'
        //get all the inputs from the user
        let url = document.getElementById("inputURL").value;
        let requestType= document.querySelector("input[name='requestType']:checked").value;
        let contentType= document.querySelector("input[name='contentType']:checked").value;
        
        console.log("The URL is : "+url);
        console.log("The requestType is : "+requestType);
        console.log("The contentType is : "+contentType);
        if(contentType=='PARAM') {
            data= {};
            for(let i=0; i< addparamCount+1; i++){
                if(document.getElementById('contentKay'+ (i+1)) != undefined){
                let key = document.getElementById('contentKay'+ (i+1)).value;
                let value= document.getElementById('contentValue'+(i+1)).value;
                data[key]= value;
                }
            }
            data= JSON.stringify(data);
            console.log(data);
        }else {
            data= document.getElementById("jsonrequest").value;
            console.log(data);
        }
        if(requestType=='GET')
        {
            fetch(url, {
                method: 'GET'
            })
            .then(response => response.text())
            .then((text)=>{
                if(url != ""){
                document.getElementById('responseField').value=text;
                document.getElementById('responseField').style.color='black';
                document.getElementById("inputURL").style.borderColor='green';
                }
                else{
                    alert("Oho! Please enter the URL")
                    document.getElementById('responseField').value="OPPS! Please enter the URL"
                    document.getElementById('responseField').style.color='red';
                    document.getElementById("inputURL").style.borderColor='red';
                }
            })
        }else {
           fetch(url, {
               method: 'POST',
               body: data,
               headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
              
           }).then(response=> response.text())
           .then((data) => {
            if(url != ""){
                document.getElementById('responseField').value=data;
                document.getElementById('responseField').style.color='black';
                document.getElementById("inputURL").style.borderColor='green';
                }
                else{
                    alert("Oho! Please enter the URL")
                    document.getElementById('responseField').value="OOPS! Please enter the URL"
                    document.getElementById('responseField').style.color='red';
                    document.getElementById("inputURL").style.borderColor='red';
                }
           })
        }
    })