"use strict"

const format = d3.time.format("%Y");
const yaxis = d3.format(',');

function DVO1_X(id, data, name, process){
    var dataJSON = process(data);
    this.id = id;
    this.data = dataJSON;
    this.columns = _.keys(dataJSON[0]);
    this.name = name;
    //console.log(dataJSON)
}

DVO1_X.prototype.drawTable = function(tablesClasses, locationDiv) {
    var id_table = this.id, data = this.data, columns = this.columns, titleString = `${this.name} Table` ;
    var $X = $("#"+locationDiv);
    $X.append(`<table id="${id_table}" class="ui ${tablesClasses}"><thead><tr></tr></thead><tbody></tbody><tfoot><tr></tr></tfoot></table>`);
    var $Table = $("#"+id_table),
    $TableHead = $Table.find("thead"),
    $TableBody = $Table.find("tbody"),
    $TableFoot = $Table.find("tfoot");
    createHeader($TableHead, columns);
    var colspan = columns.length;
    data.forEach(function(d){
        var body = createBody(d);
        $TableBody.append(`<tr>${body}</tr>`);
    })
    $('table').tablesort();
    //headerTable(id_table, titleString, data.length);
    $(`#${id_table}`).DataTable();
}

function createHeader(tableHead, columns){
    var $iter = tableHead.find("tr");
    columns.forEach(function(d){
        $iter.append(`<th>${d}</th>`);
    })
}

function createBody(data){
    var dataContents = _.values(data);
    var bodyStr = "";
    dataContents.forEach(function(d){
        bodyStr += `<td>${d}</td>`;
    })
    return bodyStr;
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


function headingHTML(titleString, total){
    let t_header = titleString.split(" ").join("_").toLocaleLowerCase()
    return `<div class="row">
        <div class="ui stackable two column grid left floated">
            <div class="ui column">
                <div class="table_header">
                </div>
            </div>
        </div>
    </div>`
}

function headerTable(tableID, titleString, total){
    let html_header = headingHTML(titleString, total);
    $(`#${tableID}`).before(html_header);
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////



