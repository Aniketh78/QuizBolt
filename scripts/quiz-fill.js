const scores = JSON.parse(localStorage.getItem('scores'))
const gamemode = localStorage.getItem('gamemode');
let quiz='';
if(gamemode==='easy'||gamemode==='medium'||gamemode==='hard'){
    const module = await import(`../datas/${gamemode}.js`);
    quiz = module.quiz;
}
else if(gamemode==='rapid'){
    document.querySelector('.container').innerHTML=
    'Still under Development try later! :)'
}
else{
    quiz = JSON.parse(localStorage.getItem(gamemode));
}


const quiz_length = quiz.length;
let index=0;
let score =0;

function createOptions(qns){
    let opts =`<div class="seperator"></div>`;
    qns.answers.forEach((q)=>{
        opts+= `<button class="option ${q.crct?true:false}">${q.a}</button>`;
    })
    opts+=`<button class="submit">NEXT</button>`;
    return opts
}

const quizShow = document.querySelector('.container');
const op = document.querySelector('.options');
let html ='';

updateHTML();
function updateProgress(){
    const prgBar= document.querySelector('.progress');
    prgBar.style.width = ((index)/quiz_length)*100 + '%';
    
}
function set_hs(score){
    let highscore='';
    scores.forEach(element=>{
        console.log('step 1');
        if(gamemode===element.mode){
            console.log(gamemode+element.mode);
            if(element.highscore<score){
                element.highscore=score;
            }
            highscore=element.highscore;
            element.score = ((element.highscore)/quiz_length)*100;
        }

    });
    localStorage.setItem('scores',JSON.stringify(scores));
    return highscore;
}
function updateHTML(){
    
    html=
    `
    <div class="Question-container">
    <div class="qn-cont">
    <button class="Qn-no">${index+1}</button>
    </div>
    <p class="ques" style="display:inline-block">${quiz[index].question}</p>
    </div>
    <div class="options">
    ${createOptions(quiz[index])}
    </div>
    </div>`
    quizShow.innerHTML=html;
    const nextButton = document.querySelector('.submit');
    nextButton.disabled=true;
    if(index===(quiz_length-1)){
        nextButton.innerHTML='SUBMIT';
    }
    updateProgress();
    const progress = document.querySelector
    nextButton.addEventListener('click', () => {
        
        index += 1;
        if(index===quiz_length){
                quizShow.innerHTML=`<p class="final-score">Highscore: ${set_hs(score)}</p><p class="final-score">You Scored ${score} out of ${quiz_length}</p>
            <button onclick="window.location.href='homepage.html'"class="Restart">Home</button>`; 
            quizShow.classList.add('alig');
            updateProgress();
        }
        else{
            updateHTML();
        }
    });
    const Ops = document.querySelectorAll('.option');
    Ops.forEach((btn_clicked)=>{
        
        btn_clicked.addEventListener('click', () => {
            nextButton.disabled=false;
            Ops.forEach((btn) => {
                    btn.disabled = true;
            });
            if(btn_clicked.classList.contains(true)){
                btn_clicked.classList.add('crct');
                score+=1;
            }
            else{
                btn_clicked.classList.add('wrng');
                Ops.forEach((btn) => {
                    if(btn.classList.contains(true)){
                        btn.classList.add('crct');
                    }
                });
            }
            
    })
        
    });
}

    