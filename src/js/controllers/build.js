"use strict"

let TicTacToe = {
    opts: {
        container: "view",
        start: "start_game"
    },
    config: {}, // Empty object to accept config options from dev
    setOpts: function(){ // Apply any options set by the config
      this.opts = $.extend({}, this.opts, this.config);
      this.counter = 0;
      this.valX = false;
    },
    drawVal: function(){
      let currentVal = this.valX;
      switch (currentVal) {
        case true:
          this.valX = false;
          $(".player").text("Player One's Turn");
          $(".player").css("color", "coral");
          return "O";
        case false:
          this.valX = true;
          $(".player").text("Player Two's Turn");
          $(".player").css("color", "blue");
          return "X";
      }
    },
    checkValue: function(){
      console.log(this.counter);
      if (this.counter == 9) {
        $(".player").html("");
        $(".player").append(`Game Over, Try Again?`);
        $(".player").css("color", "#FFF")

      }
    },
    buildGame: function(){
      $(".game").html("");
      $(".player").html("");
      $(".player").css("color", "coral")
      for (let i = 0; i < 9; i++) {
        $(".game").append(`<div class="block block-${i}" data-fill=0 data-content=""></div>`);
        $(".player").text("Player One's Turn");
        $(`.block-${i}`).on("click", function(){
          if (!$(this).data("fill")) {
            let value = TicTacToe.drawVal();
            $(this).append(`<span class="${value}">${value}</span>`)
            $(this).data("fill", 1);
            $(this).data("content", value);
            TicTacToe.counter++;
          }
          TicTacToe.checkValue();
        })
      };
      let gameTL = new TimelineMax;
      gameTL.fromTo(".game", 1, {autoAlpha:0}, {autoAlpha:1, ease:Power4.easeOut})
        .staggerFromTo(".block", 1, {autoAlpha:0}, {autoAlpha:1, ease:Power4.easeOut}, 0.15);

    },
    startExp: function(){
      TweenMax.to(".start", 1, {autoAlpha:0, ease:Power4.easeOut});
      this.buildGame();
    },
    init: function(){
      this.setOpts();

      TweenMax.fromTo(".start", 1, {autoAlpha:0}, {autoAlpha:1, ease:Power4.easeOut});

      $(`#${this.opts.start}`).on("click", function(){
        TicTacToe.startExp();
      })
      $(".player").on("click", function(){
        TicTacToe.buildGame();
      })
    }
};




TicTacToe.init();

