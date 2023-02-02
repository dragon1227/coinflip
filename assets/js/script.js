const _default_time = 3000;

const _game_state = {
    idle:0,
    count:1,
    calc:2,
    result:3
}

const _default_coin_url = "assets/img/coin-";


var timer = null;

var coin_state = false; //F: front, T: back
var my_state = null;
var cur_time = _default_time;
var cur_state = _game_state.idle;
var cur_bet = 0.001;

$(document).ready(()=>{
    
    var _time_el = $("#time_txt");
    var _coin_el = $("#coin_img");
    var _spin_el = $(".spinner");
    var _bet_front_btn = $("#bet_front");
    var _bet_back_btn = $("#bet_back");
    var _bet_input = $("#bet_input");
    var _bet_input_minus = $("#bet_input_minus");
    var _bet_input_plus = $("#bet_input_plus");
    var _btn_roll_coin = $("#btn_roll_coin");

    _bet_front_btn.click(()=>{
        if (_game_state.count == cur_state){
            _bet_front_btn.addClass ("active");
            _bet_back_btn.removeClass ("active");
            my_state = false;
        }
    });

    _bet_back_btn.click(()=>{
        if (_game_state.count == cur_state){
            _bet_back_btn.addClass ("active")
            _bet_front_btn.removeClass ("active");
            my_state = true;
        }
    });

    _bet_input_minus.click(()=>{
        if (cur_state != _game_state.idle) return;
        if (cur_bet>=0.001) cur_bet -= 0.001;
        cur_bet = Number(cur_bet.toFixed(3));
        _bet_input.val(cur_bet);
    });

    _bet_input_plus.click(()=>{
        if (cur_state != _game_state.idle) return;
        if (cur_bet<=10.001) cur_bet += 0.001;
        cur_bet = Number(cur_bet.toFixed(3));
        _bet_input.val(cur_bet);
    });


    const num2textFunc = (n) => {
        n = Math.floor (n);
        if (n > 99) return 99;
        if (n < 10) return "0"+n;
        else return n;
    }

    const timeDisplayFunc = () => {
        let cur_time_text = num2textFunc(cur_time/1000) + ":" + num2textFunc(cur_time%1000 / 10);
        _time_el.text(cur_time_text);
    }

    const timerFunc = (total) => {
        if (cur_state != _game_state.count) {
            clearInterval(timer);
        }
        cur_time -= 10
        if(cur_time < 0) {
            endTimerFunc ();
            return;
        }
        // if (Math.floor(cur_time/1000)%2) coin_state = !coin_state;
        
        _coin_el.attr ("src", _default_coin_url+(coin_state?"back.png":"front.png"));

        timeDisplayFunc();
    }

    const startTimerFunc = (total) => {
        cur_state = _game_state.count;
        _spin_el.show();
        cur_time = total;
        timer = setInterval(timerFunc, 10, total);
        my_state = null;
    }

    const endTimerFunc = () => {
        cur_state = _game_state.calc;
        clearInterval(timer);
        _spin_el.hide();
        coin_state = Math.random()<0.5;
        _coin_el.attr ("src", _default_coin_url+(coin_state?"back.png":"front.png"));
        if (my_state != null){
            setTimeout(()=>alert (my_state == coin_state ? "WIN":"LOSE"), 1000);
            _time_el.text(my_state == coin_state ? "WIN !":"LOSE !");
        }
        else _time_el.text(coin_state ? "BACK WIN":"FRONT WIN");
        cur_state = _game_state.result;

        cur_state = _game_state.idle;
    }

    _btn_roll_coin.click(()=>{
        if (cur_state != _game_state.idle) return;
        
        startTimerFunc (_default_time);
    });

    _spin_el.hide();

})