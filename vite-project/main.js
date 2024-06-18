import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>ToDo - List</h1>
    <div class="todoContainer">
        <form id="todoForm">
            <label>Treść zadania:
                <input class="input" type="text" id="todoInput" name="todoInput" placeholder="Wpisz treść zadania...">
            </label>
            <div class="selectGroup">
                <label for="groups">Wybierz ważność zadania:</label>
                <select id="groups" name="groups">
                    <option value="important">Ważne</option>
                    <option value="neutral">Pozostałe</option>
                </select>
            </div>
            <button type="submit" class="button">Dodaj</button>
        </form>
    </div>
    <div class="list">
        <div class="checkboxContainer">
            <input type="checkbox" id="checkAll" name="checkAll" />
            <label for="checkAll">Zaznacz wszystkie</label>
        </div>
        <h3>Ważne</h3>
        <ul class="list-group" id="todoListImportant"></ul>
        <h3>Pozostałe</h3>
        <ul class="list-group" id="todoListNeutral"></ul>
    </div>
`

setupCounter(document.querySelector('#counter'))
