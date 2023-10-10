export default class Animal {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.desc = obj.desc;
    this.type = obj.type;
    this.age = obj.age;
    this.star = obj.star;
    this.winner = obj.winner;

    Object.defineProperty(this, "id", { writable: false });
  }

  toggleWinner() {
    this.winner = !this.winner;
  }

  toggleStar() {
    this.star = !this.star;
  }
}
