import {quiz} from './datas/data.js'

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
console.log(index);
updateHTML();
function updateProgress(){
    const prgBar= document.querySelector('.progress');
    prgBar.style.width = ((index)/quiz_length)*100 + '%';
    
}
window.restart_game = function restart_game(){
    quizShow.classList.remove('finished');
    index=0;
    score=0;
    updateHTML();
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
            quizShow.classList.add('hidden');
            setTimeout(()=>{
                quizShow.innerHTML=`<p class="final-score">You Scored ${score} out of ${quiz_length}</p>
            <button onclick="restart_game()"class="Restart">Restart Game?</button>`;
                quizShow.classList.add('finished');
                quizShow.classList.remove('hidden');
            },500)
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

    