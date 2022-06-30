let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';

})
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
let addedParamCount = 0;
let addParam = document.getElementById("addParam")
addParam.addEventListener('click', (e) => {
    e.preventDefault();
    let params = document.getElementById("params");
    let string = ` <form class="row g-3 my-2">
                    <label for="inputEmail4" class="form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} value">
                    </div>
                    <div  class="col-md-4">
                        <button  class="btn btn-primary deleteParam">-</button>
                    </div></form>`;

    let paramElement = getElementFromString(string);
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {

            e.preventDefault();
            e.target.parentElement.remove();
        })
    }
    params.appendChild(paramElement);
    addedParamCount++;

})
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responseJsonText').value = "Please wait..Fetching response...."
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='REQUEST']:checked").value;
    let contentType = document.querySelector("input[name='CONTENT']:checked").value;
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data);
        }
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    console.log(url, requestType, contentType, data);
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        }).then(response => response.text()).then((text) => {
            document.getElementById('responseJsonText').value = text;

        });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        }).then(response => response.text()).then((text) => {
            document.getElementById('responseJsonText').value = text;

        });
    }
})

