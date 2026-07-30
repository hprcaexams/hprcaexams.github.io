import fs from "node:fs";

const file = new URL("../app/questions.json", import.meta.url);
const questions = JSON.parse(fs.readFileSync(file, "utf8"));

const replacements = new Map([
  [14, {
    solution: "Data cleaning identifies and corrects missing, inaccurate, inconsistent or duplicate values so that the stored data is suitable for reliable use.",
  }],
  [38, {
    question: "Which database model organises records in a tree-like parent–child structure?",
    options: ["Hierarchical model", "Relational model", "Object-relational model", "Document model"],
    answer: "Hierarchical model",
    solution: "The hierarchical database model arranges records as a tree. Each child record normally has one parent, while a parent may have several children.",
  }],
  [58, {
    solution: "Inheritance is an object-oriented concept, not a standard database model by itself. Hierarchical, network, relational and object-oriented are recognised database models.",
  }],
  [76, {
    question: "An entity has a composite attribute Address, a multivalued attribute PhoneNumber and a derived attribute Age. How should these be represented in a relational design?",
    options: [
      "Store Address components in the entity table, place PhoneNumber in a separate table, and calculate Age when needed",
      "Store every value in one comma-separated column",
      "Create a separate table only for Age",
      "Discard Address and PhoneNumber"
    ],
    answer: "Store Address components in the entity table, place PhoneNumber in a separate table, and calculate Age when needed",
    solution: "Composite attributes are represented by their simple components, a multivalued attribute normally requires a separate relation, and a derived attribute is calculated from its source data instead of being stored redundantly.",
  }],
  [89, {
    question: "How many entity sets participate in a quaternary relationship in ER modelling?",
    solution: "A quaternary relationship has degree four, so it connects four entity sets.",
  }],
  [100, {
    question: "Which component of a DBMS stores descriptions of tables, columns, constraints and other database objects?",
    options: ["Query result", "Data dictionary", "Transaction log only", "User view"],
    answer: "Data dictionary",
    solution: "The data dictionary, also called the system catalogue, stores metadata that describes database objects and their properties.",
  }],
  [120, {
    question: "In the relational model, what is the correct meaning of degree and cardinality?",
    options: ["Degree is rows; cardinality is columns", "Degree is columns; cardinality is rows", "Both mean rows", "Both mean columns"],
    answer: "Degree is columns; cardinality is rows",
    solution: "The degree of a relation is its number of attributes or columns. Its cardinality is its number of tuples or rows.",
  }],
  [132, {
    question: "Which ER-model component represents a property that describes an entity?",
    options: ["Attribute", "Relationship set", "Participation constraint", "Entity set"],
    answer: "Attribute",
    solution: "An attribute is a property or characteristic used to describe an entity, such as EmployeeName or DateOfBirth.",
  }],
  [154, {
    question: "Which symbol is commonly used to represent a relationship in an ER diagram?",
    options: ["Rectangle", "Diamond", "Oval", "Double line"],
    answer: "Diamond",
    solution: "In standard ER notation, a relationship is shown with a diamond. Rectangles represent entities and ovals represent attributes.",
  }],
  [181, {
    question: "An ER design contains strong entities P and M, a multivalued attribute of M, and a weak entity N owned by P. What is the minimum number of relations normally required?",
    options: ["2", "3", "4", "5"],
    answer: "4",
    solution: "P and M each need their own relation. The multivalued attribute of M needs a separate relation, and weak entity N needs a relation containing its partial key plus P’s key. Therefore four relations are required.",
  }],
  [182, {
    solution: "Fan traps and chasm traps are both connection traps. They arise when an ER model gives an ambiguous or missing path between related entities.",
  }],
  [183, {
    solution: "Connection traps are modelling problems caused by misleading or missing relationship paths. Fan traps and chasm traps are their common forms.",
  }],
  [204, {
    solution: "Domain constraints require each attribute value to come from its defined domain. Relational attributes must be atomic, so composite or multivalued values are not stored as a single attribute value.",
  }],
  [210, {
    solution: "Cardinality is the number of tuples or rows in a relation, while degree is the number of attributes or columns.",
  }],
  [235, {
    question: "Which conclusion about a functional dependency can be proved from only one finite relation instance?",
    options: [
      "A dependency that is violated by the instance cannot hold for the relation schema",
      "Every dependency that happens to hold in the instance must hold for the schema",
      "The instance uniquely determines all candidate keys",
      "No dependency can ever be tested with an instance"
    ],
    answer: "A dependency that is violated by the instance cannot hold for the relation schema",
    solution: "A counterexample in an instance disproves a claimed functional dependency. However, a dependency that happens to hold in one current instance may be accidental, so that instance alone cannot prove it is a schema constraint.",
  }],
  [243, {
    question: "Let F1 = {A → B, AB → C, D → AC, D → E} and F2 = {A → BC, D → AE}. What is the relationship between F1 and F2?",
    options: [
      "F1 implies F2 but F2 does not imply F1",
      "F2 implies F1 but F1 does not imply F2",
      "F1 and F2 are equivalent",
      "Neither set implies the other"
    ],
    answer: "F1 and F2 are equivalent",
    solution: "From F1, A → B and AB → C give A → C, hence A → BC; D → AC and D → E give D → AE. From F2, A → BC gives A → B, A → C and AB → C; D → A together with A → C gives D → C, hence D → AC, and D → E is already present.",
  }],
  [249, {
    question: "For an instance of R(X,Y,Z), Y values are all distinct, while the same Z value occurs with different Y values. Which statement must be true for this instance?",
    options: ["Y → Z holds and Z → Y fails", "Z → Y holds and Y → Z fails", "Both Y → Z and Z → Y fail", "Both dependencies must be schema constraints"],
    answer: "Y → Z holds and Z → Y fails",
    solution: "Because no Y value repeats, the instance cannot contain equal Y values with different Z values, so Y → Z holds in this instance. A repeated Z paired with different Y values directly violates Z → Y.",
  }],
  [250, {
    solution: "In a functional dependency X → Y, X is called the determinant and Y is called the dependent because the value of X determines the value of Y.",
  }],
  [259, {
    question: "According to Armstrong’s decomposition rule, what follows from the functional dependency X → YZ?",
    options: ["X → Y and X → Z", "Y → X and Z → X", "XY → Z only", "Z → XY only"],
    answer: "X → Y and X → Z",
    solution: "The decomposition rule states that if X functionally determines the combined set YZ, then X separately determines Y and X separately determines Z.",
  }],
  [279, {
    solution: "AF⁺ contains A, F, D and E. It cannot derive C or G, so the statement {AF}⁺ = {ACDEFG} is false.",
  }],
  [324, {
    answer: "Only A is a key",
    solution: "After projection onto R1(A, B, C), A determines B through A → D → B and determines C through A → E → C. Therefore A⁺ = {A, B, C}, and A alone is the candidate key.",
  }],
  [336, {
    question: "In a relational database, what is a minimal superkey called?",
    solution: "A candidate key is a minimal superkey: it uniquely identifies every tuple, and no proper subset of it can do so.",
  }],
  [401, {
    question: "If a foreign key uses ON DELETE CASCADE, what happens when its referenced parent row is deleted?",
    options: ["Referencing child rows are deleted automatically", "The parent row is never deleted", "Foreign-key values become zero", "The complete database is deleted"],
    answer: "Referencing child rows are deleted automatically",
    solution: "ON DELETE CASCADE automatically deletes child rows whose foreign-key values reference the deleted parent row, preserving referential integrity.",
  }],
  [463, {
    question: "Which condition specifically distinguishes Second Normal Form (2NF) from First Normal Form (1NF)?",
    solution: "A relation is in 2NF when it is in 1NF and every non-prime attribute is fully dependent on each candidate key; therefore no partial functional dependency is allowed.",
  }],
  [487, {
    solution: "A relation is in Third Normal Form when non-key attributes depend on the key, the whole key and nothing but the key; transitive dependencies of non-key attributes are removed.",
  }],
  [510, {
    question: "A relation R(P, Q, R, S, T) has dependencies P → Q, R, S, T and S → T. What is its highest normal form?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: "2NF",
    solution: "P is the single-attribute candidate key, so partial dependency cannot occur and the relation is in 2NF. The dependency S → T has a non-superkey determinant and a non-prime dependent, so the relation is not in 3NF.",
  }],
  [514, {
    question: "For R(X, Y, Z) with functional dependencies XY → Z and Z → X, what is the highest normal form of R?",
    solution: "XY and YZ are candidate keys, so every attribute is prime. The dependency Z → X satisfies 3NF because X is prime, but it violates BCNF because Z is not a superkey. Therefore the highest normal form is 3NF.",
  }],
  [586, {
    question: "Match each normal form with the dependency it removes: (i) 2NF, (ii) 3NF, (iii) 4NF, (iv) 5NF; (a) transitive dependency, (b) partial dependency, (c) non-trivial multivalued dependency, (d) non-trivial join dependency.",
    options: ["i-b, ii-a, iii-c, iv-d", "i-a, ii-b, iii-d, iv-c", "i-b, ii-c, iii-a, iv-d", "i-d, ii-a, iii-b, iv-c"],
    answer: "i-b, ii-a, iii-c, iv-d",
    solution: "2NF removes partial dependencies, 3NF removes transitive dependencies of non-key attributes, 4NF addresses non-trivial multivalued dependencies, and 5NF addresses non-trivial join dependencies.",
  }],
  [594, {
    question: "For R(M,N,O,P,Q,R,S,T) with FDs MN → Q, M → RQ, N → R and R → ST, which decomposition is lossless?",
    options: [
      "{MNOP, MPQ, NR, RST}",
      "{MNO, PQ, NR, RST}",
      "Both decompositions",
      "Neither decomposition"
    ],
    answer: "{MNOP, MPQ, NR, RST}",
    solution: "In the first decomposition, MP determines MPQ through M → Q, N determines NR, and R determines RST, allowing lossless joins in sequence. In the second decomposition MNO and PQ have no common attribute, which introduces a Cartesian product and makes it lossy.",
  }],
  [598, {
    question: "For a binary decomposition of R into R1 and R2, which condition guarantees a lossless join with respect to functional dependencies F?",
    options: ["(R1 ∩ R2) → R1 or (R1 ∩ R2) → R2 is in F⁺", "R1 ∪ R2 → R", "R1 → R2 and R2 → R1 must both hold", "R1 and R2 must have no common attributes"],
    answer: "(R1 ∩ R2) → R1 or (R1 ∩ R2) → R2 is in F⁺",
    solution: "A binary decomposition is lossless if the common attributes functionally determine all attributes of at least one of the two decomposed relations.",
  }],
  [708, {
    question: "Which of the following is not a valid SQL comparison operator?",
    options: ["<=", "<>", "=>", "="],
    answer: "=>",
    solution: "SQL uses >= for greater-than-or-equal. The reversed form => is not a standard SQL comparison operator.",
  }],
  [670, {
    question: "A child table’s foreign key references Parent(A) with ON UPDATE SET NULL but no ON DELETE action. What normally happens when a referenced parent row is deleted while child rows still reference it?",
    options: ["The delete is rejected", "Child foreign keys are automatically set to NULL", "All child rows are deleted", "Every row in both tables is deleted"],
    answer: "The delete is rejected",
    solution: "ON UPDATE SET NULL applies only when the referenced key is updated. Without an ON DELETE action, deleting a referenced parent row would violate referential integrity, so the database normally rejects it.",
  }],
  [733, {
    question: "Which referential action sets child foreign-key values to NULL when the referenced parent row is deleted?",
    options: ["ON DELETE SET NULL", "ON UPDATE SET NULL", "ON DELETE RESTRICT", "ON UPDATE CASCADE"],
    answer: "ON DELETE SET NULL",
    solution: "ON DELETE SET NULL changes the referencing foreign-key values to NULL when the parent row is deleted, provided the foreign-key column allows NULL values.",
  }],
  [727, {
    question: "Which operator is used for string concatenation in standard SQL?",
    options: ["++", "##", "||", "&&"],
    answer: "||",
    solution: "Standard SQL uses two vertical bars (||) to concatenate strings. Some products also provide their own functions or operators.",
  }],
  [773, {
    question: "If DELETE FROM EMPLOYEE; is executed without a WHERE clause on a table containing n rows, how many rows are deleted?",
    solution: "Without a WHERE clause, DELETE applies to every row in the table, so all n rows are deleted. The table structure remains.",
  }],
  [774, {
    solution: "DROP removes a schema object and ALTER changes its definition. Both are Data Definition Language statements that change the database schema.",
  }],
  [777, {
    solution: "INSERT adds rows and is a Data Manipulation Language statement. CREATE TABLE, ALTER TABLE and DROP TABLE are Data Definition Language statements.",
  }],
  [870, {
    solution: "ROUND() is a numeric function and LENGTH() is a character/string function. INSERT is a data-manipulation statement, not a numeric function.",
  }],
  [871, {
    question: "What is returned by the SQL expression MOD(1600, 10)?",
    options: ["0", "10", "160", "1600"],
    answer: "0",
    solution: "MOD(a, b) returns the remainder after a is divided by b. Because 1600 is exactly divisible by 10, the remainder is 0.",
  }],
  [905, {
    options: ["Nested query", "Trigger", "Scalar function", "Window function"],
    answer: "Window function",
    solution: "A window function uses an OVER clause and can partition related rows while retaining each original row in the result. Unlike GROUP BY, it does not collapse a group into one row.",
  }],
  [906, {
    options: ["Starts from 1; returns 0 if not found", "Starts from 0; returns -1 if not found", "Starts from 1; returns -1 if not found", "Starts from 0; returns NULL if not found"],
    answer: "Starts from 1; returns 0 if not found",
    solution: "INSTR() reports positions using a first position of 1. In common SQL implementations such as Oracle and MySQL, it returns 0 when the substring is absent.",
  }],
  [923, {
    question: "Which SQL query correctly returns the sum, maximum, minimum and average salary for employees in the ENGLISH department?",
    options: [
      "SELECT SUM(e.salary), MAX(e.salary), MIN(e.salary), AVG(e.salary) FROM employee e JOIN department d ON e.deptno=d.did WHERE d.dname='ENGLISH';",
      "SELECT SUM(e.salary), MAX(e.salary), MIN(e.salary), AVG(e.salary) FROM employee e, department d WHERE d.dname='ENGLISH';",
      "SELECT e.salary FROM employee e WHERE e.dname='ENGLISH' GROUP BY e.salary;",
      "SELECT SUM(*), MAX(*), MIN(*), AVG(*) FROM employee;"
    ],
    answer: "SELECT SUM(e.salary), MAX(e.salary), MIN(e.salary), AVG(e.salary) FROM employee e JOIN department d ON e.deptno=d.did WHERE d.dname='ENGLISH';",
    solution: "The correct query joins EMPLOYEE to DEPARTMENT using the department key, filters the English department, and applies the four aggregate functions to the salary column.",
  }],
  [929, {
    question: "What does a RIGHT JOIN followed by WHERE TableA.key IS NULL return?",
    options: ["Only rows from TableB with no matching row in TableA", "Only matching rows from both tables", "Every row from TableA", "Only rows from TableA with no match in TableB"],
    answer: "Only rows from TableB with no matching row in TableA",
    solution: "A RIGHT JOIN preserves every row from TableB. Filtering for a NULL key on TableA keeps only the TableB rows for which no matching TableA row was found.",
  }],
  [952, {
    question: "SUBJECTS and RESULT share the column SUBCODE. Which query lists each subject name with the number of matching RESULT rows?",
    options: [
      "SELECT SUBNAME, COUNT(*) FROM SUBJECTS NATURAL JOIN RESULT GROUP BY SUBNAME;",
      "SELECT SUBNAME, COUNT() FROM SUBJECTS, RESULT GROUP BY SUBNAME;",
      "SELECT SUBNAME FROM SUBJECTS NATURAL JOIN RESULT ORDER BY SUBNAME;",
      "SELECT COUNT(SUBNAME) FROM SUBJECTS;"
    ],
    answer: "SELECT SUBNAME, COUNT(*) FROM SUBJECTS NATURAL JOIN RESULT GROUP BY SUBNAME;",
    solution: "NATURAL JOIN combines rows through their common SUBCODE column. GROUP BY creates one group per subject name, and COUNT(*) returns the number of matching result rows in each group.",
  }],
  [959, {
    question: "STUDENT contains section A marks 83 and 85, and section B marks 86 and 80. What does SELECT SEC, AVG(MARKS) FROM STUDENT GROUP BY SEC HAVING MIN(MARKS) > 80 return?",
    options: ["A 84", "B 83", "A 84 and B 83", "No rows"],
    answer: "A 84",
    solution: "Section A qualifies because its minimum mark is 83, which is greater than 80, and its average is 84. Section B is excluded because its minimum mark is exactly 80, not greater than 80.",
  }],
  [1004, {
    options: [
      "Conflict-serializable and recoverable",
      "Conflict-serializable but not recoverable",
      "Not conflict-serializable but recoverable",
      "Neither conflict-serializable nor recoverable"
    ],
    answer: "Neither conflict-serializable nor recoverable",
    solution: "The conflicts on Y create edges T2 → T3 and T3 → T2, so the precedence graph contains a cycle and the schedule is not conflict-serializable. T2 reads the value written by T3 and commits before T3 commits, so the schedule is also not recoverable.",
  }],
  [1000, {
    question: "A schedule’s precedence graph contains the edges T1 → T2, T2 → T3 and T3 → T1. What can be concluded?",
    options: ["The schedule is conflict-serializable as T1,T2,T3", "The schedule is conflict-serializable as T3,T2,T1", "The schedule is conflict-serializable in every order", "The schedule is not conflict-serializable"],
    answer: "The schedule is not conflict-serializable",
    solution: "The three edges form the directed cycle T1 → T2 → T3 → T1. A schedule is conflict-serializable only when its precedence graph is acyclic.",
  }],
]);

const mojibake = new Map([
  ["â€“", "–"], ["â€”", "—"], ["â€˜", "‘"], ["â€™", "’"], ["â€œ", "“"], ["â€", "”"],
  ["â†’", "→"], ["âˆ—", "∗"], ["âˆ©", "∩"], ["âˆª", "∪"], ["âº", "⁺"],
  ["â‰¤", "≤"], ["â‰¥", "≥"], ["â‰ ", "≠"], ["â€¦", "…"], ["Â", ""],
  ["Î ", "Π"], ["â‚", "₁"], ["â‚‚", "₂"], ["â€‹", ""], ["ï¼œ", "<"], ["ï¼ž", ">"],
  ["â”€", "─"], ["â–·", "▷"], ["âˆˆ", "∈"], ["âŠ‚", "⊂"], ["âŠ†", "⊆"],
  ["âŸ¶", "⟶"], ["âž¡", "→"], ["â† ", "↠"], ["â‹ˆ", "⋈"], ["Ï€", "π"],
  ["Ã—", "×"], ["â€", "-"], ["â€ƒ", " "], ["â‡’", "⇒"], ["âˆ…", "∅"],
  ["â€²", "′"], ["â‹…", "·"], ["âˆ’", "−"], ["â‰ˆ", "≈"],
  ["Ã·", "÷"], ["â±¼", "≼"], ["âœ˜", "✘"], ["âœ–", "✖"], ["âœ”", "✔"],
  ["âŠ„", "⊄"], ["âŠ‡", "⊇"], ["âŠ•", "⊕"], ["âˆ´", "∴"], ["âˆš", "√"],
  ["âˆ‰", "∉"], ["â‚˜", "ₘ"], ["â†”", "↔"], ["â‹¯", "⋯"], ["â€¢", "•"], ["â€‘", "-"],
  ["âœ…", "✓"], ["âŒ", "✗"], ["ðŸ“Œ", "Note:"],
  ["ð‘‹", "X"], ["ð‘Œ", "Y"], ["ð‘", "Z"], ["ð¹", "F"], ["ð‘…", "R"],
  ["ð‘Ž", "a"], ["ð‘", "b"], ["ð‘", "c"], ["ð´", "A"], ["ðµ", "B"],
  ["ð‘¥", "x"], ["ð‘¦", "y"], ["ð‘§", "z"], ["ð‘™", "l"], ["ð‘š", "m"],
  ["ð‘›", "n"], ["ð‘œ", "o"], ["ð‘", "p"],
  ["ð¶", "C"], ["ð·", "D"], ["ð¸", "E"], ["ðº", "G"], ["ð»", "H"],
  ["ð‘", "N"], ["ð‘Š", "W"], ["ð‘ƒ", "P"], ["ð‘ˆ", "U"], ["ð‘„", "Q"],
  ["ð‘†", "S"], ["ð‘‡", "T"], ["ð‘‰", "V"], ["ðŸ¡ª", "→"], ["ðŸ”¹", "•"],
]);

function clean(value) {
  if (typeof value !== "string") return value;
  let result = value;
  for (const [bad, good] of mojibake) result = result.split(bad).join(good);
  return result
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

for (const question of questions) {
  question.question = clean(question.question);
  question.options = question.options.map(clean);
  question.answer = clean(question.answer);
  question.solution = clean(question.solution);

  const replacement = replacements.get(question.id);
  if (replacement) Object.assign(question, replacement);

  question.question = clean(question.question);
  question.options = question.options.map(clean);
  question.answer = clean(question.answer);
  question.solution = clean(question.solution);

  if (question.options.length !== 4) {
    throw new Error(`Question ${question.id} does not have exactly four options`);
  }
  if (new Set(question.options).size !== 4) {
    throw new Error(`Question ${question.id} has duplicate options`);
  }
  if (!question.options.includes(question.answer)) {
    throw new Error(`Question ${question.id} answer is not one of its options`);
  }
  if (question.question.length < 10) {
    throw new Error(`Question ${question.id} has an incomplete stem`);
  }
  if (question.solution.length < 25) {
    throw new Error(`Question ${question.id} has an incomplete explanation`);
  }
}

fs.writeFileSync(file, `${JSON.stringify(questions, null, 2)}\n`);
console.log(`Validated ${questions.length} questions: four unique options, matching answers, complete stems and explanations.`);
