$(function() {
 let work = 25;
 let brk = 5;
 let on = false;
  
  function show(x, id) {
    if (x > 59) {
      $(id).text(x % 60 > 9 
        ? Math.floor(x / 60) + " :" + x % 60 + ':00'
        : Math.floor(x / 60) + " :0" + x % 60 + ':00'
        );
    }
    else {$(id).text(x + ':00');}
  }
  
  let timer = function() {
    let session = work * 60;
    let rest = brk * 60;
    
    let countdown = function (length, id) {
      let i = setInterval(() => {
        $(".btn").addClass("disabled");
        $('#start').attr('disabled','disabled');
        length --;
      
        let hrs = Math.floor(length / 60 / 60);
        let min = Math.floor(length / 60) % 60;
        let sec =  Math.floor(length % 60);
        let time = (hrs > 0 ? hrs + ":" : "") + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        $(id).text(time);
      
        if (length <= 0) {
          let sound = new Audio("Beep-beep-beep.mp3");
          sound.play();
		  clearInterval(i);
            if (on) {
              countdown(rest, "#rClock");
              on = false;
              $("#colR").css({'background-color' : 'rgba(242, 242, 242, 0.4'});
              $("#colW").css({'background-color' : 'transparent'});
            }
            else {
              countdown(session, "#wClock");
              on = true;
              $("#colW").css({'background-color' : 'rgba(242, 242, 242, 0.4'});
              $("#colR").css({'background-color' : 'transparent'});
            }
      }
      
        $("#reset").click(() => {
          clearInterval(i);
          $(".btn").removeClass("disabled");
          $('#start').removeAttr('disabled');
          work = 25;
          brk = 5;
          show(work, "#wClock");
          show(brk, "#rClock");
          $("#colR, #colW").css({'background-color' : 'transparent'});
        });
      }, 1000);
    }
                           
    countdown(session, "#wClock");
    on = true;
    $("#colW").css({'background-color' : 'rgba(242, 242, 242, 0.4'});
  }
  
  $("#start").click(timer);
  $("#about").click(() => {
    window.open("https://en.wikipedia.org/wiki/Pomodoro_Technique");
    return false;
  });
  $("#wp").click(() => {
    work++;
    show(work, "#wClock");
  });
  $("#wm").click(() => {
    work--;
    if (work < 1) work = 1;
    show(work, "#wClock");
  });
  $("#bp").click(() => {
    brk++;
    show(brk, "#rClock");
  });
  $("#bm").click(() => {
    brk--;
    if (brk < 1) brk = 1;
    show(brk, "#rClock");
  });
})