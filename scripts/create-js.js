let ques_ans = [];
let index=0;
let quiz_names = JSON.parse(localStorage.getItem('custom_names'))||[];
function addtoList(){
    const question = document.querySelector('.Question-container').value;
    let answers=[];
    const options = document.querySelectorAll('.opt-container');
    options.forEach(option=>{
        answers.push({
            a: option.value,
            crct:(option.previousElementSibling).checked
        })
    })
    ques_ans.push({
        question,
        answers
    })
}
function checkfill(val){
    if(val){
        document.querySelector('.quiz_name').classList.add('req');
    }
    let f=true;
    const inputs = document.querySelectorAll('.req');
    inputs.forEach(input=>{
        console.log(input.value);
        const exists = input.nextElementSibling;
        if(exists && exists.classList.contains('warning')){
            exists.remove();
        }
        if(input.value===''){
            input.insertAdjacentHTML('afterend', `<p class="warning">This field is Required</p>`); 
            f=false;
        }
    })
    const qs = document.querySelector('.Question-container');
    if(qs.value===''){
        qs.classList.add('required');
        f=false;
    }
    else{
        if(qs.classList.contains('required')){
            qs.classList.remove('required');
        }
    }
    return f;
}
updateInput();
function updateInput(){
    document.querySelector('.right-section').innerHTML=
    `
    <div class="top-section">
    <div class="qn-no">${index+1}</div>
    <input class="Question-container" placeholder="Enter question">
    </div>
    <div class="options-container flex">
    <div class="options flex">
    <input class="radioBtn" name="ans" type="radio" >
    <input class="opt-container req" placeholder="Enter Option" >
    </div>
    <div class="options flex">
    <input class="radioBtn" name="ans" type="radio" >
    <input class="opt-container req" placeholder="Enter Option" >
    </div>
    <div class="options flex">
    <input class="radioBtn" name="ans" type="radio" >
    <input class="opt-container req" placeholder="Enter Option" >
    </div>
    <div class="options flex">
    <input class="radioBtn" name="ans" type="radio" >
    <input class="opt-container req" placeholder="Enter Option" >
    </div>  
    </div>
    <div class="buttons flex">
    <button class="add btns">Add </button>
    </div>
    `
    const addBtn = document.querySelector('.add');
    addBtn.addEventListener('click',()=>{
        if (checkfill(false)){
            addtoList();
            console.log(ques_ans);
            updateInput();
        }
    });
    index+=1;
}

const subBtn = document.querySelector('.sub');
subBtn.addEventListener('click',()=>{
    
    if (checkfill(true)){
        addtoList();
        const quiz_name_fr = document.querySelector('.quiz_name');
        quiz_names.push(quiz_name_fr.value);
        localStorage.setItem('custom_names',JSON.stringify(quiz_names));
        localStorage.setItem(`${quiz_name_fr.value}`,JSON.stringify(ques_ans));
        window.location.href="homepage.html";
        const names = JSON.parse(localStorage.getItem('scores'));
        names.push({
            mode:quiz_name_fr.value,
            score:0,
            highscore:0
        })
        localStorage.setItem('scores',JSON.stringify(names));
    }
});

document.querySelector('.back').addEventListener('click',()=>{
    window.location.href="homepage.html";
})