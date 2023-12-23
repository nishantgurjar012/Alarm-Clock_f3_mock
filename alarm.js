let form = document.getElementById("time_input_form");
let timers_list = document.getElementById("timers_list");
let myaudio = new Audio();
let current_timer_count = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");
  let hh = Number(form.hours.value),
    mm = Number(form.minutes.value),
    ss = Number(form.seconds.value);
  if (hh == 0 && mm == 0 && ss == 0) {
    alert("Please Enter Time!");
    return;
  }

  console.log(hh, mm, ss);
  list_item(hh, mm, ss);
  current_timer_count += 1;
  form.reset();
});

function list_item(hh, mm, ss) {
  let timer_list_P = document.querySelector("#timers_list>p");
  timer_list_P.classList.add("hide");

  let list_item_div = document.createElement("div");
  list_item_div.classList.add("time_container");
  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }

  list_item_div.innerHTML = `   <p>Left Time:</p>
                                <div id="hhmmss_div">
                                    <div id="hrs_div">${hh}</div>:
                                    <div id="min_div">${mm}</div>:
                                    <div id="sec_div">${ss}</div>
                                </div>
                                <button onclick="delete_time()" id="timer_delete">Delete</button>
                            `;

  const total_time_till_zero = hh * 3600 + mm * 60 + ss;
  console.log(total_time_till_zero);
  timers_list.appendChild(list_item_div);

  start_timer(list_item_div, total_time_till_zero);
}

function start_timer(list_item_div, total_time_till_zero) {
  let hrs_div = list_item_div.querySelector("#hrs_div");
  let min_div = list_item_div.querySelector("#min_div");
  let sec_div = list_item_div.querySelector("#sec_div");

  const timeOver = setInterval(() => {
    list_item_div.setAttribute("data-clear", `${timeOver}`);
    if (total_time_till_zero == 0) {
      myaudio.src =
        "./assets/Bas Tu Bhag Milkha - Bhaag Milkha Bhaag ! Hindi.mp3";
      list_item_div.classList.toggle("time_up");
      list_item_div.innerHTML = `
                                        <span>Time Is Up!</span>
                                        <button onclick="stop_music()" id=stop_timer>Stop</button>
                 
                                   `;
      myaudio.play();
      clearInterval(timeOver);
    } else {
      --total_time_till_zero;
      hrs_div.innerText =
        Math.floor(total_time_till_zero / 3600) < 10
          ? "0" + Math.floor(total_time_till_zero / 3600)
          : Math.floor(total_time_till_zero / 3600);
      min_div.innerText =
        Math.floor((total_time_till_zero % 3600) / 60) < 10
          ? "0" + Math.floor((total_time_till_zero % 3600) / 60)
          : Math.floor((total_time_till_zero % 3600) / 60);
      sec_div.innerText =
        total_time_till_zero % 60 < 10
          ? "0" + (total_time_till_zero % 60)
          : total_time_till_zero % 60;
    }
  }, 1000);
}

function stop_music() {
  myaudio.pause();
  let parent = event.target.parentNode.remove();
  current_timer_count -= 1;
  if (current_timer_count == 0) {
    let timer_list_P = document.querySelector("#timers_list>p");
    timer_list_P.classList.remove("hide");
  }
}

function delete_time() {
  current_timer_count -= 1;
  if (current_timer_count == 0) {
    let timer_list_P = document.querySelector("#timers_list>p");
    timer_list_P.classList.remove("hide");
  }
  let parent = event.target.parentNode;
  let clear_id = parent.getAttribute("data-clear");
  console.log(clear_id);
  clearInterval(clear_id);
  parent.remove();

  // console.log(parent);
}
