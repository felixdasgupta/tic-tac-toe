"use strict"

const tableStr1 = `ui sortable celled table`,
strictIsoParse = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ"),
loadingData = `<div class="aic_loading"><img src="${window.loadingIcon}" alt="" /></div>`;

let DV01 = {
    opts: {
        alldata: [],
        container: "view",
        dataPath: "./src/data/articles.csv"
    },
    config: {}, // Empty object to accept config options from dev
    setOpts: function(){ // Apply any options set by the config
      this.opts = $.extend({}, this.opts, this.config);
    },
    extractData: function(csv_path, name, tableLocation, tableID, primary, values){
      let processdata = this.processTableData;
      d3.csv(csv_path, function(dataJSON) {
        console.log(dataJSON);
        let _table = new DVO1_X(tableID, dataJSON, name, processdata);
        _table.drawTable(tableStr1, tableLocation);
        DV01.buildCharts(dataJSON);
      });
    },
    processTableData: function(data){
      let alldata = _.map(data, function(d){
        //var outcome = d.outcome == 1 ? "Like" : "Dislike";
        return {
          "User Type": d.user_type,
          "Article ID": d.article_id,
          "Article Type": d.article_type,
          "Headline": d.content,
          "Outcome": d.outcome,
          "Sentiment": d.label,
          "Confidence": d.confidence,
        }
      });
      //console.log(alldata);
      return alldata;
    },
    buildCharts: function(dataJSON) {
      let barChartData = this.processBars(dataJSON);
      this.drawBars("chart1", barChartData);

      let pieData = this.processPie1(dataJSON);
      this.drawPieA("chart2", pieData);

      let pieData2 = this.processPie2(dataJSON);
      this.drawPieB("chart3", pieData2);
    },
    processBars: function(dataJSON){
      let groupA = ["A"],
      groupB = ['B'],
      xsA = ["xA"],
      xsB = ["xB"];
      _.each(dataJSON, (o) => {
        console.log(o.user_type);
        if (o.user_type == 2) {
          groupA.push(o.sentiment);
          xsA.push(o.confidence);
        } else {
          groupB.push(o.sentiment);
          xsB.push(o.confidence);
        }
      });
      let columns = [groupA, xsA, groupB, xsB];
      console.log(columns);
      return columns
    },
    drawBars: function(loc, data){

      this.barChart = c3.generate({
          bindto: `#${loc}`,
          data: {
            xs: {
                A: 'xA',
                B: 'xB',
            },
            columns: data,
            type: 'scatter'
          },
          tooltip: {
            format: {
              // title: function (x) {
              //     return `${yTitle}`;
              // },
              name: function (name, ratio, id, index) { return name; },
              value: function (value, ratio, id, index) {
                  return value;
              }
            }
          },
          axis: {
              y: {
                label: 'Sentiment'
              },
              x: {
                  label: 'Confidence',
                  tick: {
                      fit: false
                  }
              }
          }
      });
    },
    processPie1: function(dataJSON, field){
      let groups = _.groupBy(dataJSON, (o) => o.user_type);
      //console.log(groups[0]);
      var sizeA = _.size(groups[0], (o) => o[field]),
      sizeB = _.size(groups[1], (o) => o[field]);

      let groupA = ["A", 1217],
      groupB = ['B', 1217];

      let data = [groupA,groupB]
      console.log(data)
      return data;
    },
    drawPieA: function(loc, data){
      let pieChartA = c3.generate({
          bindto: `#${loc}`,
          data: {
            columns: data,
            type: 'pie'
          }
      });
    },
    processPie2: function(dataJSON, field){
      let groups = _.groupBy(dataJSON, (o) => o.outcome);

      var sizeA = _.size(groups[0], (o) => o[field]),
      sizeB = _.size(groups[1], (o) => o[field]);

      let groupA = ["Likes", sizeA],
      groupB = ['Dislikes', sizeB];

      let data = [groupA,groupB]
      return data;
    },
    drawPieB: function(loc, data){

      let pieChartB = c3.generate({
          bindto: `#${loc}`,
          data: {
            columns: data,
            type: 'pie'
          }
      });
    },
    startExp: function(){
      this.extractData(this.opts.dataPath, "Articles", "tables", "_table", [], []);
    },
    init: function(){
      this.setOpts();
      this.startExp();
    }
};


DV01.init();


let UX = {
  opts: {
  },
  config: {}, // Empty object to accept config options from dev
  setOpts: function(){ // Apply any options set by the config
    this.opts = $.extend({}, this.opts, this.config);
  },
  init: function(){
    this.setOpts();
    $("#continue").fadeOut();
    $("#article").hide();
    $("#SAM").show();
  },
  generate: function(){
    $("#ABTesting").show();
  }
}

$("#continue").on("click", function(){
  UX.init();
})

$("#generate").on("click", function(){
  UX.generate();
})