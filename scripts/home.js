const quiz_names = JSON.parse(localStorage.getItem('custom_names'))||[];
function fillScore(){
    let scores = [{
        mode:'easy',
        score:0,
        highscore:0
    },{
        mode:'medium',
        score:0,
        highscore:0
    },
    {
        mode:'hard',
        score:0,
        highscore:0
    }];
    quiz_names.forEach((mode)=>{
        scores.push({
            mode:mode,
            score:0,
            highscore:0
        })
    })
    return scores; 
}
let scores = JSON.parse(localStorage.getItem('scores'))||fillScore();
localStorage.setItem('scores',JSON.stringify(scores));
const modes = document.getElementById('name');
if (quiz_names.length>0){

    quiz_names.forEach((mode)=>{
        modes.innerHTML+= `<option class="opt-css" value="${mode}">${mode}</option>`;
    })
}

function update_stars(selected){
    scores.forEach(element => {
        if(element.mode===selected){
            const r = document.querySelector(':root');
            r.style.setProperty('--score_width',`${element.score}`+'%');
        }
        
    });
}
update_stars('easy');
document.querySelector('.play').addEventListener('click',()=>{
    setTimeout(()=>{
        const selected = document.getElementById('name').value;
        localStorage.setItem('gamemode',selected);
        update_stars(selected);
        window.location.href ="quiz-page.html";
    },300)
    
})
document.getElementById('name').addEventListener('change',()=>{
    const selected = document.getElementById('name').value;
    console.log(document.getElementById('name').value);
    update_stars(selected);
})
document.querySelector('.own_quiz').addEventListener('click',()=>{
    window.location.href = "create_quiz.html";
}
)