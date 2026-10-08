const form = document.querySelector('#form'), description = document.querySelector('#description'), amountInput = document.querySelector('#amount'), list = document.querySelector('#expenses');
let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
const money = value => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR' }).format(value);
function render() {
  list.replaceChildren(); let total = 0;
  expenses.forEach((expense, index) => {
    total += expense.amount; const li = document.createElement('li'), name = document.createElement('span'), value = document.createElement('span'), remove = document.createElement('button');
    name.textContent = expense.description; value.textContent = money(expense.amount); remove.textContent = 'Remove'; remove.className = 'remove';
    remove.addEventListener('click', () => { expenses.splice(index, 1); save(); }); li.append(name, value, remove); list.append(li);
  });
  document.querySelector('#total').textContent = money(total); document.querySelector('#empty').hidden = expenses.length > 0;
}
function save() { localStorage.setItem('expenses', JSON.stringify(expenses)); render(); }
form.addEventListener('submit', event => { event.preventDefault(); const value = Number(amountInput.value), name = description.value.trim(); if (!name || !Number.isFinite(value) || value <= 0) return; expenses.push({ description: name, amount: value }); form.reset(); save(); });
document.querySelector('#clear').addEventListener('click', () => { expenses = []; save(); }); render();
