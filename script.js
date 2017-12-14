const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
  stopwatch.reset();
  stopwatch.print(this.times);
});

const saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save());

class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }

  format(times) {
    return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  save() {
    const resultsList = document.querySelector('.results');
    const resultLi = document.createElement('li');
    resultLi.textContent = stopwatch.display.innerText;
    resultsList.insertBefore(resultLi, resultsList.childNodes[0]);
    if (!resultsList.childNodes[1]) {
      resultsList.appendChild(this.createResetButton());
    }
  }

  createResetButton() {
    const resetListButton = document.createElement('Button');
    resetListButton.textContent = 'Reset';
    resetListButton.className = 'resetListButton';
    return resetListButton;
  }

  resetResultList() {}
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
