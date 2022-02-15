let tbody = document.getElementById('tbody')

let addBookBtn = document.getElementById('add-btn')

let allInputs = document.querySelectorAll('.form input')

let existIdMsg = document.getElementById('exist-id-msg')

let formValidateMsg = document.getElementById('form-valid-msg')

let infoDiv = document.getElementById('bookinfo');

let searchInput = document.getElementById('book-title-search');

let serchBtn = document.getElementById('search-btn')

let booksTable = document.getElementById('table')

let headerFormBtn = document.getElementById('addForm-btn');

let addForm = document.getElementById('add-form');

let makeChangeBtn = document.getElementById('make-the-change');

let findForm = document.getElementById('find-form')

let closeFormBtn = document.getElementById('close-add-form');

let closeInfoBtn = document.getElementById('closeInfo-showBooks')

let matchSearchMsg = document.getElementById('match-search-msg')

let validSearchMsg = document.getElementById('valseach-msg');

let recietDiv = document.getElementById('reciet-div')

let id0msg = document.getElementById('id0-msg');

let futureIdMsg = document.getElementById('future-id-msg')

let bookHeader = document.getElementById('books-header');

let timeoutFunc = (elem,val,number)=>{
    setTimeout(()=>{
        elem.classList.remove(val)
    },number)
}

window.onload = ()=>{
    if(!localStorage.getItem('books') || JSON.parse(localStorage.getItem('books')).length=== 0){
        findForm.classList.add('hide-search-form')
    }
    if(localStorage.getItem('books')){
        // show search form

        let lsArray = JSON.parse(localStorage.getItem('books'));
    
        lsArray.forEach(arr => {
            let tr = document.createElement('tr');
            arr.map(val => {
                let td = document.createElement('td');
                td.textContent = val;
                tr.appendChild(td)
            })
    
            tbody.appendChild(tr)
        })

    }else {
    localStorage.setItem('books', JSON.stringify([]))

    }


    // Handle users
    if(localStorage.getItem('users')){

    }else {
        localStorage.setItem('users',JSON.stringify([]))
        console.log('make users array');
    }

}

// id future msg
let idinput = allInputs[0];
idinput.onclick = ()=> {
    futureIdMsg.classList.add('id-future-msg-active');
    futureIdMsg.classList.add('id-future-msg-anime')
    timeoutFunc(futureIdMsg,'id-future-msg-active',6000)
}

//////////////////////////////// [ Add Books Function ] \\\\\\\\\\\\\\\\\\\\\\\\\\
let booksArry = []
addBookBtn.addEventListener('click',(e)=>{
    e.preventDefault();

let locStrgArry = JSON.parse(localStorage.getItem('books'))

if(locStrgArry.length == 0 ){
    if(allInputs[0].value.trim()
    &&allInputs[1].value.trim()
    &&allInputs[2].value.trim()
    &&allInputs[3].value.trim()
    &&allInputs[4].value.trim()
    &&allInputs[0].value !== '0'){// if inputs valid and no arrays in localst
        let arryTow = []
        for(let i = 0; i < allInputs.length ; i++){
            arryTow.push(allInputs[i].value)
                allInputs[i].value = ''
            }
            booksArry.push(arryTow)
        
            let tr = document.createElement('tr');
        
            arryTow.map(val=>{
                let td = document.createElement('td');
                td.textContent = val
                tr.appendChild(td)
            })
            tbody.appendChild(tr)
        
            //Local storage Function\\
            if(localStorage.getItem('books')){
                let oldArry = JSON.parse(localStorage.getItem('books'))
                localStorage.setItem('books',JSON.stringify([...oldArry,arryTow]))
            }else {
                localStorage.setItem('books', JSON.stringify([]))
            }
    }else {
                // if not all inputs valid
                if(allInputs[0].value === '0'){// if the book id == 0
                    id0msg.classList.add('id0num-msg-active')
                    timeoutFunc(id0msg,'id0num-msg-active',3000)

                }else {// if not 0 but not valid
                    formValidateMsg.classList.add('form-validat-msg-active')
                    timeoutFunc(formValidateMsg,'form-validat-msg-active',3000)
                }
    }
        
    }else if(locStrgArry.length > 0 ) {// check if localst has array
        let ifFals = locStrgArry.map(arr=>{// check if the id is already in localst
        
            if(arr[0] === allInputs[0].value){
                return true;
            }
        })

        if(ifFals.includes(true)){
            // show exist id msg
            existIdMsg.classList.add('id-exist-msg-active')
            timeoutFunc(existIdMsg,'id-exist-msg-active',3000)
        }else {

            if(allInputs[0].value.trim()
            &&allInputs[1].value.trim()
            &&allInputs[2].value.trim()
            &&allInputs[3].value.trim()
            &&allInputs[4].value.trim()
            &&allInputs[0].value !== '0'
            ){// if all inputs valid
                let arryTow = []
                for(let i = 0; i < allInputs.length ; i++){
                        arryTow.push(allInputs[i].value)
                        allInputs[i].value = ''
                    }
                    booksArry.push(arryTow)
                
                    let tr = document.createElement('tr');
                
                    arryTow.map(val=>{
                        let td = document.createElement('td');
                        td.textContent = val
                        tr.appendChild(td)
                    })
                    tbody.appendChild(tr)
                
                    //Local storage Function\\
                    if(localStorage.getItem('books')){
                        let oldArry = JSON.parse(localStorage.getItem('books'))
                        localStorage.setItem('books',JSON.stringify([...oldArry,arryTow]))
                    }else {
                        localStorage.setItem('books', JSON.stringify([]))
                    }

            }else {
                // if not all inputs valid
                if(allInputs[0].value === '0'){// if the book id == 0
                    id0msg.classList.add('id0num-msg-active')
                    timeoutFunc(id0msg,'id0num-msg-active',3000)

                }else {// if not 0 but not valid
                    formValidateMsg.classList.add('form-validat-msg-active')
                    timeoutFunc(formValidateMsg,'form-validat-msg-active',3000)
                }

            }
        }

        
}
    // show search form
    // if localst has arrays
    if(localStorage.getItem('books') && JSON.parse(localStorage.getItem('books')).length > 0){
        findForm.classList.add('hide-search-form')// 
    }
})



///////////////////////// [ Searching Function ]\\\\\\\\\\\\\\\\\\\\\\\\\\

serchBtn.addEventListener('click',(e)=> {
    e.preventDefault();
    if(searchInput.value.trim()){
        let lcArr = JSON.parse(localStorage.getItem('books'))

        bookInfoFunc(lcArr)/////////////////////////Book info Function
        
        lcArr.forEach(element => {
            if(element.includes(searchInput.value)){
                // hidt table
                booksTable.classList.add('hide-table')
                // show infoDiv
                infoDiv.style.display = 'grid';
                searchInput.value = '';
                //hide add form
                addForm.style.display = 'none';

/////////////////////////////////Edit Function\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

                // Edit Btns from infoDiv [ infoDiv is the container of the book div info]
                let allSingleBookBtns = document.querySelectorAll('#bookinfo .single-book button');
                allSingleBookBtns.forEach(btn => {
                btn.addEventListener('click',(e) =>{
                    //(e) => Edit btn 
                    if(e.target.id !== 'closeInfo-showBooks' && e.target.id !== 'buy-btn'){
                        // anime add form
                            // form animation
                        setTimeout(()=>{
                            addForm.classList.add('form-anime')
                        },100)

                        // input animation
                        setTimeout(()=>{
                            allInputs.forEach(inp=>{
                                inp.classList.add('input-width-anime')
                            })
                        },900)
                        // addForm.classList.add('form-anime')
                        allInputs[0].disabled = true;
                        addForm.classList.add('warning-msg')
                        addBookBtn.classList.add('hide-form-btn')
                        makeChangeBtn.classList.add('show-change-btn')

                        let lcArr = JSON.parse(localStorage.getItem('books'));

                        let bkid = e.target.parentNode.childNodes[0].childNodes[1].textContent;

                        lcArr.forEach((arr,ind) => {
                            if(arr[0] === bkid){
                                addForm.style.display = 'flex';
                                allInputs.forEach((inp,index)=>{
                                        inp.value = arr[index]
                                })
                            }
                        })
                    }else if(e.target.id === 'buy-btn') {
                        findForm.classList.remove('hide-search-form')
                        booksTable.classList.remove('hide-table')
                        // make a reciet
                        let allspans = document.querySelectorAll('#book-value')
                        let bookName = allspans[1].textContent
                        let lcArr = JSON.parse(localStorage.getItem('books'));

                        lcArr.forEach(arr => {
                            if(arr.includes(bookName)){
                                allInputs.forEach((inp,index)=>{
                                        inp.value = arr[index]
                                })
                            }
                        })
                    }
                    infoDiv.style.display = 'none';
                    let allBooksinfodiv =  document.querySelectorAll('#bookinfo div');
                    allBooksinfodiv.forEach(d=>{
                        d.remove()
                    })
                    })
                    // hide search form 
                    findForm.classList.add('hide-search-form')
            })
            }else {

            }
        });
    }else {
        validSearchMsg.classList.add('show-valid-search-msg')
        timeoutFunc(validSearchMsg,'show-valid-search-msg',3000)
    }

    // animation
    let bookinfanime = document.querySelectorAll('.single-book');
    setTimeout(()=>{
        bookinfanime.forEach(bok=>{
            bok.classList.add('book-anime')
        })
    },100)

}) 


//////////////////////////// book info func\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let bookInfoFunc = (lcarr)=> {

    lcarr.forEach(arr => {
        let searchvalidvalues = []
        for(let i = 0; i < 3; i++){
            searchvalidvalues.push(arr[i])
        }

        // check if these inputs are valid => id || author || book name
        if(searchvalidvalues.includes(searchInput.value) ){// search relay on id || author || book name
            let singleBookInfo = document.createElement('div');
            singleBookInfo.className = 'single-book';
            arr.map((vl,i)=>{
                let h4 = document.createElement('h4');
                let valueName = document.querySelectorAll('.form label')
                let span = document.createElement('span');
                span.id = 'book-value'
                span.textContent = vl;

                // check if tha label is : price
                if(valueName[i].textContent === 'Price'){
                    // add dollar sign after the price value
                    span.textContent = vl + ' ' + ' $'
                }
                h4.textContent = valueName[i].innerHTML + ': ' ;
                h4.appendChild(span)
                singleBookInfo.appendChild(h4)
            })
                            // make the Edit btn
                            let editBtn = document.createElement('button');
                            editBtn.id = 'edit-btn'
                            editBtn.className = 'edit-btn edit-btn-hidden'
                            editBtn.textContent = 'Edit';
                            singleBookInfo.appendChild(editBtn)

                            // if user is admin show edit button
                            edtiaccess(editBtn)
                            
                            // make the Bay btn
                            let buybtn = document.createElement('button');
                            buybtn.id = 'buy-btn'
                            buybtn.className = 'buybtn'
                            buybtn.textContent = 'Buy The Book';
                            singleBookInfo.appendChild(buybtn)
                            buybtn.addEventListener('click',(e)=>{
                                buyFunc(lcarr,e)// buy function
                            })
            // apend the book info to the bookinfo container
            infoDiv.appendChild(singleBookInfo)
        }
    })
}

/////////////////////////////////////// bayFunction\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let buyFunc = (locstarr,e) => {
    let bkid = e.target.parentNode.childNodes[0].childNodes[1].textContent;// book id

    let singleBookInfoDiv = document.createElement('div');

    singleBookInfoDiv.className = 'single-book-bay';

    locstarr.forEach(arr => {

        let searchvalidvalues = []
        for(let i = 0; i < 3; i++){
            searchvalidvalues.push(arr[i])
        }

        if(searchvalidvalues.includes(bkid) ){
            arr.map((vl,i)=>{
                let h4 = document.createElement('h4');
                let valueName = document.querySelectorAll('.form label')
                let span = document.createElement('span');
                span.id = 'book-value-bay'
                span.textContent = vl;
        
                // check if tha label is : price
                if(valueName[i].textContent === 'Price'){
                    // add dollar sign after the price value
                    span.textContent = vl + ' ' + ' $'
                }
                h4.textContent = valueName[i].innerHTML + ': ' ;
                h4.appendChild(span)
                singleBookInfoDiv.appendChild(h4)
            })
        }
    })
    recietDiv.appendChild(singleBookInfoDiv) 

    recietDiv.style.display = 'block';

    // reciete anime
    setTimeout(()=>{
        recietDiv.classList.add('reciet-div-anime')
    },100)
    
}


// Show & hide Forms , info \\
/////////////////////////////////////// Header Button Function\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
headerFormBtn.onclick = ()=>{
    allInputs[0].disabled = false;

    findForm.classList.add('hide-search-form');// hide search form

    addForm.style.display = 'flex';// show add Form
    
    infoDiv.style.display = 'none';// hide info div

    // hide edit btn - romve warning msg
    makeChangeBtn.classList.remove('show-change-btn')// remove change button

    // show add book button
    addBookBtn.classList.remove('hide-form-btn')// show add book button

    allInputs.forEach(inpu => {// clear all inputs
        inpu.value = ''
    })

    addForm.classList.remove('warning-msg')// remove form warning msg

    let allBooksinfodiv =  document.querySelectorAll('#bookinfo div');
    allBooksinfodiv.forEach(d=>{// remove 
        d.remove()
    })

    // form animation
    setTimeout(()=>{
        addForm.classList.add('form-anime')
    },100)

    // input animation
    setTimeout(()=>{
        allInputs.forEach(inp=>{
            inp.classList.add('input-width-anime')
        })
    },900)
}


closeFormBtn.onclick = (e)=>{
    e.preventDefault();
    // delay fanish to let anime happen
    setTimeout(()=>{
        addForm.style.display = 'none';
    },1500)

    booksTable.classList.remove('hide-table');// show books table
    if(localStorage.getItem('books') && JSON.parse(localStorage.getItem('books')).length > 0){
        findForm.classList.remove('hide-search-form')// show search form
    }else {
        findForm.classList.add('hide-search-form')
    }

    // remove add form animation
    addForm.classList.remove('form-anime')

    // remove inputs animation
    allInputs.forEach(inp=>{
        inp.classList.remove('input-width-anime')
    })
}

closeInfoBtn.onclick = ()=>{
    // if there an item (books) and that item has values(arrays)
    if(localStorage.getItem('books') && JSON.parse(localStorage.getItem('books')).length > 0){
        findForm.classList.remove('hide-search-form')
    }else {
        findForm.classList.add('hide-search-form')
    }
    infoDiv.style.display = 'none';

    booksTable.classList.remove('hide-table');
    // delete the info div
    let allBooksinfodiv =  document.querySelectorAll('#bookinfo div');
    allBooksinfodiv.forEach(d=>{
        d.remove()
    });

}

/////////////////////////////// Edit Function (change books values)\\\\\\\\\\\\\\\\\\\\\\\\\\\
makeChangeBtn.onclick = (e)=>{
    e.preventDefault()
    if(allInputs[0].value.trim()
    &&allInputs[1].value.trim()
    &&allInputs[2].value.trim()
    &&allInputs[3].value.trim()
    &&allInputs[4].value.trim()
    &&allInputs[0].value !== '0'){
        let lcArr = JSON.parse(localStorage.getItem('books'));
        let bookid = allInputs[0].value ;
        let thenewArr = []
        let mybigArr = lcArr.map((arr,index) => {
            //change the values in the existed array with the new values from inputs
            if(arr.includes(bookid)){
                arr.map((vl,inde) => {
                    thenewArr.push(allInputs[inde].value)
                })
                arr = thenewArr;
            }
            return arr;
    
        })
        localStorage.setItem('books',JSON.stringify(mybigArr))
        window.location.reload();
    }else {
        formValidateMsg.classList.add('form-validat-msg-active')
        timeoutFunc(formValidateMsg,'form-validat-msg-active',3000)
    }
}

searchInput.onclick = ()=> {
    findForm.classList.add('sure-msg')
    timeoutFunc(findForm,'sure-msg',5000)
}

///////////////////////Make The Bill Functio\\\\\\\\\\\\\\\\\\\\\\\\\
let buyNow = document.getElementById('make-the-bill-btn');

let billBookIdInput = document.getElementById('confirme-id');// book id

let booksNumber = document.getElementById('quantity-number'); // how much books

let finalinfoContainer = document.getElementById('last-info-container');

let finalInfoDiv = document.getElementById('bookinfo-proceed-div');

let reloadGoHome = document.getElementById('go-home-reload-btn');

buyNow.onclick = ()=> {
    let locstArray =  JSON.parse(localStorage.getItem('books'));
    
    if(billBookIdInput.value > 0 
        && booksNumber.value > 0 
        && booksNumber.value.trim()
        &&billBookIdInput.value.trim()){
            
            let theBook = locstArray.filter(arr=>{
                if(arr[0] === billBookIdInput.value){
                    return arr;
                }
            })
            
            
            let quantityBookNumber = parseInt(theBook[0][4])
            // check if the quaintity is bigger than 0
            if(quantityBookNumber > 1){
                // the quantity after bay the book
                let bookQuantity = parseInt(theBook[0][4] - parseInt(booksNumber.value));// final quantity
                
                if(bookQuantity < 0){// if quantity will be less than 0
                    console.log('yes less than 0');
                    // prevent buy proccess
                }else {

                    // continue buy proccess
                    let bookPrice =  parseInt(theBook[0][3]);
                    let booksNum = parseInt(booksNumber.value) ;
                    let thePrice = bookPrice * booksNum;// price
                    
                    // changes localstorage
                    let bookid = billBookIdInput;// id to search in localstorage
                    let thenewArr = []
                    let mybigArr = locstArray.map((arr,index) => {
                        if(arr.includes(bookid.value)){
                            // here changes are done
                            arr.map((vl,inde) => {
                                thenewArr.push(vl);
                                arr[4] = bookQuantity;
                            })
                            arr = thenewArr;
                        }
                        return arr;
                        
                    })
                    localStorage.setItem('books',JSON.stringify(mybigArr))
     
                    finalinfoContainer.classList.add('final-info-active')
                    finalInfoDiv.classList.add('bookinfo-to-proceed-active')

                    // show proceed to checkout div
                    let bookNameShow = theBook[0][1]// book name from local storage
                    let bookAuthorShow = theBook[0][2]// book author
                    let totalPrice = thePrice + " $"// book price

                    let h4BookName = document.createElement('h4');
                    h4BookName.textContent = bookNameShow;

                    let h4AuthorName = document.createElement('h4');
                    h4AuthorName.textContent = bookAuthorShow;

                    let h4TotalPrice = document.createElement('h4');
                    h4TotalPrice.textContent = 'Total: ' + totalPrice;
                    
                    let done = document.createElement('h4');
                    done.textContent = 'done' ;

                    finalInfoDiv.appendChild(h4BookName);
                    finalInfoDiv.appendChild(h4AuthorName);
                    finalInfoDiv.appendChild(h4TotalPrice);
                    finalInfoDiv.appendChild(done);



                    // let proceedBtn = document.createElement('button');
                    // proceedBtn.textContent = 'Proceed To Checkout';

                    // finalInfoDiv.appendChild(proceedBtn);
                }

        }
    }

}

let goHomeBtn = document.getElementById('go-home');// go to main page
goHomeBtn.onclick = ()=>{
    let allLastInfoDivs = document.querySelectorAll('#reciet-div .single-book-bay');

    allLastInfoDivs.forEach(div => {
        div.remove()
    })
    
    recietDiv.style.display = 'none';
    billBookIdInput.value = '';
    booksNumber.value = '';

    // reciete animation
    recietDiv.classList.remove('reciet-div-anime')
}

reloadGoHome.onclick = ()=> {
    finalInfoDiv.innerHTML = '';
    finalinfoContainer.classList.remove('final-info-active');
    window.location.reload()
}

///\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//  Log In && Create Account
let headerLoginBtn = document.getElementById('header-loginBtn');

let headerCreateUserBtn = document.getElementById('header-create-accBtn');

let logInForm =  document.getElementById('log-in-form');

let createUserForm =  document.getElementById('create-users-form');


headerLoginBtn.onclick = ()=>{// show log in form
    createUserForm.style.display = 'none';
    logInForm.style.display = 'flex';
}

headerCreateUserBtn.onclick = ()=>{ // show create user form
    logInForm.style.display = 'none';
    createUserForm.style.display = 'flex';
}


////////////////// Create Account Function \\\\\\\\\\\\\\\\\\\\\
let newUserNameInput = document.getElementById('user-name-cr-acc');// input
let newUserPasswordInput = document.getElementById('password-cr-acc');// input
let createUserBtn = document.getElementById('create-accnt-btn');

createUserBtn.onclick = (e)=>{
    e.preventDefault()
    let newUser = {userName:newUserNameInput.value,passowrd:newUserPasswordInput.value};

    // validate inputs
    if(newUserNameInput.value.trim()&&newUserPasswordInput.value.trim()){
            // get the old users
            let oldUsers = JSON.parse(localStorage.getItem('users'));
    
            localStorage.setItem('users',JSON.stringify([...oldUsers,newUser]))
            newUserNameInput.value = '';
            newUserPasswordInput.value = '';
    }
}


////////////////// Log In Function \\\\\\\\\\\\\\\\\\\\\
let createUserContainer = document.getElementById('create-user-container');
let storeContainer = document.getElementById('store-container');
let logInUserNameInput = document.getElementById('user-name-login');// input
let logInPasswordInput = document.getElementById('password-login');// input
let logInBtn = document.getElementById('login-btn');


    
let truevar;
logInBtn.onclick = (e)=>{
    e.preventDefault();

    if(logInUserNameInput.value.trim()&&logInPasswordInput.value.trim()){// validate
        // get array of users
        let userArray = JSON.parse(localStorage.getItem('users'));
        userArray.map(userobj=>{
            //validate users
            if(logInUserNameInput.value === 'admin' 
            && logInPasswordInput.value === 'admin'){// validate admin
                // show admin handles
                bookHeader.style.display = 'block';
                storeContainer.style.display = 'block';
                createUserContainer.style.display = 'none';
                // asign a truevar to true
                truevar = true;

                }else if(userobj.userName === logInUserNameInput.value 
                    && userobj.passowrd === logInPasswordInput.value) {
                    storeContainer.style.display = 'block';
                    createUserContainer.style.display = 'none';
            }else {
                console.log('user not exist');
            }
        });
    }
    logInUserNameInput.value = ''
    logInPasswordInput.value = ''
}

let edtiaccess = (editbtn)=>{
    if(truevar){
        editbtn.classList.remove('edit-btn-hidden')
        }
}