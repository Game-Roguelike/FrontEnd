export function fetchEnemy() {
  fetch('http://localhost:8080/game/level/generate?type=Normal')
    .then(response => response.json())
    .then(data => {
      const name = data.enemy.name;
      const sprite = data.enemy.sprite;
      const hp = data.enemy.hp;

      document.getElementById('enemyName').textContent = data.enemy.name;

      const nameElem = document.querySelector('.enemyName');
      if (nameElem) nameElem.textContent = name;

      const hpElem = document.querySelector('.enemyHealth');
      if (hpElem) hpElem.textContent = `${hp}/${hp}`;

      const spriteElem = document.querySelector('.enemySprite');
      if (spriteElem) spriteElem.src = `http://localhost:8080/game/image?path=${sprite}`;
    })
    .catch(error => console.error('Error:', error));

}

