//#region Counts for statistics 
function CountSpecDNumber(diceArray, index)
{
    if(diceArray[index] === 6){sixCount++}else if(diceArray[index] === 2)
        {twoCount++}else if(diceArray[index] === 4){fourCount++};
}

function OneIsAsBigAsOthers(dOne, dTwo, dThree)
{
    if(dOne > dTwo && dOne > dThree)
    {
        if(dOne === dTwo + dThree){return [true,dOne,dTwo,dThree]}else{return[false,0,0,0]};
    }
    else if(dTwo > dOne && dTwo > dThree)
    {
        if(dTwo === dOne + dThree){return[true,dOne,dTwo,dThree]}else{return[false,0,0,0]};
    }
    else
    {
        if(dThree === dOne + dTwo){return[true,dOne,dTwo,dThree]}else{return[false,0,0,0]};
    };
}

function Statistic(diceArray, index)
{
    var key = diceArray[index];
    for(let i = 0; i < numberStatistics.length; i++)
    {
        if(diceArray[i] === numberStatistics[i].key){numberStatistics[i].value++}
    }
}

function LessThrownDice()
{
    var less = 7;
    var lessIndex = 0;
    for(let i = 0 ;i < numberStatistics.length; i++)
    {
        if(numberStatistics[i].value < less){less = numberStatistics[i].value; lessIndex = i;}
    }
    return lessIndex;
}

function AmountStatistics(turnAmount)
{
    var found = false;
    if(amounts.length < 1)
    {
        amounts.push({key: turnAmount,value: 1});
    }
    else
    {
        for(let i = 0; i < amounts.length;i++)
        {
            if(amounts[i].key == turnAmount)
            {
                amounts[i].value++;
                found = true;
            }
        }

        if(!found){amounts.push({key: turnAmount, value: 1})}
    }
}

function MoreThanOneAmounts()
{
    var MTOA = [];
    for(let i = 0; i <amounts.length;i++)
    {
        if(amounts[i].value > 1){MTOA.push(amounts[i].key);};
    }
    return MTOA;
}

function SameSeries()
{
    var found = false;
    
    for(let i = 0; i < A.length; i++)    
    {
        var a = A[i];
        var b = B[i];
        var c = C[i];
        var numbers = [A[i],B[i],C[i]]
        numbers.sort();
        for(let j = 1; j < A.length; j++)
        {
            var numbers2 = [A[j],B[j],C[j]];
            numbers2.sort();
            if(numbers[0] === numbers2[0] && numbers[1] === numbers2[2] &&
                numbers[2] === numbers2[2]){found = true; j = i = A.length-1}
        }
    }
    return found;
}
//#endregion

//#region Claer and Create elements
function CLearFullDiv()
{
    var div = document.getElementById('fullDiv');
    div.remove();
}

function CreateFullDiv()
{
    let div = document.createElement('div');
    div.id = 'fullDiv'
    div.className = 'full';

    document.body.appendChild(div);
}

function CreateOneDivForFull(willBeLoop, givenArray, type, id, taskNumber, question, resultText)
{
    let divRow = document.createElement('div');
    divRow.id = `row${id}`;
    divRow.className = 'row';

    let divCardBody = document.createElement('div');
    divCardBody.id = `card${id}`;
    divCardBody.className = 'col-sm-4 mb-2';

    let h6 = document.createElement('h6');
    h6.className = `h6`;
    h6.id = `h6${id}`;
    h6.textContent = "Feladat " + String(taskNumber+1);
    
    let pQuestion = document.createElement('p');
    pQuestion.id = `question${id}`;
    pQuestion.className = 'question';
    pQuestion.textContent = question;

    let pAnswer = document.createElement('p');
    pAnswer.id = `answer${id}`;
    pAnswer.className = 'answer';

    let data = ``;

    if(willBeLoop)
    {
        if(givenArray.length > 0)
        {       
            for(let i = 0; i < givenArray.length;i++)
            {
                if(type === 1)
                {
                    data = `${givenArray[i][1]} ${givenArray[i][2]} ${givenArray[i][3]}`;
                }
                else if(type === 2)
                {
                    data = `${givenArray[i]}`;
                }

                if(i === 0)
                {
                    pAnswer.textContent = resultText;
                }
                pAnswer.textContent += " " + data + (i === givenArray.length -1 ? "" : " - ");
            }
        }
        else
        {
            pAnswer.textContent = `Nem volt a kérdésnek megfelelő adat.`;
        }
    }
    else
    {
        pAnswer.textContent = resultText;
    }

    if(taskNumber % 3 === 0)
    {
        actualDivRow = document.getElementById('fullDiv').appendChild(divRow);
    }

    document.getElementById(actualDivRow.id).appendChild(divCardBody);
    document.getElementById(divCardBody.id).appendChild(h6);
    document.getElementById(divCardBody.id).appendChild(pQuestion);
    document.getElementById(divCardBody.id).appendChild(pAnswer);
}

function CreateH1(id)
{
    let h1 = document.createElement('h1');
    h1.id = id;
    h1.className = 'h1';
    h1.innerText = "Kockajáték";
    document.getElementById('fullDiv').appendChild(h1);
}

function CreateButton(id)
{
    let div = document.createElement('div');
    div.className = 'center';
    div.innerHTML = `<button id=${id} onclick="NewTurn()" type="button" class="btn btn-primary btn-sm shadow-lg"
    style="margin-top: 10px;">Nyomja meg a gombot az új dobássorozathoz</button>`;
    document.getElementById('fullDiv').appendChild(div);
}

function CreateThemeParagraph(id, taskTheme)
{
    let paragraph = document.createElement('p');
    paragraph.id = id;
    paragraph.className = `p${id}`;
    paragraph.textContent = taskTheme;
    paragraph.style="margin-top: 20px; margin-bottom: 10px; font-weight: bold; color: rgb(50, 179, 63)";
    document.getElementById('fullDiv').appendChild(paragraph);
}

function CreateNavbar(id)
{
    var nav = document.createElement('NAV');
    nav.id = id;
    nav.className = 'nav navbar-light';
    nav.style = 'background-color:rgb(255, 255, 255); border-bottom: 2px solid rgb(5, 61, 196);';

    var a = document.createElement('a');
    a.id = `a${id}`;
    a.className = 'navbar-brand';
    a.href = "#";

    var img = document.createElement('IMG');
    img.id = `img${id}`;
    img.src = 'PatrikLogo.JPG';
    img.className = 'd-inline-block align-top';
    img.alt = 'logo';
    img.height = 60;
    img.width = 200;

    document.getElementById('fullDiv').appendChild(nav);
    document.getElementById(nav.id).appendChild(a);
    document.getElementById(a.id).appendChild(img);
}

function CreateDivs()
{    
    CreateOneDivForFull(false,null,0,'allAVG',0,`Mennyi volt a dobások összegének átlaga?`,
    `A dobássorozat összegének átlaga: ${allThrown/20}`);
    CreateOneDivForFull(false,null,0,'max', 1,`Mennyi volt a dobások összegének maximuma?`,
    `A dobások összegének maximuma ${max} volt.`),
    CreateOneDivForFull(false,null,0,'minOneSix',2,`Hány dobásban fordult elő legalább egy 6-os szám?`,
    `A hatos szám előfordulása körönként ${minOneSix} volt.`);
    CreateOneDivForFull(false,null,0,'allSix',3,`Hányszor fordult elő a 6-os szám a dobások során összesen?`,
    `A hatos dobások összege ${sixCount} volt.`);
    CreateOneDivForFull(false,null,0,'threeSix',4,`Volt-e három 6-ost tartalmazó dobás?`,
    `${allWereSix ? "Volt" : "Nem volt"} olyan dobás ahol mind a három kocka 6-os volt.`);
    CreateOneDivForFull(false,null,0,'allWereSameCount',5,`Hányszor dobtunk mindhárom kockával azonos számot?`,
    `${allWereSame}` + ` alkalommal fordult elő, hogy minden szám ugyanaz lett volna.`);
    CreateOneDivForFull(true,differentNumbers,2,'allWereDifferent',6,`Melyik dobás eredményezett három különböző számot?`,
    `A következő számok voltak különbözőek:`,);
    CreateOneDivForFull(false,null,0,'twoPercent',7, `A dobások hány százalékában fordult elő valamelyik kockán 2-es?`,
    `A kettesek százalékos megoszlása ${((twoCount / 60) * 100).toFixed(2)} százalék volt.`);
    CreateOneDivForFull(false,null,0,'fourPercent',8,`A dobások hány százalékában fordult elő valamelyik kockán 4-es?`,
    `A négyesek százalékos megoszlása ${((fourCount / 60) * 100).toFixed(2)} százalék volt.`);
    CreateOneDivForFull(false,null,0,'sixPercent',9,`A dobások hány százalékában fordult elő valamelyik kockán 6-os?`,
    `A hatosok százalékos megoszlása ${((sixCount / 60) * 100).toFixed(2)} százalék volt.`);
    CreateOneDivForFull(true,oneIsAsBIg,1,'oneIsAsNewDiv',10,`Volt-e olyan dobás, amikor a legnagyobb számot mutató kocka értéke a másik két kocka értékének összege lett? Ha igen, mik voltak ezek a számok?`,
    `A következő dobásoknál fordult elő, hogy a legnagyobb szám a másik kettő összegével egyenlő volt:`);
    CreateOneDivForFull(false,null,0,'lessThrownDice',11,`Összesen melyik számot mutatták a legkevesebbszer a kockák?`,
    `Az összes dobás közül a ${numberStatistics[LessThrownDice()].key} szám szerepelt a legkevesebbszer. (Az első legkisebb)`);
    CreateOneDivForFull(true,MoreThanOneAmounts(),2,'moreThanOneAmounts',12,`Milyen összeg fordult elő többször is?`,
    `A következő dobásösszegek szerepeltek többször mint egy:`);
    CreateOneDivForFull(false,null,0,'sameSeries',13,`Voltak-e egymással egyező dobások? (A kockák sorrendje nem számít.)`,
    `${SameSeries() ? "Volt": "Nem volt"} olyan dobás ahol a számok megeggyeztek volna.`);
}
//#endregion

//#region Main
var actualDivRow;

var A = [];
var B = [];
var C = [];
var oneIsAsBIg = [];
var numberStatistics = [];
var amounts = [];
var differentNumbers = [];

let allThrown = 0;
let max = 0;
let minOneSix = 0;
let sixCount = 0;
let temp = 0;
let allWereSix = false;
let allWereSame = 0;
let twoCount = 0;
let fourCount = 0;

function TurnResults()
{
    A = [];
    B = [];
    C = [];
    oneIsAsBIg = [];
    numberStatistics = [{key:1,value:0},{key:2,value:0},{key:3,value:0},{key:4,value:0},{key:5,value:0},{key:6,value:0}]
    amounts = [];
    differentNumbers = [];
    
    allThrown = 0;
    max = 0;
    minOneSix = 0;
    sixCount = 0;
    temp = 0;
    allWereSix = false;
    allWereSame = 0;
    twoCount = 0;
    fourCount = 0;

    for(let i = 0; i < 20; i++)
    {
        A[i] = Math.floor(Math.random() * 6) + 1;
        B[i] = Math.floor(Math.random() * 6) + 1;
        C[i] = Math.floor(Math.random() * 6) + 1;
        
        var turnAmount = A[i] + B[i] + C[i];
        
        temp = sixCount;
        allThrown += turnAmount;
        max = turnAmount > max ? turnAmount : max;
        AmountStatistics(turnAmount);
        
        CountSpecDNumber(A, i);
        CountSpecDNumber(B, i);
        CountSpecDNumber(C, i);

        if(A[i] !== B[i] && A[i] !== C[i] && C[i] !== B[i]){differentNumbers.push(A[i] + " " + B[i] + " " + C[i])}; 
        
        if(temp !== sixCount){minOneSix++};
        allWereSix = allWereSix === false ? sixCount - temp === 3 : true;
        if(Math.pow((A[i] * B[i] * C[i]),1/3) === A[i]){allWereSame++};
        var tempOneIsAsBig = OneIsAsBigAsOthers(A[i],B[i],C[i]);
        if(tempOneIsAsBig[0]){oneIsAsBIg.push(tempOneIsAsBig)}
        
        Statistic(A,i);
        Statistic(B,i);
        Statistic(C,i);
    }
}

function NewTurn()
{
    CLearFullDiv();
    TurnResults();
    CreateFullDiv();
    CreateNavbar('navbar');
    CreateThemeParagraph('mainText','Ez az oldal egy 3 kockával elvégzett 20 dobássorozatnak a statisztikáit mutatja.');
    CreateDivs();
    CreateButton('buttonNewTurn');
}

document.getElementById("buttonNewTurn").onclick = NewTurn;
//#endregion




