function total_amount(bill, tip_percentage=15, numb_people=1){
    return tip_amount(bill, tip_percentage) * numb_people;
}
function tip_amount(bill, tip_percentage=15){
    return bill * (tip_percentage/100);
}
function bill_valid(bill){
    if (bill > 0){
        return true
    }
    return false;
}

function numb_people_valid(numb_people){
    if (numb_people > 0){
        return true
    }
    return false;
}
function percent_valid(percent){
    if(percent >= 0){
        return true;
    }
    return false;
}
function all_data_valid(bill, numb_people, percent_tip){
    if (bill_valid(bill) && percent_valid(percent_tip) && numb_people_valid(numb_people)){
        return true;
    }
    return false;
}

function validate_bill(){
    let bill = document.getElementById('bill-input').value;
    if(!bill_valid(bill)){
        document.getElementById('billError').style.display = 'inline';
        document.getElementById('bill-input').setAttribute("class", "error");
    }
    else{
        document.getElementById('billError').style.display = 'none';
        document.getElementById('bill-input').removeAttribute('class')
    }
    console.log("bill = "+bill)
}
function validate_numb_people(){
    let numb_people = document.getElementById('numb-people').value;
    if(!numb_people_valid(numb_people)){
        document.getElementById('peopleError').style.display = 'inline';
        document.getElementById('numb-people').setAttribute("class", "error");
    }
    else{
        document.getElementById('peopleError').style.display = 'none';
        document.getElementById('numb-people').removeAttribute('class');
    }
}
function validate_percent(){
    let percent = document.getElementById('custInput').value;
    if(!percent_valid(percent)){
        document.getElementById('custInput').setAttribute("class", "error percent-btn cust-input");
    }
    else{
        document.getElementById('custInput').setAttribute("class", "percent-btn active cust-input");
    }
}
function make_active(ele){
    document.querySelectorAll(".tip-percent input").forEach(function (element){
        if(ele.class == "cust-input"){
            element.removeAttribute('class');
            element.setAttribute("class", "percent-btn cust-input");
        }
        else if (ele != element){
            element.removeAttribute('class');
            element.setAttribute("class", "percent-btn");
        }
        else{
            element.setAttribute("class", "percent-btn active");
        }
    });
}
function removed_last(percent){
    if (typeof percent == "string"){
        return percent.replace('%', '');
    }
    return tip;
}
function display_summary(){
    let bill = document.getElementById('bill-input').value;
    let numb_people = document.getElementById('numb-people').value;
    let percent = document.getElementById('custInput').value;
    /* SEARCH FOR ACTIVE TIP PECENTAGE */
    document.querySelectorAll(".tip-percent input").forEach(function (element){
        let style_class = element.getAttribute("class");
        if (style_class.search("active") != -1){
            percent = element.value;
        }
    }); 
    percent = removed_last(percent);   
    if (all_data_valid(bill, numb_people, percent)){
        document.getElementById('tipAmount').innerHTML = "$"+tip_amount(bill, percent).toPrecision(3);
        document.getElementById('totalTip').innerHTML = "$"+total_amount(bill, percent, numb_people).toPrecision(3);
    }
    else{
        console.log("Ther is any missing data!")
    }
}

function reset(){
    document.getElementById('bill-input').value = "";
    document.getElementById('numb-people').value = "1";
    document.getElementById('custInput').value = "";
    document.getElementById('tipAmount').innerHTML = "$0.00";
    document.getElementById('totalTip').innerHTML = "$0.00";
    document.querySelectorAll(".tip-percent input").forEach(function (element){
        element.removeAttribute('class');
        if(element.class == "cust-input"){
            element.setAttribute("class", "percent-btn cust-input");
        }
        else{
            element.setAttribute("class", "percent-btn");
        }
    });
    document.getElementById('defBtn').setAttribute("class", "percent-btn active");
}