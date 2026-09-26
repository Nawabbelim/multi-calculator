const calculators = document.querySelectorAll("#Sub1, #Sub2, #Sub3, #Sub4");

const clearh = document.querySelector("#clearh");
const historyBox = document.querySelector("#history");
let currentHistory;
let currentHistoryKey;
let notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.forEach((item) => {
  const note = document.createElement("p");
  note.innerHTML = item;

  const deln = document.createElement("button");
  deln.innerHTML = "Delete";

  deln.addEventListener("click", () => {
    notes.splice(notes.indexOf(item), 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    note.remove();
  });

  note.append(deln);
  document.querySelector("#notes").append(note);
});

calculators.forEach((calc) => {
  let str = "";
  let history = JSON.parse(localStorage.getItem(calc.id)) || [];
  const input = calc.querySelector(".display");
  const btn = calc.querySelectorAll("button");
  const btnnote = calc.querySelector(".note");
  const pastbtn = calc.querySelector(".Past");

  clearh.addEventListener("click", () => {
    if (currentHistory) {
      currentHistory.length = 0;
      localStorage.removeItem(currentHistoryKey);
      historyBox.innerHTML = "<h3>History</h3>";
    }
  });
  btnnote.addEventListener("click", () => {
    const note = document.createElement("p");
    note.innerHTML = input.value;
    notes.push(input.value);
    localStorage.setItem("notes", JSON.stringify(notes));
    const deln = document.createElement("button");
    deln.innerHTML = "Delete";

    deln.addEventListener("click", () => {
      notes.splice(notes.indexOf(input.value), 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      note.remove();
    });

    note.append(deln);
    document.querySelector("#notes").append(note);
  });

  pastbtn.addEventListener("click", () => {
    currentHistory = history;
    currentHistoryKey = calc.id;

    historyBox.innerHTML = "<h3>History</h3>";
    if (history.length == 0) {
      const p = document.createElement("p");
      p.innerHTML = "No History yet";
      historyBox.append(p);
    }
    history.forEach((item) => {
      const pp = document.createElement("p");
      pp.innerHTML = item;
      historyBox.append(pp);
    });
    if (window.innerWidth <= 600) {
      historyBox.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });
  btn.forEach((b) => {
    b.addEventListener("click", (e) => {
      if (e.target.innerHTML == "=") {
        const ans = eval(str);
        history.push(str + " = " + ans);
        localStorage.setItem(calc.id, JSON.stringify(history));
        str = ans;
        input.value = str;
      } else if (e.target.innerHTML == "C") {
        str = "";
        input.value = "";
      } else if (e.target.innerHTML == "Del") {
        str = str.substring(0, str.length - 1);
        input.value = str;
      } else if (e.target.innerHTML == "%") {
        str += "/100";
        input.value = str;
      } else if (e.target.innerHTML == "Note") {
        return;
      } else if (e.target.innerHTML == "Past") {
        return;
      } else {
        str += e.target.innerHTML;
        input.value = str;
      }
    });
  });
  input.addEventListener("input", () => {
    str = input.value;
  });

  input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      const ans = eval(str);
      history.push(str + " = " + ans);
      localStorage.setItem(calc.id, JSON.stringify(history));
      str = ans;
      input.value = str;
    }
  });
});
