class Constraint {
  constructor(components, isLeaf = false, isOperator = false) {
    this.isOperator = isOperator;
    this.isLeaf = isLeaf;
    this.components = components;
  }
  static newSimpleConstraint(list) {
    const operators = ["and", "or"];
    const isOperator = operators.includes(list[1].type);
    const isLeaf = !this.isOperator;
    const components = [];
    for (let i = 1; i < list.length; i++) {
      components.push(list[i]);
    }
    return new Constraint(components, isLeaf, isOperator);
  }
}
export default Constraint;
