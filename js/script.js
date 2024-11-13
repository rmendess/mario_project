const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const modal = document.getElementById('game-over-modal');
const restartButton = document.getElementById('restart-button');
const grassBorder = document.querySelector('.grass-border');
const clouds = document.querySelector('.clouds');
const bush = document.querySelector('.bush');
const luigi = document.querySelector('.luigi');
const tree = document.querySelector('.tree');
const koopa = document.querySelector('.koopa');
const plant = document.querySelector('.plant');
const gameBoard = document.querySelector('.game-board');
const bullet = document.querySelector('.bullet');

let score = 0;
let isGameOver = false;
let isLuigiVisible = false;
let isKoopaVisible = false;
let isPlantAnimationStarted = false;
let isBulletAnimationStarted = false;
let isJumping = false; // Variável para verificar se Mario está pulando

const jump = () => {
  if (isGameOver || isJumping) return; // Evita salto duplo se já estiver pulando

  isJumping = true; // Define que Mario está pulando
  mario.classList.remove('jump');

  requestAnimationFrame(() => {
    mario.classList.add('jump');
  });

  setTimeout(() => {
    if (mario.classList.contains('jump')) {
      mario.classList.remove('jump');
    }
    isJumping = false; // Libera o salto após o tempo do pulo
  }, 400);
};

const restartGame = () => {
  window.location.reload();
};

const startLuigiAnimation = () => {
  setInterval(() => {
    if (!isGameOver) {
      luigi.style.left = '-300px';
      luigi.style.visibility = 'visible';
      isLuigiVisible = true;

      requestAnimationFrame(() => {
        luigi.classList.add('luigi-animation');
      });

      setTimeout(() => {
        if (!isGameOver) {
          luigi.style.visibility = 'hidden';
          luigi.classList.remove('luigi-animation');
          isLuigiVisible = false;
        }
      }, 6000);
    }
  }, 20000);
};

const startKoopaAnimation = () => {
  setInterval(() => {
    if (!isGameOver) {
      koopa.style.left = '-300px';
      koopa.style.visibility = 'visible';
      isKoopaVisible = true;

      requestAnimationFrame(() => {
        koopa.classList.add('koopa-animation');
      });

      setTimeout(() => {
        if (!isGameOver) {
          koopa.style.visibility = 'hidden';
          koopa.classList.remove('koopa-animation');
          isKoopaVisible = false;
        }
      }, 9000);
    }
  }, 21500);
};

const startPlantAnimation = () => {
  plant.style.visibility = 'visible'; // Torna a planta visível
  requestAnimationFrame(() => {
    plant.classList.add('plant-animation'); // Adiciona a animação à planta
  });
};
const startBulletAnimation = () => {
  bullet.style.visibility = 'visible'; // Torna a planta visível
  requestAnimationFrame(() => {
    bullet.classList.add('bullet-animation'); // Adiciona a animação à planta
  });
};

const stopBackgroundAnimation = () => {
  // Obtém a posição atual do background
  const backgroundPosition = window.getComputedStyle(gameBoard).backgroundPosition;

  // Define a posição atual como estilo inline para "congelar" o background
  gameBoard.style.backgroundPosition = backgroundPosition;
  gameBoard.style.animation = 'none'; // Remove a animação
};

// Loop principal do jogo
const loop = setInterval(() => {
  if (isGameOver) return;

  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  const cloudsPosition = clouds.offsetLeft;
  const bushPosition = bush.offsetLeft;
  const luigiPosition = luigi.offsetLeft;
  const treePosition = tree.offsetLeft;
  const koopaPosition = koopa.offsetLeft;
  const plantPosition = plant.offsetLeft;
  const bulletPosition = bullet.offsetLeft;

  // Inicia a animação da planta quando o score for 200
  if (score >= 2000 && !isPlantAnimationStarted) {
    startPlantAnimation();
    isPlantAnimationStarted = true; // Garante que a animação seja iniciada apenas uma vez
  }

  if (score >= 4000 && !isBulletAnimationStarted) {
    startBulletAnimation();
    isBulletAnimationStarted = true; // Garante que a animação seja iniciada apenas uma vez
  }

  // Verifica colisão com pipe
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 70) {
    stopBackgroundAnimation();

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '40px';

    grassBorder.classList.remove('grass-slide');
    grassBorder.classList.add('grass-slide-stop');

    clouds.style.animation = 'none';
    clouds.style.left = `${cloudsPosition}px`;

    bush.style.animation = 'none';
    bush.style.left = `${bushPosition}px`;

    tree.style.animation = 'none';
    tree.style.left = `${treePosition}px`;

    if (isLuigiVisible) {
      luigi.style.animation = 'none';
      luigi.style.left = `${luigiPosition}px`;
      luigi.style.visibility = 'visible';
    }

    if (isKoopaVisible) {
      koopa.style.animation = 'none';
      koopa.style.left = `${koopaPosition}px`;
      koopa.style.visibility = 'visible';
    }

    if (isPlantAnimationStarted) {
      plant.style.animation = 'none';
      plant.style.left = `${plantPosition}px`;
    }
    if (isBulletAnimationStarted) {
      bullet.style.animation = 'none';
      bullet.style.left = `${bulletPosition}px`;
    }

    modal.classList.remove('hidden');
    isGameOver = true;

    clearInterval(loop);
  }

  // Verifica colisão com a planta
  if (isPlantAnimationStarted && plantPosition <= 110 && plantPosition > 0 && marioPosition < 70) {
    stopBackgroundAnimation();

    plant.style.animation = 'none';
    plant.style.left = `${plantPosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '40px';

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    modal.classList.remove('hidden');
    isGameOver = true;

    grassBorder.classList.remove('grass-slide');
    grassBorder.classList.add('grass-slide-stop');

    clouds.style.animation = 'none';
    clouds.style.left = `${cloudsPosition}px`;

    bush.style.animation = 'none';
    bush.style.left = `${bushPosition}px`;

    tree.style.animation = 'none';
    tree.style.left = `${treePosition}px`;

    if (isLuigiVisible) {
      luigi.style.animation = 'none';
      luigi.style.left = `${luigiPosition}px`;
      luigi.style.visibility = 'visible';
    }

    if (isKoopaVisible) {
      koopa.style.animation = 'none';
      koopa.style.left = `${koopaPosition}px`;
      koopa.style.visibility = 'visible';
    }

    if (isPlantAnimationStarted) {
      plant.style.animation = 'none';
      plant.style.left = `${plantPosition}px`;
    }
    if (isBulletAnimationStarted) {
      bullet.style.animation = 'none';
      bullet.style.left = `${bulletPosition}px`;
    }

    clearInterval(loop);
  } else {
    score += 1;
    scoreElement.textContent = `Score: ${Math.floor(score / 10)}`;
  }
  if (isBulletAnimationStarted && bulletPosition <= 123 && bulletPosition > 0 && marioPosition < 70) {
    stopBackgroundAnimation();

    plant.style.animation = 'none';
    plant.style.left = `${plantPosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '40px';

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    modal.classList.remove('hidden');
    isGameOver = true;

    grassBorder.classList.remove('grass-slide');
    grassBorder.classList.add('grass-slide-stop');

    clouds.style.animation = 'none';
    clouds.style.left = `${cloudsPosition}px`;

    bush.style.animation = 'none';
    bush.style.left = `${bushPosition}px`;

    tree.style.animation = 'none';
    tree.style.left = `${treePosition}px`;

    if (isLuigiVisible) {
      luigi.style.animation = 'none';
      luigi.style.left = `${luigiPosition}px`;
      luigi.style.visibility = 'visible';
    }

    if (isKoopaVisible) {
      koopa.style.animation = 'none';
      koopa.style.left = `${koopaPosition}px`;
      koopa.style.visibility = 'visible';
    }

    if (isPlantAnimationStarted) {
      plant.style.animation = 'none';
      plant.style.left = `${plantPosition}px`;
    }
    if (isBulletAnimationStarted) {
      bullet.style.animation = 'none';
      bullet.style.left = `${bulletPosition}px`;
    }



    clearInterval(loop);
  } else {
    score += 1;
    scoreElement.textContent = `Score: ${Math.floor(score / 10)}`;
  }
}, 10);

startLuigiAnimation();
startKoopaAnimation();
tree.classList.add('tree-animation');
bush.classList.add('bush-animation');
clouds.classList.add('clouds-animation');
grassBorder.classList.add('grass-slide');
document.addEventListener('keydown', jump);
restartButton.addEventListener('click', restartGame);
