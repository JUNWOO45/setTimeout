class Item {
  cb;
  time;
  constructor(cb, time) {
    this.cb = cb;
    this.time = time + performance.now();
  }
}

const queue = new Set();

const f = (timeStamp) => {
  queue.forEach((item) => {
    if (item.time > timeStamp) {
      return;
    }

    queue.delete(item);
    item.cb();
  });

  requestAnimationFrame(f);
};

requestAnimationFrame(f);

const cSetTimeout = (cb, time) => queue.add(new Item(cb, time));

// example : cSetTimeout(() => console.log('hi'), 1500);
// example : cSetTimeout(() => console.log('hi'), 500);
