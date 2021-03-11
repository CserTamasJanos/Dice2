//#region Counts for statistics 
function CountSpecDNumber(diceArray, index)
{
    if(diceArray[index] === 6){sixCount++}else if(diceArray[index] === 2){twoCount++}else if(diceArray[index] === 4){fourCount++};
}

function OneIsAsBIgAsOthers(dOne, dTwo, dThree)
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

function CreateDivs()
{    
    CreateOneDivForFull(false,null,0,'allAVG',`A dobássorozat összegének átlaga:${allThrown/20}`);
    CreateOneDivForFull(false,null,0,'max', `A dobások összegének maximuma ${max} volt.`),
    CreateOneDivForFull(false,null,0,'minOneSix',`A hatos szám előfordulása körönként ${minOneSix} volt.`);
    CreateOneDivForFull(false,null,0,'allSix', `A hatos dobások összege ${sixCount} volt.`);
    CreateOneDivForFull(false,null,0,'threeSix',`${allWereSix ? "Volt" : "Nem volt"} olyan dobás ahol mind a három kocka 6-os volt.`);
    CreateOneDivForFull(false,null,0,'allWereSameCount', `${allWereSame}` + ` alkalommal fordult elő, hogy minden szám ugyanaz lett volna.`);
    CreateOneDivForFull(false,null,0,'twoPercent', `A kettesek százalékos megosztlása ${((twoCount / 60) * 100).toFixed(2)} százalék volt.`);
    CreateOneDivForFull(false,null,0,'fourPercent', `A négyesek százalékos megosztlása ${((fourCount / 60) * 100).toFixed(2)} százalék volt.`);
    CreateOneDivForFull(false,null,0,'sixPercent', `A hatosok százalékos megosztlása ${((sixCount / 60) * 100).toFixed(2)} százalék volt.`);
    CreateOneDivForFull(true,oneIsAsBIg,1,'oneIsAsNewDiv',`A következő dobásoknál fordult elő, hogy a legnagyobb szám a másik kettő összegével egyenlő volt:`);
    CreateOneDivForFull(false,null,0,'lessThrownDice',`Az összes dobás közül a ${numberStatistics[LessThrownDice()].key} szám szerepelt a legkevesebbszer. (Az első legkisebb)`);
    CreateOneDivForFull(true,MoreThanOneAmounts(),2,'moreThanOneAmounts',`A következő dobásösszegek szerepeltek többször mint egy:`);  
}

function CreateOneDivForFull(willBeLoop, givenArray, type, id, resultText)
{
    let div = document.createElement('div');
    div.id = id;
    div.className = 'block';
    let data = ``;
    var results = ``;

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
                    results = `<label id="${id}${i}" name="">${resultText}</label></br>`;  
                }
                results += `<label id="${id}${i}" name="">${data}</label><br>`;
            }
        }
        else
        {
            results = `<label id="${id}" name="">Nem volt a kérdésnek megfelelő adat.</label></br>`;
        }
    }
    else
    {
        results = `<label id=${id} name="">${resultText}</label>`;
    }
    div.innerHTML = results;
    document.getElementById('fullDiv').appendChild(div);
}

function CreateH1(id)
{
    let h1 = document.createElement('h1');
    h1.id = id;
    h1.innerText = "Kockajáték";
    document.getElementById('fullDiv').appendChild(h1);
}

function CreateButton(id)
{
    let div = document.createElement('div');
    div.className = 'center';
    div.innerHTML = `<button id=${id} onclick="NewTurn()">Nyomja meg a gombot az új dobássorozathoz</button>`;
    document.getElementById('fullDiv').appendChild(div);
}
//#endregion

//#region Main
var A = [];
var B = [];
var C = [];
var oneIsAsBIg = [];
var numberStatistics = [{key:1,value:0},{key:2,value:0},{key:3,value:0},{key:4,value:0},{key:5,value:0},{key:6,value:0}]
var amounts = [];

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
        
        if(temp !== sixCount){minOneSix++};
        allWereSix = allWereSix === false ? sixCount - temp === 3 : true;
        if(Math.pow((A[i] * B[i] * C[i]),1/3) === A[i]){allWereSame++};
        var tempOneIsAsBig = OneIsAsBIgAsOthers(A[i],B[i],C[i]);
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
    CreateH1('mainTitle');
    CreateDivs();
    CreateButton('buttonNewTurn');
}

document.getElementById("buttonNewTurn").onclick = NewTurn;
//#endregion




