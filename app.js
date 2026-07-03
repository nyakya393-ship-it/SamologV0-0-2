let battles = JSON.parse(localStorage.getItem("battles")) || [];

function save() {
  localStorage.setItem("battles", JSON.stringify(battles));
}

/* タブ（バグ防止版） */
function switchTab(tab, el) {
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  document.getElementById(tab).classList.add("active");
  el.classList.add("active");
}

/* 追加 */
function addBattle() {
  const result = document.getElementById("resultInput").value.trim();
  const special = document.getElementById("specialInput").value.trim();

  if (!result) return;

  battles.push({ result, special, time: new Date().toLocaleString() });

  save();
  render();
  renderAnalysis();

  document.getElementById("resultInput").value = "";
  document.getElementById("specialInput").value = "";
}

/* 成功判定 */
function isSuccess(result) {
  return result.includes("成功") || result.includes("オカシラ失敗");
}

/* 削除 */
function deleteBattle(index) {
  if (!confirm("削除する？")) return;

  battles.splice(index, 1);
  save();
  render();
  renderAnalysis();
}

/* 表示 */
function render() {
  const list = document.getElementById("battleList");
  list.innerHTML = "";

  battles.forEach((b, i) => {
    const ok = isSuccess(b.result);

    const li = document.createElement("li");

    li.innerHTML = `
      ${b.result}
      <span class="badge ${ok ? "success" : "fail"}">
        ${ok ? "成功" : "失敗"}
      </span>
      <br>
      ${b.special || "なし"}
      <br>
      <small>${b.time}</small>
      <button onclick="deleteBattle(${i})">削除</button>
    `;

    list.appendChild(li);
  });
}

/* 分析 */
function renderAnalysis() {
  const stats = document.getElementById("stats");

  const total = battles.length;
  const success = battles.filter(b => isSuccess(b.result)).length;

  let html = `
    <h3>全体</h3>
    <p>総数：${total}</p>
    <p>成功：${success}</p>
    <p>失敗：${total - success}</p>
  `;

  stats.innerHTML = html;
}

/* 初期 */
render();
renderAnalysis();
