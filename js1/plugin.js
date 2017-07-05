var timeOut = null;
var $current;
var $info;
var input;
var hint;
var comment;
var single;
var count=0;
var hCount=0;
var cs;
var commres;
var arr={};
var hin={}
var selectedInput = null
var id;
var commSingle;
(function( $ ) {

$.fn.typefast = function(a){
  $(this).one('click',function(){
    $('body').bodyAppend($(this));
    $(this).css({
        'position': 'relative',
        'top': '-34px',
        'background': 'transparent',
        'padding-left': '11px',
        'font-size': '16px'
    })
    $('<div>').attr({
        name: 'comment',
        class: 'comment'+count
      }).insertAfter($(this));

      // comment=$('.comment'+count+'');
      cs='.comment'+count+'';
      arr[$(this).attr('id')]=cs;
      count=count+1;
    console.log(cs);

  })
  $('input').focusin(function(e) {
  e.preventDefault();
  input=$(this);
  id=$(this).attr('id');
  $(arr[id]).css('display','block')
  comment=$(arr[id]);
  commSingle=arr[id];
  $(hin[id]).css('visibility','visible');
  console.log(input);

  });
  $('input').blur(function() {
  var m=$(this).attr('id');
  // console.log(arr,m);
  $(arr[m]).css('display','none');
  $(hin[m]).css('visibility','hidden');
  })

  $(this).on('keydown',function (e) {

    var _this = $(this);

    clearTimeout(timeOut);
      timeOut = setTimeout(function() {
        var m = _this.val();
        if(e.keyCode==38 || e.keyCode==40){
          e.preventDefault();
          // $('.info1').css('display','none');
          // $('.loading').css('display','none');


          ui.keyarrow(e);
        }
        else if (e.keyCode == 13) {
          e.preventDefault();
          // $('.comment').css('display','none');
          // $('.info').css('display','none');
          // $('.info1>.information').css('display','block');
          // $('.result').val('');
          ui.enterKey(e);
        }
        else if (e.keyCode==9) {
          e.preventDefault();
        }
        else if (e.keyCode==8) {

          // $('.info').css('display','none');
          // $('.info1>.information').css('display','none');
          // $('.result').val('');
          // $('.loading').css('display','none');
          // $('.comment').css('display','none');

        }
        else{
        // console.log(  arr);
        e.preventDefault();
        api.searchResult(m,e,a);

        console.log();

          // console.log(ui.hint.val());
        }


        // console.log(ui.input);

        // console.log(cs);
        // console.log(m);
    },0);


  })
  $.fn.bodyAppend=function(m) {
    $(window).ready(function() {
      $('<input>').attr({
          type: 'text',
          name: 'input1',
          class: 'form-control',
          id:'result'+hCount,

        }).insertBefore(m);
        $('#result'+hCount).css({
          'color':'#9a9191',
          'padding-left': '11px',
          'font-size':'16px',
          'letter-spacing': 'inherit',
          'width':'100%'
      });
        hint=$('#result'+hCount)
        hin[id]=hint;
        hCount=hCount+1;


    })
  }
};

}( jQuery ));

var Events=function(){
   }
Events.prototype={
  constructor:Events,
  currentKey:function(e){

     var isFirst=false;
     var a =$('.single');
    //  var b =$('.info >.information');
     for (var i = 0; i < a.length; i++) {
       if($(a[i]).css('background-color')=="rgb(255, 255, 0)"){
         isFirst=false;
         $current=$(a[i]);
        //  $info=$(b[i]);
         break;
       }
       else{
         isFirst=true;
         $current=$(commSingle+'>.single').first();
          // $info=$('.info>.information').first();
       }
     }
     if(e.keyCode==40){
       e.preventDefault();
      var $nextDiv;

      if($current.next().length == 0){
      isFirst = true;
      $current.css('background-color','');
         $current = $nextDiv=$(commSingle+'>.single').first().css('background-color','yellow');
       }
       if(!isFirst){
       $nextDiv=$current.next();
       $current.css('background-color','');
       $nextDiv.css('background-color','yellow');
       $current=$nextDiv;
       input.val($.trim($current.text()));
       hint.val('');
       }
       else
       {
       $current.css('background-color','yellow');
       input.val($.trim($current.text()));
       hint.val('');
       }
     }

      if(e.keyCode==38){
        e.preventDefault();
        var $nextDiv;
        if($current.prev().length==0){
         isFirst=true;
         $current.css('background-color','');
          $current= $nextDiv=$(commSingle+'>.single').last().css('background-color','yellow');

         }
         if(!isFirst){
         $nextDiv=$current.prev();
         e.preventDefault();
         $current.css('background-color','');
         $nextDiv.css('background-color','yellow');

         $current=$nextDiv;
         input.val($.trim($current.text()));
         hint.val('');
         }
         else
         {

         $current.css('background-color','yellow');
         input.val($.trim($current.text()));
         hint.val('');
         }
     }

       if (e.keyCode == 9){
      e.preventDefault()
      input.val($.trim($current.text()));
      hint.val('');

    }


   },
     enterKey:function(e){
     if (e.keyCode == 13) {
       e.preventDefault();
       input.val($.trim($current.text()));
       comment.css('display','none');
        // $info.text();
      // $('.info1>.information').html($info.text());
      // $('.info1>.information').html($info.text());
      // $('.info1').css('display','block');




   };
 },
 highlight:function (k) {
   //console.log($(cs+'>.single').text());
   var z;
   $(commSingle+'>.single').each(function(){
    //  console.log(k);
  z=  $(this).text().replace(RegExp(k, "g"),'<b>'+k+'</b>');
    $(this).html(z)
   });



},
mouseHighlight:function(){
  $(commSingle+'>.single').mouseover(function() {

      $(commSingle+'>.single').css('background-color','');
      $(commSingle+'>.single').prev().css('background-color','');
      // console.log($(cs));
      $(this).css('background-color','yellow');
      $(this).on('click',function(){

        input.val($.trim($(this).text()));
        hint.val('');
        $(this).css('background-color','');


        // console.log($(this).text());
      })


  });
  $(commSingle+'>.single').mouseout(function(){
    $(commSingle+'>.single').css('background-color','');
  });
}
};
var events=new Events();

var Ui = function(events){
  this.input=input;
  this.hint= hint;
  this.comment=comment;
  this.single=$('.single');
  this.result=$(commSingle+'>.single');
  // this.info=$('.info');
  this.events=events;
}
Ui.prototype = {

  constructor:Ui,
  divAppend:function(data){
    var _this =this;
    var div=$("<div>", { "class": "single", "text": data.toLowerCase()});
  comment.append(div);
single=$('.single');
console.log(comment);

  },
  // infoAppend:function (data) {
  //   var _this =this;
  //   // console.log('bingo');
  //
  //   var div1=$("<div>", { "class": "information","text": data.toLowerCase()});
  //   _this.info.append(div1);
  //
  // },
  keyarrow:function(e){
    e.preventDefault();

    events.currentKey(e);


  },
  enterKey:function(e) {
    events.enterKey(e);
  },
  tabKey:function(e){
    events.tabKey(e);
  },
  wordHighlight:function(m){
    events.highlight(m)
  },
  mouse:function(){
    events.mouseHighlight();
  },

  removeChild:function(){
    var _this =this;
      comment.empty();
    },
    // removeInfo:function(){
    //   var _this =this;
    //     _this.info.empty();
    //   }
  };
var ui=new Ui();
var Api=function (ui) {
this.ui=ui;
}
Api.prototype ={
  constructor:Api,
  searchResult:function(keyword,e,a){
    var _this=this;
    if(keyword){
      // console.log(keyword);
      var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ keyword +"&format=json&callback=?";
      $.ajax({
        method:'GET',
        url:url,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success:function(data){

          _this.ui.removeChild();
          // _this.ui.removeInfo();
          if(data[1].length==0){
            // $('.loading').css('display','none');
                     }
          $(hint).val(data[1][1].toLowerCase());
          // console.log($(_this.ui.hint).val());

          for (var i = 0; i < data[1].length; i++) {
            if(i==9){
              break;
              }
              // console.log(data[1].length)
              _this.ui.divAppend(data[1][i+1]);
              // _this.ui.infoAppend(data[2][i+1]);


          }
          console.log(a.hint);
        if(a.textHighlight==true){
            _this.ui.wordHighlight(keyword);
                  }
        if(a.mouseEvent==true){
              ui.mouse();
              }
            }


        })
    }
  }
};
var api=new Api(ui);
