// import Constraint from "./Constraint.js";
// class ConstraintIterator {
//   constructor(constraintLists) {
//     this.constraintLists = constraintLists;
//   }

//   parseConstraint() {
//     return this.parseNextConstraint(0, -1, this.constraintLists.length);
//   }

//   parseNextConstraint(level, left, right) {
//     const arr = [];
//     for (let i = left + 1; i < right; i++) {
//       if (this.constraintLists[i][0] === level) {
//         arr.push(i);
//       }
//     }
//     arr.unshift(left);
//     arr.push(right);
//     const constraints = [];
//     for (let i = 1; i < arr.length; i++) {
//       if (arr[i] - arr[i - 1] > 1)
//         constraints.push(
//           this.parseNextConstraint(level + 1, arr[i - 1], arr[i])
//         );
//       if (i !== arr.length - 1)
//         constraints.push(this.parseSimpleConstraint(arr[i]));
//     }
//     return constraints.length === 1
//       ? constraints[0]
//       : new Constraint(constraints, false, false);
//   }

//   parseSimpleConstraint(index) {
//     return Constraint.newSimpleConstraint(this.constraintLists[index]);
//   }
// }

// export default ConstraintIterator;
